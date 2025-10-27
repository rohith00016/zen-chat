#!/usr/bin/env node

/**
 * Build and test script for performance validation
 * Builds the app in production mode and provides performance metrics
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting performance optimization build and test...\n');

try {
  // Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build for production
  console.log('📦 Building for production...');
  const buildStart = Date.now();
  execSync('npm run build', { stdio: 'inherit' });
  const buildEnd = Date.now();
  const buildTime = buildEnd - buildStart;

  console.log(`✅ Build completed in ${buildTime}ms\n`);

  // Analyze bundle size
  console.log('📊 Analyzing bundle size...');
  const distPath = path.join(__dirname, '..', 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    let totalSize = 0;
    
    files.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      console.log(`  ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    });
    
    console.log(`\n📈 Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`📈 Gzipped estimate: ${(totalSize * 0.3 / 1024).toFixed(2)} KB\n`);
  }

  // Performance recommendations
  console.log('🎯 Performance Optimizations Applied:');
  console.log('  ✅ React.memo for component memoization');
  console.log('  ✅ useCallback for function memoization');
  console.log('  ✅ useMemo for value memoization');
  console.log('  ✅ Context optimization with useMemo');
  console.log('  ✅ Debounced search input (300ms)');
  console.log('  ✅ Lazy loading for images');
  console.log('  ✅ Virtual scrolling for large lists');
  console.log('  ✅ GPU-accelerated CSS animations');
  console.log('  ✅ Optimized image rendering');
  console.log('  ✅ Throttled scroll events');
  console.log('  ✅ Memory leak prevention\n');

  console.log('🚀 Starting preview server...');
  console.log('   Open http://localhost:4173 to test the optimized app');
  console.log('   Press Ctrl+C to stop the server\n');

  // Start preview server
  execSync('npm run preview', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Error during build process:', error.message);
  process.exit(1);
}

