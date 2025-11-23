#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Run the Tauri app in production mode
const tauriPath = path.join(__dirname, '..', 'node_modules', '.bin', 'tauri');
const proc = spawn(tauriPath, ['dev'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

proc.on('exit', (code) => {
  process.exit(code || 0);
});
