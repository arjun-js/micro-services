const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send('Hello there, General Kenobi');
});

app.listen(8080);