import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.travisbumgarner.test',
  appName: "Travis's Awesome Demo App",
  webDir: 'build',
  server: {
    url: 'http://192.168.0.16:3000',
    cleartext: true
  }
};

export default config;
