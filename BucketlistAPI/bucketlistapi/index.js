const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;
// const morgan = require('morgan');
const bucketList = require('./data/mock')

// app.use(morgan('dev'));
//Needed for req.body
app.use(express.urlencoded({ extended: false}));
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send('I am the ROOT route')
})

//READ
app.get('/bucket', (req, res) => {
    res.status(200).json(bucketList)
})

//CREATE
app.post('/bucket', (req, res) => {
    const {description} = req.body
    if(description){
        let newItem = {
            id: Date.now(),
            description: description,
            isCompleted: false
        }
        bucketList.push(newItem)
        res.status(201).json({message: "Success", newItem})
    } else {
        res.status(400).json({message: "Failure to Live Life to the Fullest"})
    }
})

//UPDATE
app.put('/bucket/:id',(req, res) => {
    const bucketListId = parseInt(req.params.id)
    const bucketItem = bucketList.find(item => item.id === bucketListId)

    if(bucketItem){
        bucketItem.isComplete = !bucketItem.isComplete
        res.status(200).json({message: "Success", bucketItem})
        }else {
            res.status(400).json({message: "Failure to find item"})
        }
    });


//DELETE
app.delete('/bucket/:id', (req, res) =>{
    const bucketListId = parseInt(req.params.id);
    const deleteBucketItem = bucketList.findIndex(item => item.id === bucketListId);

    if(deleteBucketItem !== -1){
        const deletedItem = bucketList.splice(deleteBucketItem,1)
        res.status(200).json({message: "Success", deletedItem})
    } else {
        res.status(404).json({message: "Item NOT found"})
    }
});

// app.listen(PORT, () => console.log(`You're running on Port:${PORT}`));

module.exports.handler = serverless(app);