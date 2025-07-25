/* eslint-disable import/no-extraneous-dependencies */
import { reactRouter } from '@react-router/dev/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const pwaOptions: Partial<VitePWAOptions> = {
  // TODO: enable if you want to enable PWA service worker
  disable: true,
  registerType: 'autoUpdate',
  manifest: {
    short_name: 'vite-react-chakra-starter',
    name: 'Vite React App Template',
    lang: 'en',
    start_url: '/',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    dir: 'ltr',
    display: 'standalone',
    prefer_related_applications: false,
  },
  pwaAssets: {
    disabled: false,
    config: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCheckDisabled = mode === 'production' || !!process.env.VITEST;
  return {
    plugins: [
      reactRouter(),
      ...(!isCheckDisabled
        ? [
            checker({
              typescript: true,
              biome: true,
            }),
          ]
        : []),
      tsconfigPaths(),
      visualizer({ template: 'sunburst' }) as unknown as PluginOption,
      VitePWA(pwaOptions),
    ],
    server: {
      open: true,
    },
  };
});
