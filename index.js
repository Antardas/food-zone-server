const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const {MongoClient} = require('mongodb')
require('dotenv').config();

// Middle Ware
app.use(cors());
app.use(express.json());

// Mongodb Code Client Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mc60i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('food-delivery')
        const foodsCollection = database.collection('foods');
        app.get('/foods', async (req, res) => {
            console.log('Hitting the database');
            const foods = await foodsCollection.find({});
            const result = await foods.toArray();
            console.log(result);
            res.json(result);
        })
        //  Add New Food Item API
        app.post('/addFood', async (req, res) => {
            console.log('Hitting the Add Food Api');
            const { data } = req.body;
            console.log(data)
            const result = await foodsCollection.insertOne(data);
            res.json(result)
        })
    } finally {
        
    }
}
run().catch(console.dir);

//Basic setup 

app.get('/', (req, res) => {
    console.log('Bidesh Ghuri sever starting');
    res.json('Bidesh Ghuri sever starting');
})

app.listen(port, (req, res) => {
    console.log('Bidesh Ghuri Port: ', port);
})