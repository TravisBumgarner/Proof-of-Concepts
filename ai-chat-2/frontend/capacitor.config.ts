import type { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.NODE_ENV === 'development';

const config: CapacitorConfig = {
  appId: 'dev.travisbumgarner.test',
  appName: "Travis's Awesome Demo App",
  webDir: 'build',
  server: isDev
    ? { url: 'http://localhost:3000', cleartext: true }
    : undefined, // Remove server config in production
};


export default config;
