const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
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
        const ordersCollection = database.collection('orders')
        // fetch all food
        app.get('/foods', async (req, res) => {
            console.log('Hitting the get all food api');
            const foods = await foodsCollection.find({});
            const result = await foods.toArray();
            res.json(result);
        })
        //  Add New Food Item API
        app.post('/addFood', async (req, res) => {
            console.log('Hitting the Add Food Api');
            const { data } = req.body;
            data.quantity = 1;
            console.log(data)
            const result = await foodsCollection.insertOne(data);
            res.json(result)
        })

        // Get specefic food
        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await foodsCollection.findOne(query);
            console.log(result)

            res.json(result);
        })

        // set order specefic user
        app.post('/addOrders', async (req, res) => {
            console.log('Hitting add orders Collection');
            console.log(req.body);
            const { data } = req.body;
            data.status = 'Pending';
            const result = await ordersCollection.insertOne(data);
            res.json(result);
        })

        // Specific user ordered products

        app.get('/getUserOrders/:email', async (req, res) => {
            console.log('Hitting User Orders Collection');
            const email = req.params.email
            const query = { email: email };
            const orders = await ordersCollection.find(query);
            const result = await orders.toArray();
            res.json(result);
        });

        // Get all order 

        app.get('/allOrders', async (req, res) => {
            console.log('Hitting all Orders api');
            const orders = await ordersCollection.find({});
            const result = await orders.toArray();
            res.json(result);
        })

        // Approve Order
        app.put('/approved/:id', async (req, res) => {
            console.log('Hitting all Approved api');
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const orders = await ordersCollection.findOne(query);
            console.log(orders);
            res.json(result);
        })

        // Delete user order 

        app.delete('/deleteOrder/:id', async (req, res) => {
            console.log('Deleteing User Order delete api');
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query); 
            res.json(result);
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