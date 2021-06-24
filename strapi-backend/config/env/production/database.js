const parse = require('pg-connection-string').parse
const config = parse(process.env.DATABASE_URL)

module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: congif.host,
          port: congif.port,
          database: congif.database,
          username: congif.user,
          password: congif.password,
          ssl: {
              rejectUnauthorized: false
          }
        },
        options: {
          
        },
      },
    },
  });