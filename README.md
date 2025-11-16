# Vibe Coding Template

A modern, batteries-included React template designed to get you into the flow quickly. Skip the setup and start building.

## What's Included

This template comes pre-configured with everything you need for modern React development:

### Core Stack

- **React 19** with TypeScript
- **Vite** (using Rolldown) for blazing-fast builds
- **Bun** as the package manager and runtime
- **Tailwind CSS v4** for styling
- **shadcn/ui** component system with 449+ components

### Developer Experience

- **ESLint** with React-specific rules
- **Prettier** for consistent code formatting
- **Husky** + **lint-staged** for pre-commit hooks
- **TypeScript** with strict mode enabled
- **Path aliases** configured (`@/` imports)

### AI-Enhanced Development

- **MCP servers** pre-configured:
  - shadcn component integration
  - CoLoop.ai documentation access
- **AI Agents** optimized with custom instructions

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun preview
```

## Using shadcn/ui Components

This template is optimized for shadcn/ui. Add components as needed:

```bash
# Add individual components
bunx shadcn@latest add button card dialog

# Or use the MCP tools in Claude Code/OpenAI Codex
# Search for components, view examples, and add them interactively
```

Example usage:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Project Structure

```
vibe-template/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn components
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── AGENTS.md                # Project instructions for agents
└── components.json          # shadcn configuration
```

## Development Commands

```bash
# Development
bun dev                      # Start dev server
bun run build               # Build for production
bun preview                 # Preview production build

# Code Quality
bun run lint                # Run ESLint
bun run typecheck           # Type checking
bun run format              # Format with Prettier
bun run format:check        # Check formatting
```

## Why Bun?

This template uses **Bun** instead of Node.js/npm/pnpm because it's:

- Faster for package installation
- Built-in TypeScript support
- Drop-in replacement for Node.js
- Simpler developer experience

All npm commands work with `bun`:

- `npm install` → `bun install`
- `npm run dev` → `bun dev`
- `npm run build` → `bun run build`

## Customization

### Add More Components

Browse and add components from the shadcn registry:

```bash
# List available components
bunx shadcn@latest

# Add specific components
bunx shadcn@latest add [component-name]
```

### Modify Tailwind Theme

Edit the CSS variables in `src/index.css` to customize your design system. The template uses Tailwind v4 with CSS-based configuration.

### Configure ESLint

For production apps, consider enabling type-aware linting by updating `eslint.config.js`:

```js
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or tseslint.configs.strictTypeChecked for stricter rules
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## AI Development

This template is optimized for AI-assisted development:

- **AGENTS.md**: Project guidelines for AI agents
- **MCP Integration**: Pre-configured servers for enhanced capabilities

When using Claude Code or OpenAI Codex, the AI will automatically:

- Use Bun instead of npm/yarn/pnpm
- Prefer shadcn components over custom UI
- Follow the project's code style and conventions

## Tech Stack Details

| Technology   | Version           | Purpose                   |
| ------------ | ----------------- | ------------------------- |
| React        | 19.1.1            | UI framework              |
| TypeScript   | ~5.9.3            | Type safety               |
| Vite         | 7.1.14 (Rolldown) | Build tool                |
| Tailwind CSS | 4.1.16            | Styling                   |
| shadcn/ui    | Latest            | Component library         |
| Bun          | Latest            | Package manager & runtime |
| ESLint       | 9.36.0            | Code linting              |
| Prettier     | 3.6.2             | Code formatting           |

## License

MIT

---

**Happy coding!** Get in the vibe and start building.
