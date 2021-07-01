const { i18n } = require('./next-i18next.config');

module.exports = {
    i18n,
    images: {
        domains: ['strapi-space.ams3.digitaloceanspaces.com'],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/(.*)/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value:
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};
