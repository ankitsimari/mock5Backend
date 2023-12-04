const express = require('express');
const { connection } = require('./db');
const { contactRoute } = require('./routes/contact.routes');
const app = express();

app.use(express.json());

app.use("/contacts",contactRoute)



app.listen(8080,async()=>{
await connection
console.log("DB is connected and port is running at 8080")
})