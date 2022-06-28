const {Pool} = require('pg')
require('dotenv').config()

const {DATABASE_URL: connectionString} = process.env

const db = new Pool({
    connectionString
})

module.exports = db