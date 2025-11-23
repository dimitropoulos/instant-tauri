#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the Tauri app in dev mode
const tauriPath = join(__dirname, '..', 'node_modules', '.bin', 'tauri');
const proc = spawn(tauriPath, ['dev'], {
  cwd: join(__dirname, '..'),
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

proc.on('exit', (code) => {
  process.exit(code || 0);
});
