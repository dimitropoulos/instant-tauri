# Setup Instructions for Publishing

## Prerequisites

1. **GitHub Repository**: Create a new GitHub repository for this project
2. **npm Account**: You need an npm account to publish packages

## Setup Steps

### 1. Initialize Git Repository

```bash
cd /home/onyx/src/scratch/first-tauri
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `instant-tauri`
3. Don't initialize with README (we already have files)

### 3. Connect to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/instant-tauri.git
git branch -M main
git push -u origin main
```

### 4. Update package.json

Edit `package.json` and replace `YOUR_USERNAME` with your actual GitHub username in:
- `repository.url`
- `bugs.url`
- `homepage`

### 5. Set up GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

**NPM_TOKEN** (Required for publishing):
1. Go to https://www.npmjs.com/
2. Login → Access Tokens → Generate New Token → Classic Token
3. Select "Automation" type
4. Copy the token
5. Add as secret named `NPM_TOKEN` in GitHub

**GITHUB_TOKEN** is automatically provided by GitHub Actions (no setup needed)

### 6. Test the Workflow (Optional)

Before creating a release tag, you can test manually:

1. Go to Actions tab in GitHub
2. Select "Build Multi-Platform Binaries"
3. Click "Run workflow"
4. Wait for it to complete (~10-15 minutes)

### 7. Publish a Release

When ready to publish:

```bash
# Update version in package.json if needed
git add package.json
git commit -m "Bump version to 0.1.0"
git push

# Create and push a version tag
git tag v0.1.0
git push origin v0.1.0
```

The GitHub Action will automatically:
1. Build binaries for all 4 platforms (Linux x64, macOS x64, macOS ARM64, Windows x64)
2. Create an npm package with all binaries
3. Publish to npm
4. Create a GitHub Release with the binaries

### 8. After Publishing

Users can now run:
```bash
npx instant-tauri
```

on any supported platform!

## Workflow Features

- ✅ Builds on native runners (Linux, macOS Intel, macOS ARM64, Windows)
- ✅ Automatically triggered by version tags (v*)
- ✅ Can be manually triggered via GitHub UI
- ✅ Publishes to npm only on tagged releases
- ✅ Creates GitHub releases with binary artifacts
- ✅ Includes all 4 platform binaries in the npm package

## Troubleshooting

**Build fails on a specific platform?**
- Check the Actions logs for that platform
- Tauri dependencies might need updating

**npm publish fails?**
- Verify NPM_TOKEN is set correctly
- Check if package name is available on npm
- Verify you're logged in: `npm whoami`

**Package name already taken?**
- Change the name in `package.json`
- Update the workflow if needed

## Local Development

To continue developing locally:

```bash
# Run in dev mode
pnpm tauri dev

# Build locally (your platform only)
./build-binary.sh

# Test the npm package locally
npm link
cd ~/somewhere-else
instant-tauri
```
