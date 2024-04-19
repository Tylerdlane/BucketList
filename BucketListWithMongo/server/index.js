const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
//Foundation

//Bring in our connection to DB
require('./connections/mongoConnections');

const BucketModel = require('./models/bucketModel')


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

    BucketModel.create({ description: description })
        .then(result => {
            res.json({ message: "Success", result })
        })
        .catch(error => {
            res.status(400).json({ message: "Unable to add bucket item" })
        })
})

//Read
app.get('/bucket', (req, res) => {
    BucketModel.find()
        .then(results => {
            res.json({ message: "Success", results })
        })
        .catch(error => {
            console.log("error reading data from DB", error)
            res.status(400).json({ message: "Unable to retrive data at this time" })
        })
})

//Update
app.patch('/bucket/:id', (req, res) => {
    //FIND THE DOC TO UPDATE
    //UPDATE IN MEMORY
    // SAVE TO DB
    const requestedID = req.params.id;
    BucketModel.findByIdAndUpdate(requestedID)
        .then(results => {
            console.log(results)
            results.isCompleted = !results.isCompleted
           return results.save();
        })
        .then(updatedResult => {
            res.json({ message: "Success", updatedResult })
            
        })
        .catch(error => {
            console.log("Error updating data from DB:", error)
            res.status(400).json({ message: "Unable to update bucketlist item" })
        })
})
//Delete
app.delete('/bucket/:id', (req, res) => {
    const requestID = req.params.id;
    
    BucketModel.findByIdAndDelete(requestID)
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
