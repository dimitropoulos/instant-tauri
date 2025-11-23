#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { platform, arch } from 'os';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Store the original directory where the user ran the command
const userCwd = process.cwd();

// Get the binary path based on platform
const getBinaryInfo = () => {
  const plat = platform();
  const architecture = arch();
  
  let platformDir, binaryName;
  
  if (plat === 'linux' && architecture === 'x64') {
    platformDir = 'linux-x64';
    binaryName = 'instant-tauri';
  } else if (plat === 'darwin' && architecture === 'x64') {
    platformDir = 'darwin-x64';
    binaryName = 'instant-tauri';
  } else if (plat === 'darwin' && architecture === 'arm64') {
    platformDir = 'darwin-arm64';
    binaryName = 'instant-tauri';
  } else if (plat === 'win32' && architecture === 'x64') {
    platformDir = 'win32-x64';
    binaryName = 'instant-tauri.exe';
  } else {
    throw new Error(`Unsupported platform: ${plat}-${architecture}`);
  }
  
  return {
    path: join(__dirname, '..', 'binaries', platformDir, binaryName),
    platform: `${plat}-${architecture}`
  };
};

try {
  const binaryInfo = getBinaryInfo();
  
  if (!existsSync(binaryInfo.path)) {
    console.error(`\n❌ Binary not available for ${binaryInfo.platform}`);
    console.error(`\nThis package currently only includes binaries for:`);
    console.error(`  ✓ Linux x64`);
    console.error(`\nYour platform (${binaryInfo.platform}) is not yet supported.`);
    console.error(`\nTo help add support for your platform:`);
    console.error(`1. Clone the repository`);
    console.error(`2. Run: ./build-binary.sh (on Mac/Linux) or pnpm tauri build (on Windows)`);
    console.error(`3. Submit a PR with the new binary`);
    console.error(`\nOr open an issue requesting ${binaryInfo.platform} support.`);
    process.exit(1);
  }
  
  const proc = spawn(binaryInfo.path, [], {
    stdio: 'inherit',
    env: {
      ...process.env,
      USER_CWD: userCwd
    }
  });

  proc.on('exit', (code) => {
    process.exit(code || 0);
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
