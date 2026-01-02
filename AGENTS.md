# Development

- **NEVER run `npm run dev` or any dev servers yourself** - The user runs and manages dev servers. Only build/compile code when explicitly requested.

# Package Manager & Build Tool

Use **Bun** for all package management and build operations. Do not use npm, yarn, or pnpm.

```bash
bun install          # Install dependencies
bun add <package>    # Add a package
bun add -d <package> # Add a dev dependency
bun run <script>     # Run scripts
bun run build        # Build
bun run tsc --noEmit # Type checking
```

# Documentation

- Do NOT create unnecessary documentation files for every feature implementation
- Inline code comments and descriptive function/variable names are preferred
- Only create standalone docs for major architectural changes or if explicitly requested
