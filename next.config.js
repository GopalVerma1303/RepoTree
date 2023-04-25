const nextConfig = {
  reactStrictMode: true,
}
const { parsed: localEnv } = require('dotenv').config({
  path: '.env.local',
});

module.exports = {
  env: {
    ...localEnv,
  },
};
