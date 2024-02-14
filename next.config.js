import createJiti from 'jiti';

const jiti = createJiti(new URL(import.meta.url).pathname);

jiti('./src/env/server');
jiti('./src/env/client');

/** @type {import("next").NextConfig} */
const config = {};

export default config;
