# instant-tauri

A quick demo Tauri desktop app that can be run instantly with `npx`.

## Usage

```bash
npx instant-tauri
```

## What it does

- Shows the absolute path of the directory where you ran the command
- Provides a file picker button to select a `package.json` file
- Updates the displayed path to the directory containing the selected file

## Supported Platforms

- ✓ Linux x64
- ⚠️ macOS x64 (Intel) - Binary not yet included
- ⚠️ macOS ARM64 (Apple Silicon) - Binary not yet included  
- ⚠️ Windows x64 - Binary not yet included

**Note**: Currently only Linux x64 binary is included. If you're on another platform and want to help, see [BUILD.md](BUILD.md) for instructions on building platform-specific binaries.

## Development

This is a proof-of-concept for distributing Tauri apps via npm. The app is built with:
- Tauri 2.x
- React 19
- Vite 7

## License

MIT
