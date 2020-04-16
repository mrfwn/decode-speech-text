require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },  
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
