require('dotenv').config();
const { Client } = require('pg');

//Destructuring our credentals for postgres
const { HOSTNAME, DATABASE, PORT, USERNAME, PASS} = process.env;


//Build our connection object
const connObj = {
    host: HOSTNAME,
    database: DATABASE,
    port: PORT,
    user: USERNAME,
    password: PASS
}


// Create new client 
const pgClient = new Client(connObj);

//Connect to the DB
pgClient.connect()
    .then(() => console.log(`Connected to Database: ${DATABASE}`))
    .catch((err) => console.log(`Trouble connecting to Database`, err))


module.exports = pgClient;
