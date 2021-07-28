const express = require('express');
require('dotenv').config();

// Create server 
const app = express();

// Midalweares
app.use(express.static('public'))

// Rroutes
// app.get('/', (req, res) => {
//     console.log('/ required');
//     res.json({
//         ok: true
//     })
// })

// Listener 
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${ process.env.PORT }`);
})