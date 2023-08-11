import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'styled-system': path.resolve(__dirname, './styled-system')
    }
  },
  plugins: [react()],
  preview: {
    port: 9002
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/atom-game-management.tsx'),
      formats: ['system'],
      fileName: () => 'atom-game-management.js'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'formik',
        'inversify',
        'react-router-dom',
        'reflect-metadata',
        'yup',
        'react-redux',
        '@automapper/core',
        '@automapper/classes',
        '@atom/authorization',
        '@atom/design-system',
        '@atom/common',
        '@atom/partner-management',
        '@atom/cms-label-management'
      ],
      output: {
        intro: `const process = {env: ${JSON.stringify(process.env)}}`
      }
    }
  }
});
