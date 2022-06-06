/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    URI: 'http://api:5000',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    URI: 'http://localhost:5000',
  }
}
