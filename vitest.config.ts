/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setup.ts',
    css: true,
    restoreMocks: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@shared/styles/_variables.scss" as *;
          @use "@shared/styles/_mixins.scss" as mix;
        `,
      },
    },
  },
});
