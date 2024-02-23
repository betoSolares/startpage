import createJiti from 'jiti';

const jiti = createJiti(new URL(import.meta.url).pathname);

jiti('./src/lib/env.server');
jiti('./src/lib/env.client');

/** @type {import("next").NextConfig} */
const config = {};

export default config;
