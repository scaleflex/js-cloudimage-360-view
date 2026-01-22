# Contributing to js-cloudimage-360-view

## Development Setup

```bash
# Install dependencies
npm install

# Start development server (main demo)
npm run dev

# Start React demo development server
npm run dev:react
```

## Project Structure

```
src/
├── ci360.js              # Main entry point
├── ci360.service.js      # Core viewer logic
├── ci360.utils.js        # Utility functions
├── hotspots.js           # Hotspots feature
├── react/                # React wrapper
│   ├── index.ts          # React exports
│   ├── CI360Viewer.tsx   # React component
│   ├── useCI360.ts       # React hook
│   └── types.ts          # TypeScript types
├── types/                # TypeScript definitions
│   └── ci360.d.ts
└── static/css/           # Styles

demo/
├── index.html            # Main demo page
└── react-demo/           # React demo app
```

## Build Commands

```bash
# Build everything (library + React module)
npm run build

# Build only the main library bundle
npm run build:bundle

# Build only the React module
npm run build:react

# Build demos for GitHub Pages
npm run build:demo
```

## Testing

```bash
# Run tests
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Deploying Demos to GitHub Pages

```bash
# Build and deploy demos
npm run publish
```

This deploys both demos:
- Main demo: https://scaleflex.github.io/js-cloudimage-360-view/
- React demo: https://scaleflex.github.io/js-cloudimage-360-view/react-demo/

## Publishing to npm

### 1. Prepare the release

```bash
# Make sure all changes are committed
git status

# Build the package
npm run build

# Verify package contents
npm pack --dry-run
```

### 2. Update version

```bash
# For bug fixes (4.0.0 → 4.0.1)
npm version patch

# For new features (4.0.0 → 4.1.0)
npm version minor

# For breaking changes (4.0.0 → 5.0.0)
npm version major
```

### 3. Publish

```bash
# Login to npm (if not already)
npm login

# Publish to npm
npm publish

# Push version tag to git
git push && git push --tags
```

### Package Contents

The npm package includes:
- `dist/js-cloudimage-360-view.min.js` - Main UMD bundle
- `dist/js-cloudimage-360-view.min.css` - Styles
- `dist/react/` - React module (ESM + CJS)
- `src/types/` - TypeScript definitions

## Code Style

- Use ES6+ features
- Follow existing code patterns
- Add JSDoc comments for public APIs
