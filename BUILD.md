# Building Cross-Platform Binaries

This package includes pre-built binaries for multiple platforms. If you need to build for a specific platform:

## Supported Platforms

- **Linux x64**: `binaries/linux-x64/instant-tauri` ✓ Included
- **macOS x64** (Intel): `binaries/darwin-x64/instant-tauri` 
- **macOS ARM64** (Apple Silicon): `binaries/darwin-arm64/instant-tauri`
- **Windows x64**: `binaries/win32-x64/instant-tauri.exe`

## Building on Each Platform

### On Linux (x64)
```bash
./build-binary.sh
```

### On macOS (Intel or Apple Silicon)
```bash
./build-binary.sh
```

### On Windows (x64)
```powershell
pnpm tauri build
mkdir binaries\win32-x64
copy src-tauri\target\release\instant-tauri.exe binaries\win32-x64\
```

## After Building All Platforms

1. Ensure all binaries are in their correct directories:
   ```
   binaries/
     linux-x64/instant-tauri
     darwin-x64/instant-tauri
     darwin-arm64/instant-tauri
     win32-x64/instant-tauri.exe
   ```

2. Test locally:
   ```bash
   npm link
   cd ~/some/other/directory
   npx instant-tauri
   ```

3. Publish to npm:
   ```bash
   npm publish
   ```

## Cross-Compilation Notes

Cross-compiling Tauri apps is challenging due to platform-specific GUI dependencies. The recommended approach is to build on each target platform natively, either:
- Manually on physical/virtual machines
- Using GitHub Actions with matrix builds (see `.github/workflows/build.yml` example)
- Using cloud build services

## Current Status

✓ Linux x64 binary included  
⚠ macOS and Windows binaries need to be built on their respective platforms
