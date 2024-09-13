# Packages

These are packages that can be used by the `client` or the `server` packages.

## Considerations to take while writing code

In the future if the application grows, the code will increase in size and complexity.
<br>Aim to write tree-shakable code that enabled the bundler to do code splitting and tree shaking
<br>For now the only bundler I plan to use is Vite in the `client` workspace