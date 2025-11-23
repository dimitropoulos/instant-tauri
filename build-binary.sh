#!/bin/bash
# Build script for creating platform-specific binaries
# Run this script on each target platform

set -e

echo "Building instant-tauri for current platform..."

# Navigate to the project root
cd "$(dirname "$0")"

# Build the release binary
pnpm tauri build

# Detect platform and copy binary to the correct location
OS=$(uname -s)
ARCH=$(uname -m)

if [ "$OS" = "Linux" ]; then
    if [ "$ARCH" = "x86_64" ]; then
        PLATFORM_DIR="linux-x64"
        BINARY_NAME="instant-tauri"
        SOURCE="src-tauri/target/release/instant-tauri"
    else
        echo "Unsupported Linux architecture: $ARCH"
        exit 1
    fi
elif [ "$OS" = "Darwin" ]; then
    if [ "$ARCH" = "x86_64" ]; then
        PLATFORM_DIR="darwin-x64"
        BINARY_NAME="instant-tauri"
        SOURCE="src-tauri/target/release/instant-tauri"
    elif [ "$ARCH" = "arm64" ]; then
        PLATFORM_DIR="darwin-arm64"
        BINARY_NAME="instant-tauri"
        SOURCE="src-tauri/target/release/instant-tauri"
    else
        echo "Unsupported macOS architecture: $ARCH"
        exit 1
    fi
else
    echo "Unsupported OS: $OS"
    echo "For Windows, run: pnpm tauri build"
    echo "Then manually copy src-tauri/target/release/instant-tauri.exe to binaries/win32-x64/"
    exit 1
fi

# Create the platform directory and copy the binary
mkdir -p "binaries/$PLATFORM_DIR"
cp "$SOURCE" "binaries/$PLATFORM_DIR/$BINARY_NAME"
chmod +x "binaries/$PLATFORM_DIR/$BINARY_NAME"

echo "✓ Binary built successfully for $PLATFORM_DIR"
echo "  Location: binaries/$PLATFORM_DIR/$BINARY_NAME"
echo "  Size: $(du -h "binaries/$PLATFORM_DIR/$BINARY_NAME" | cut -f1)"
