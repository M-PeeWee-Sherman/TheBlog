const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
const port = 3001;

const knex = require('knex')(require('./knexfile')['development']);

app.get('/',(req,res)=>{
    res.status(200).json('Hello from root route');
})

app.get('/posts', (req,res)=>{
    knex.select('*').from('posts').then((data)=>res.status(200).json(data))
    .catch(err =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
})

 app.get('/posts/:users_id', (req,res)=>{
    knex.select('*').from('posts').where({users_id:req.params.users_id}).then((data)=>res.status(200).json(data))
    .catch(err =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
 })

 //Update Post
 app.post('/posts', (req,res)=>{
    if (req.body){
    let data = req.body;
    console.log("Body:" +req.body);
    knex('posts').insert(data).then(id=>{
        return res.status(201).json(id);
    });
    }else{console.log("Request Body is Null")}
})

 //Update Post
app.put('/posts', (req,res)=>{
    let data = req.body;
    knex('posts').returning('id').update(data).then(id=>{
        return res.status(201).json(id);
    });
    
})

// //Create User
// app.post('/users', (req,res)=>{

// })

// //Update User
// app.post('/users/:id', (req,res)=>{

// })

// app.delete('/posts/:id', (req,res)=>{

// })

// app.delete('/posts/:id', (req,res)=>{

// })

app.listen(port, ()=>console.log(`Express server listening on port ${port}`))