const express = require('express');
require('dotenv').config();

// Create server 
const app = express();

// Midalweares
app.use(express.static('public'));
app.use(express.json());

// Rroutes
app.use('/api/auth', require('./routes/auth'));

// Listener 
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${ process.env.PORT }`);
})