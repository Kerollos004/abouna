import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // إضافة إعداد فارغ لـ turbopack لمنع خطأ التضارب مع next-pwa
  turbopack: {},
};

export default withPWA(nextConfig);