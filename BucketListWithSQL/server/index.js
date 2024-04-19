const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
//Foundation

//Bring in our connection to DB
const pgClient = require('./connections/pgConnections');

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));





//Routes
app.get('/', (req, res) => {
    res.send("I am GROOT Route");
});

//Create
app.post('/bucket', (req, res) => {
    const { description } = req.body

    const query = 
    `INSERT INTO bucketlist.items (user_id, description)
    VALUES (4, '${description}')
    RETURNING *;`

    pgClient.query(query)
        .then(result => {
            res.json({ message: "Success", result: result.rows[0] })
        })
        .catch(error => {
            res.status(400).json({ message: "Unable to add bucket item" })
        })
})

//Read
app.get('/bucket', (req, res) => {

const query =
` SELECT * FROM bucketlist.items
WHERE user_id = 4
ORDER BY item_id ASC;`

    pgClient.query(query)
    .then(results => {
            res.json({ message: "Success", 
            results: results.rows })
        })
        .catch(error => {
            console.log("error reading data from DB", error)
            res.status(400).json({ message: "Unable to retrive data at this time" })
        })
})

//Update
app.put('/bucket/:id', (req, res) => {
    const requestedID = req.params.id;

   const query =` UPDATE bucketlist.items 
    SET is_complete = NOT is_complete
    WHERE item_id = ${requestedID};`

    pgClient.query(query)
        .then(result => {
            res.json({ message: "Success", result })
            
        })
        .catch(error => {
            console.log("Error updating data from DB:", error)
            res.status(400).json({ message: "Unable to update bucketlist item" })
        })
})
//Delete
app.delete('/bucket/:id', (req, res) => {
    const requestID = req.params.id;
    
   const query = `
   DELETE FROM bucketlist.items
WHERE item_id = ${requestID};`
    pgClient.query(query)
        .then(results => {
            res.json({ message: "Success", results })
        })
        .catch(error => {
            console.log("Error deleting data from DB:", error)
            res.status(400).json({ message: "Unable to delete bucketlist item" })
        })
})



//Lisener
app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));
