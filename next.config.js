/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pegaxy.io'],
  },
  theme: {
    extend: {
      colors: {
        gold: '#C9B037',
        silver: '#D7D7D7',
        bronze: '#6A3805',
        quaternary: '#9c27b0',
        quinary: '#673ab7',
      }
    }
  },
};  
