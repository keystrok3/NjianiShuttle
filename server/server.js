require('dotenv').config({ path: './.env' });
const express = require('express');


// Environment variables
const PORT = process.env.PORT;


const app = express();


// Middleware
app.use(express.json());

//Routes middleware
app.use('/api/auth', require('./routes/user.js')); 





const server = app.listen(PORT, () => `Listening on PORT: ${PORT}`);

process.on('unhandledRejection', (err, promise) => {
    console.error("Server Error: ", err);;

    server.close(() => process.exit(1));
});