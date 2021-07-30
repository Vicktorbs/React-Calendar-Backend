const express = require('express');
var cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Create server 
const app = express();

// Data base
dbConnection();

// CORS
app.use(cors());

// Midalweares
app.use(express.static('public'));
app.use(express.json());

// Rroutes
app.use('/api/auth', require('./routes/auth'));

// Listener 
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${ process.env.PORT }`);
})