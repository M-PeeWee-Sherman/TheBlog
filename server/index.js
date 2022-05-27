const express = require('express');
const app = express();
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

// //Update Post
// app.put('/posts', (req,res)=>{
//     let data = req.body;
//     knex('posts').update(data)
// })

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