const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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
    knex('posts').returning('id').insert(data).then(id=>{
        return res.status(201).json(id);
    });
    }else{console.log("Request POST Body is Null")}
})

 //Update Post
app.put('/posts', (req,res)=>{
    if (req.body){
        let id = req.body.id;
        let data = req.body;
        delete data.id;
    knex('posts').where({id}).update(data).then(()=>{
        return res.status(201).json(id);
    });
    }else{console.log("Request PUT Body is Null")}
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