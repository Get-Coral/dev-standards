# @get-coral/tsconfig

Shared TypeScript defaults for Coral repositories.

## Install

```bash
pnpm add -D @get-coral/tsconfig
```

## Usage

In your repository `tsconfig.json`:

```json
{
  "extends": "./node_modules/@get-coral/tsconfig/react-start.json",
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"],
      "@/*": ["./src/*"]
    },
    "types": ["vite/client"]
  }
}
```

Add repo-specific `paths`, `types`, and include rules in your local `tsconfig.json`.
