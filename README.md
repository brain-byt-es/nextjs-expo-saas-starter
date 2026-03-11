# Template Monorepo

A modern monorepo setup with **Next.js + shadcn/ui** for web and **Expo + NativeWind UI** for mobile.

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 20.0.0 (use [nvm](https://github.com/nvm-sh/nvm) or [asdf](https://asdf-vm.com/))
- **pnpm** >= 10.32.0 (enforced via corepack)

### Setup
```bash
# Install dependencies
pnpm install

# Start all apps in dev mode (Turborepo TUI)
pnpm dev

# Or run individually:
pnpm --filter @repo/web dev      # Next.js on http://localhost:3003
pnpm --filter @repo/mobile dev   # Expo dev server
```

## 📁 Project Structure

```
Template Monorepo/
├── apps/
│   ├── web/              Next.js 16 + React 19 + shadcn/ui
│   └── mobile/           Expo 54 + React Native 0.81 + NativeWind UI
├── packages/
│   ├── shadcn-ui/        52+ shadcn/ui Web Components
│   ├── nativewindui/      Native Components (React Native)
│   ├── typescript-config/ Shared TypeScript presets
│   └── eslint-config/    Shared ESLint configuration
├── pnpm-workspace.yaml    pnpm workspace definition
├── turbo.json            Turborepo tasks & caching
└── .npmrc                pnpm configuration
```

## 🛠️ Available Commands

### Root Level (Turborepo)
```bash
pnpm dev          # Start all apps in dev mode
pnpm build        # Build all apps
pnpm lint         # Lint all apps & packages
pnpm typecheck    # TypeScript check all apps
```

### Web App
```bash
cd apps/web
pnpm dev          # Start Next.js dev server
pnpm build        # Build for production
pnpm start        # Run production server
```

### Mobile App
```bash
cd apps/mobile
pnpm dev          # Start Expo dev server
npx expo prebuild --clean  # Build native code (first time only)
npx expo run:ios           # Build & run on iOS
npx expo run:android       # Build & run on Android
```

## 📦 Workspace Packages

### @repo/shadcn-ui
Web components library based on Radix UI + Tailwind CSS.

```typescript
import { Button, Card, Input } from "@repo/shadcn-ui/components";
import { cn } from "@repo/shadcn-ui/lib/utils";
```

### @repo/nativewindui
Native components library for React Native with NativeWind styling.

```typescript
import { Button, Card, Input } from "@repo/nativewindui";
```

### @repo/typescript-config
Shared TypeScript configuration presets.

- `base.json` - Base strict config
- `nextjs.json` - Next.js specific
- `react-native.json` - React Native specific

### @repo/eslint-config
Shared ESLint configuration.

- `next.mjs` - Next.js rules
- `react-native.mjs` - React Native rules

## 🎨 Styling

### Web (apps/web)
- **Framework**: Tailwind CSS v4 (CSS-first)
- **UI Library**: shadcn/ui (Radix UI components)
- **Theme**: Light/Dark mode via `next-themes`

### Mobile (apps/mobile)
- **Framework**: NativeWind v4 (Tailwind for React Native)
- **UI Library**: Custom NativeWindUI components
- **Theme**: System dark/light mode

## 🔧 Technology Stack

### Core
- **pnpm** - Fast, disk space efficient package manager
- **Turborepo** - High-performance build system & monorepo

### Web
- Next.js 16.0.4
- React 19.2.0
- Tailwind CSS v4
- shadcn/ui components

### Mobile
- Expo SDK 54
- React Native 0.81.0
- Expo Router v4
- NativeWind v4

## 📋 Requirements

- **Node.js**: `>=20.0.0` (specified in `.nvmrc` and `package.json`)
- **pnpm**: `>=10.32.0` (auto-enforced via `packageManager` field)

To use the correct Node version:
```bash
# Using nvm
nvm use

# Using asdf
asdf install
```

## 🚢 Deployment

### Web (Next.js)
```bash
# Deploy to Vercel
pnpm build
# Push to Vercel via GitHub integration

# Or build Docker image
docker build -f apps/web/Dockerfile -t my-web-app .
```

### Mobile (Expo)
```bash
cd apps/mobile

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to App Store / Google Play
eas submit
```

## 📚 Resources

- [pnpm Documentation](https://pnpm.io/)
- [Turborepo Documentation](https://turbo.build)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev)
- [shadcn/ui](https://ui.shadcn.com)

## 📝 License

MIT
