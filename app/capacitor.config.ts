import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.transportescuauhtemoc.spio',
  appName: 'SPIO Operadores',
  webDir: 'www/browser',
  android: {
    allowMixedContent: true,
    backgroundColor: '#0D0D0D'
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
