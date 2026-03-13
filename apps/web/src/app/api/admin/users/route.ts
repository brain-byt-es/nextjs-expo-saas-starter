import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    if (!auth) {
      return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
    }

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Use Better-Auth admin API to list users
    const users = await auth.api.listUsers({
      headers: request.headers,
      query: { limit: 100 },
    });

    return NextResponse.json({ users: users?.users || [] });
  } catch (error) {
    Sentry.captureException(error, { tags: { endpoint: "admin/users" } });
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!auth) {
      return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
    }

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId, role } = await request.json();

    if (!userId || !role || !["user", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Prevent self-demotion
    if (userId === session.user.id && role !== "admin") {
      return NextResponse.json({ error: "Cannot remove your own admin role" }, { status: 400 });
    }

    await auth.api.setRole({
      headers: request.headers,
      body: { userId, role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error, { tags: { endpoint: "admin/users/patch" } });
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
