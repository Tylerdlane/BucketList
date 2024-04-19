require('dotenv').config();
const mongoose = require('mongoose')

//Desrtucuring the .env
const { URI, DB, DB_USER, DB_PASS } = process.env

const URL = `${URI}/${DB}`

const connectionObj = {
    authSource: "admin",
    user: DB_USER,
    pass: DB_PASS,
}


mongoose.connect(URL, connectionObj)
    .then(() => {
        console.log(`Success: Connected to DB: ${DB}`)
    })
    .catch(error => {
        console.log(`Error: Connecting to ${DB} DB:`, error)
    })