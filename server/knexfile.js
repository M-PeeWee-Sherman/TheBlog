// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'db'
    }
  },


  production: {
    client: 'postgresql',
    connection: {
      database: 'db',
      user:     'postgres',
      password: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
