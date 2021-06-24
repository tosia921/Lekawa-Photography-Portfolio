module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('DO_SPACE_SECRET_KEY', 'MKV3F3BM2YNS5Z3PT4P4'),
    },
  },
});