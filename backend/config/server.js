module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'https://fb6a-71-86-161-68.ngrok.io'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '88fd4c3c03e61ab683295912d298997e'),
    },
  },
});
