const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middle Ware
app.use(cors());
app.use(express.json());


//Basic setup 

app.get('/', (req, res) => {
    console.log('Bidesh Ghuri sever starting');
    res.json('Bidesh Ghuri sever starting');
})

app.listen(port, (req, res) => {
    console.log('Bidesh Ghuri Port: ', port);
})