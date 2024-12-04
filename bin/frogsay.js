#!/usr/bin/env node
import('../dist/index.js').catch((err) => {
  console.error('Failed to load module:', err);
  process.exit(1);
});
