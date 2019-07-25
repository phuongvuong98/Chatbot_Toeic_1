// check connect postpreg
const {Pool, Client} = require("pg");
// const connectionString = "postgres://postgres:1@localhost:5432/Toiec";
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Toiec',
  password: '1',
  port: 5432,
})

module.exports = pool;