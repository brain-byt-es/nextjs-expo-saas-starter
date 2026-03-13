import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextRequest } from "next/server";

const mockGetSession = vi.fn();
const mockListUsers = vi.fn();
const mockSetRole = vi.fn();

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
      listUsers: (...args: unknown[]) => mockListUsers(...args),
      setRole: (...args: unknown[]) => mockSetRole(...args),
    },
  },
}));

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

const { GET, PATCH } = await import("@/app/api/admin/users/route");

function makeRequest(
  method: string,
  body?: Record<string, unknown>
): NextRequest {
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) init.body = JSON.stringify(body);
  return new Request("http://localhost:3003/api/admin/users", init) as unknown as NextRequest;
}

describe("GET /api/admin/users", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 403 if user is not admin", async () => {
    mockGetSession.mockResolvedValue({ user: { id: "u1", role: "user" } });

    const res = await GET(makeRequest("GET"));
    expect(res.status).toBe(403);
  });

  it("returns 403 if no session", async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await GET(makeRequest("GET"));
    expect(res.status).toBe(403);
  });

  it("returns user list for admin", async () => {
    mockGetSession.mockResolvedValue({
      user: { id: "a1", role: "admin" },
    });
    mockListUsers.mockResolvedValue({
      users: [
        { id: "u1", email: "a@b.com", role: "user" },
        { id: "a1", email: "admin@b.com", role: "admin" },
      ],
    });

    const res = await GET(makeRequest("GET"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.users).toHaveLength(2);
  });
});

describe("PATCH /api/admin/users", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 403 if not admin", async () => {
    mockGetSession.mockResolvedValue({ user: { id: "u1", role: "user" } });

    const res = await PATCH(makeRequest("PATCH", { userId: "u2", role: "admin" }));
    expect(res.status).toBe(403);
  });

  it("returns 400 for invalid role", async () => {
    mockGetSession.mockResolvedValue({
      user: { id: "a1", role: "admin" },
    });

    const res = await PATCH(makeRequest("PATCH", { userId: "u2", role: "superadmin" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Invalid request");
  });

  it("returns 400 for missing userId", async () => {
    mockGetSession.mockResolvedValue({
      user: { id: "a1", role: "admin" },
    });

    const res = await PATCH(makeRequest("PATCH", { role: "admin" }));
    expect(res.status).toBe(400);
  });

  it("prevents self-demotion", async () => {
    mockGetSession.mockResolvedValue({
      user: { id: "a1", role: "admin" },
    });

    const res = await PATCH(makeRequest("PATCH", { userId: "a1", role: "user" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toContain("Cannot remove your own admin role");
  });

  it("updates user role successfully", async () => {
    mockGetSession.mockResolvedValue({
      user: { id: "a1", role: "admin" },
    });
    mockSetRole.mockResolvedValue({});

    const res = await PATCH(makeRequest("PATCH", { userId: "u2", role: "admin" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockSetRole).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { userId: "u2", role: "admin" },
      })
    );
  });
});
