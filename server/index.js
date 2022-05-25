const express = require('express');
const app = express();
const port = 3001;

app.get('/',(req,res)=>{
    res.status(200).json('Hello from root route');
})

app.listen(port, ()=>console.log(`Express server listening on port ${port}`))