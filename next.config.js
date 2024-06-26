import createJiti from 'jiti';

const jiti = createJiti(new URL(import.meta.url).pathname);
jiti('./src/lib/env');

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default config;
