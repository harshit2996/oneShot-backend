let mongoose = require('mongoose');
require('dotenv').config();

const server = process.env.DATABASE_SERVER; // REPLACE WITH YOUR DB SERVER
const database = process.env.DATABASE_NAME;      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()