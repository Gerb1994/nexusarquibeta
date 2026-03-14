import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import type { RollupLog } from 'rollup';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const normalizeModulePath = (modulePath: string): string => modulePath.replace(/\\/g, '/');

const isNodeModulesWarning = (warning: RollupLog): boolean =>
  typeof warning.id === 'string' && normalizeModulePath(warning.id).includes('/node_modules/');

const isReactCoreModule = (id: string): boolean =>
  ['/react/', '/react-dom/', '/scheduler/', '/loose-envify/', '/js-tokens/'].some((pkg) =>
    id.includes(pkg),
  );

const isReactRouterModule = (id: string): boolean =>
  ['/react-router/', '/react-router-dom/', '/@remix-run/', '/history/'].some((pkg) =>
    id.includes(pkg),
  );

const isProjectDetailsModule = (id: string): boolean =>
  [
    '/src/frontend/pages/ProjetoDetalhesPageContent',
    '/src/frontend/components/projetos/ProjetoDetalhesWidgets',
    '/src/frontend/components/projetos/',
  ].some((modulePath) => id.includes(modulePath));

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: 'NexusArqui',
        short_name: 'NexusArqui',
        description: 'Sistema de gestão para escritório de arquitetura',
        theme_color: '#8B5E3C',
        background_color: '#F5F2EE',
        display: 'standalone',
        orientation: 'landscape',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'app-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/frontend'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = normalizeModulePath(id);

          if (isProjectDetailsModule(normalizedId)) {
            return 'project-details';
          }

          if (!normalizedId.includes('/node_modules/')) {
            return undefined;
          }

          if (isReactCoreModule(normalizedId)) {
            return 'react-core';
          }

          if (isReactRouterModule(normalizedId)) {
            return 'react-router';
          }

          if (normalizedId.includes('/gantt-task-react/')) {
            return 'gantt';
          }

          if (normalizedId.includes('/recharts/')) {
            return 'charts';
          }

          if (normalizedId.includes('/docx/')) {
            return 'docx';
          }

          if (normalizedId.includes('/jspdf/')) {
            return 'jspdf';
          }

          if (normalizedId.includes('/html2canvas/')) {
            return 'html2canvas';
          }

          if (normalizedId.includes('/file-saver/')) {
            return 'file-saver';
          }

          if (normalizedId.includes('/wa-sqlite/')) {
            return 'wa-sqlite';
          }

          return 'vendor';
        },
      },
      onwarn(warning, defaultHandler) {
        if (warning.code === 'INVALID_ANNOTATION' && isNodeModulesWarning(warning)) {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
});
