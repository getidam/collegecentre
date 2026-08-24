import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // React core — cached separately forever
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Lucide icons — 955KB, only download once and cache
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // Supabase — large, rarely changes
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          // Admin portal — only loaded when admin visits /admin
          if (id.includes('src/components/AdminPortal')) {
            return 'chunk-admin';
          }
          // Student form — only loaded when opening form
          if (id.includes('src/components/StudentDataCollection')) {
            return 'chunk-form';
          }
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.warn', 'console.info'],
      },
    },
    sourcemap: false,
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', '@supabase/supabase-js'],
  },
})
