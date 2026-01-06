# Release Process Documentation

This document outlines the automated release process for Chalkboard.id.

## Overview

The release process is fully automated using GitHub Actions and triggered by git tags. When you create and push a version tag, the system automatically:

1. Builds and tests the application
2. Creates Windows standalone executables
3. Builds and publishes Docker images to Docker Hub
4. Creates a GitHub release with all assets

## Creating a Release

### 1. Prepare for Release

```bash
# Ensure you're on the main branch and up to date
git checkout main
git pull origin main

# Run tests locally (optional but recommended)
bun run lint
bun run build
```

### 2. Create and Push Version Tag

```bash
# Create a new version tag (follow semantic versioning)
git tag v1.0.1

# Push the tag to trigger the release process
git push origin v1.0.1
```

### 3. Monitor Release Progress

1. Go to **GitHub Actions** tab in your repository
2. Watch the "Release" workflow execute
3. The workflow includes three main jobs:
   - **Test**: Runs linting and build validation
   - **Build Windows**: Creates Windows executable
   - **Build Docker**: Creates multi-architecture Docker images
   - **Create Release**: Publishes GitHub release with assets

## Release Assets

Each release automatically creates:

### Windows Standalone
- **Location**: GitHub Releases
- **Format**: `chalkboard-windows-v1.0.1.tar.gz`
- **Contents**: 
  - `chalkboard-win.exe` - Main executable
  - `install.bat` - Windows installer script
  - `README.txt` - Setup instructions
  - `.env.example` - Environment configuration template

### Docker Images
- **Registry**: Docker Hub (`kugieapp/chalkboard`)
- **Tags Created**:
  - `kugieapp/chalkboard:1.0.1` (version-specific)
  - `kugieapp/chalkboard:latest` (latest stable)
  - `kugieapp/chalkboard:1.0.1-edge` (edge runtime variant)
  - `kugieapp/chalkboard:1.0.1-node` (node runtime variant)

### Platforms Supported
- **Windows**: x64 executable
- **Docker**: AMD64 and ARM64 architectures

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **Major** (v2.0.0): Breaking changes
- **Minor** (v1.1.0): New features, backward compatible
- **Patch** (v1.0.1): Bug fixes, backward compatible

### Pre-release Versions

For beta or RC versions, use:
```bash
git tag v1.1.0-beta.1
git tag v1.1.0-rc.1
```

Pre-releases are automatically marked as "Pre-release" on GitHub.

## Required GitHub Secrets

Ensure these secrets are configured in your GitHub repository:

1. Go to **Repository Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `DOCKERHUB_USERNAME` | Docker Hub username | Your Docker Hub username: `kugieapp` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | Create at [Docker Hub Security](https://hub.docker.com/settings/security) |

## Docker Hub Setup

### Creating Access Token

1. Go to [Docker Hub](https://hub.docker.com/)
2. Sign in with username: `kugieapp`
3. Go to **Account Settings** → **Security**
4. Click **New Access Token**
5. Set description: "GitHub Actions - Chalkboard Release"
6. Set permissions: **Read, Write, Delete**
7. Copy the token and add it to GitHub Secrets

### Repository Setup

1. Create repository: `kugieapp/chalkboard`
2. Set description: "Billiard hall management system"
3. Link to GitHub repository
4. Set as public repository

## Deployment Examples

### Docker Deployment

```bash
# Latest version
docker run -p 3000:3000 kugieapp/chalkboard:latest

# Specific version
docker run -p 3000:3000 kugieapp/chalkboard:1.0.1

# Edge runtime (for serverless)
docker run -p 3000:3000 kugieapp/chalkboard:1.0.1-edge

# Using Docker Compose
docker compose up
```

### Windows Deployment

1. Download `chalkboard-windows-v1.0.1.tar.gz` from GitHub Releases
2. Extract the archive
3. Run `install.bat` as Administrator
4. Configure `.env` file in installation directory
5. Launch from desktop shortcut

## Troubleshooting

### Release Failed

1. **Check GitHub Actions logs** for specific error messages
2. **Common issues**:
   - Missing Docker Hub credentials
   - Build failures due to code issues
   - Test failures preventing release

### Windows Build Issues

1. Ensure `bun run build:standalone` works locally
2. Check that all dependencies are correctly specified
3. Verify `pkg` packaging configuration

### Docker Build Issues

1. Test Docker build locally:
   ```bash
   docker build -t test-build .
   ```
2. Check Dockerfile syntax and build arguments
3. Verify multi-architecture support

## Manual Release Steps (Fallback)

If automation fails, you can create releases manually:

### Manual Windows Build
```bash
bun run build:standalone
bun run package:windows
# Upload files from dist/release/ to GitHub release
```

### Manual Docker Build
```bash
# Build and push manually
docker buildx build --platform linux/amd64,linux/arm64 \
  -t kugieapp/chalkboard:1.0.1 \
  --push .
```

## Release Checklist

Before creating a new release:

- [ ] All tests passing
- [ ] CHANGELOG.md updated (optional)
- [ ] Version number updated in package.json
- [ ] Documentation updated if needed
- [ ] Database migrations tested (if applicable)
- [ ] Breaking changes documented

After release:

- [ ] Verify GitHub release created with all assets
- [ ] Verify Docker images published to Docker Hub
- [ ] Test Windows installer on clean system
- [ ] Update deployment environments if needed
- [ ] Announce release (if applicable)