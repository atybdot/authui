# AGENTS.md

This file provides guidelines for AI agents working in this codebase.

## Project Overview

AuthUI is a Next.js 16 application with shadcn/ui components, Drizzle ORM, and Turso database. It uses Bun as the package manager.

## Commands

### Development
```bash
bun run dev              # Start dev server on port 3001
bun run email:dev        # Start email preview server
```

### Building & Linting
```bash
bun run build            # Production build with Next.js
bun run check            # Run oxlint + oxfmt (full lint + format)
bun run lint             # Run oxlint only
bun run oxlint           # Run oxlint only (same as lint)
bun run oxfmt            # Check formatting without writing
bun run oxfmt --write    # Auto-format code
```

### Database
```bash
bun run db:generate      # Generate Drizzle migrations
bun run db:push          # Push schema changes to database
bun run db:pull          # Pull schema from database
bun run db:studio        # Open Drizzle Studio UI
bun run db:migrate       # Run pending migrations
```

### Pre-commit
```bash
bun run prepare          # Install husky hooks
```

## Code Style Guidelines

### Formatting
- 2 spaces for indentation (no tabs)
- No trailing commas
- Semicolons at end of statements
- Single quotes for strings
- Run `bun run oxfmt --write` before committing

### TypeScript
- Strict mode enabled (`"strict": true` in tsconfig.json)
- Use explicit types for function parameters and return values
- Prefer interfaces over type aliases for object types
- Use `z.infer<typeof schema>` for Zod schema inference
- Use `import type` for type-only imports

### Naming Conventions
- **Files**: kebab-case for components (`waitlist.tsx`), camelCase for utilities (`utils.ts`)
- **Components**: PascalCase (`WaitlistComponent`)
- **Functions**: camelCase (`generateToken`)
- **Constants**: SCREAMING_SNAKE_CASE (`TOKEN_EXPIRY_S`)
- **Types**: PascalCase with suffix (`UserSelect`, `Result<T>`)
- **Interfaces**: PascalCase, no "I" prefix

### Imports
- Group imports in order: React → external → internal (relative) → types
- Use path aliases (`@/` for root, `@/components`, `@/lib`, `@/hooks`)
- Separate imports with blank lines between groups
- Example:
```typescript
import { useState } from "react";
import { toast } from "sonner";
import type { UserSelect } from "@/lib/db-helpers";
import { createUser } from "@/actions/user";
import { RainbowButton } from "@/components/ui/rainbow-button";
```

### Components
- `"use client"` at top of client components
- Default exports for page components
- Extract complex internal components as named exports
- Use Tailwind CSS for styling (shadcn "new-york" style)
- Use `className` for conditional classes with `cn()` helper
- Use `data-*` attributes for component state styling

### React Patterns
- Use `@tanstack/react-form` for forms
- Use `sonner` for toasts
- Use `zod` for validation with `z.email()` for emails
- Prefer functional components with hooks over class components

### Error Handling
- Return `{ data, error, status }` pattern from actions
- Log errors with `[ERROR CONTEXT]` prefix
- Handle async errors with try/catch
- Return user-friendly error messages in `error` field

### Database
- Use Drizzle ORM with `@libsql/client`
- Schema in `db/schema/`
- Migrations in `db/migrations/`
- Use `env.ts` with `@t3-oss/env-nextjs` for env validation

### CSS & Tailwind
- Use `@/` path alias for imports
- Oklch colors for theming
- Dark/light mode with CSS custom properties
- Use `tw-animate-css` for animations
- Custom variants: `dark` and `light`

### React Compiler
- Project uses `babel-plugin-react-compiler`
- Follow compiler-safe patterns (no mutation of objects/props)

### Paths Alias
- `@/*` maps to project root
- `@/components/*` → `components/`
- `@/lib/*` → `lib/`
- `@/hooks/*` → `hooks/`
- `@/components/ui/*` → `components/ui/`

### Directory Structure
```
authui/
├── actions/          # Server actions
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # shadcn UI primitives
│   └── cards/       # Feature-specific card components
├── db/              # Drizzle ORM schema & migrations
├── emails/          # React Email templates
├── hooks/           # Custom React hooks
├── lib/             # Utility functions & clients
└── styles/          # Global CSS & Tailwind config
```

### Database Schema Patterns
- Define tables in `db/schema/` files
- Use `sqliteTable` or `mysqlTable` from drizzle-orm
- Define relations using `relations()` API
- Export types using `InferSelectModel` and `InferInsertModel`

### Email Templates
- Use `@react-email/components` for email templates
- Preview emails locally with `bun run email:dev`
- Use Resend for sending transactional emails

### Environment Variables
- All env vars validated in `env.ts` using zod
- Server-only vars in `server` block
- Client-safe vars in `client` block
- Use `emptyStringAsUndefined: true` for optional strings
