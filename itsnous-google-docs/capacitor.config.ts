import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'its.nous.v2',
  appName: 'its-nous-v2',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
