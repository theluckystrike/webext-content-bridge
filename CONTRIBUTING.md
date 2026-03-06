# Contributing to webext-content-bridge

Thank you for your interest in contributing. This document outlines the process for contributing to this project.

## REPORTING ISSUES

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce the issue
- Your environment details (Node.js version, browser, OS)
- Any relevant error messages or logs

Please check existing issues before creating a new one to avoid duplicates.

## DEVELOPMENT WORKFLOW

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch from `main`
4. Make your changes
5. Run tests to ensure nothing is broken
6. Push to your fork and submit a pull request

### Setting Up Development Environment

```bash
git clone https://github.com/theluckystrike/webext-content-bridge.git
cd webext-content-bridge
npm install
```

### Building

```bash
npm run build
```

## CODE STYLE

- Use TypeScript for all new code
- Follow the existing code style in the repository
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep lines under 100 characters when practical

## TESTING

Before submitting changes, verify the build works:

```bash
npm run build
```

Ensure there are no TypeScript errors and the code compiles successfully.

## LICENSE

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
