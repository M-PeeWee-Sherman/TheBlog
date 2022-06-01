import React, { useState, useEffect } from 'react';
import useUsersList from './customHooks/useUsersList';
import useBloglist from './customHooks/useBlogList'
import CreatePost from './Components/CreatePost'
import PostList from './Components/PostList'
import Registration from './Components/Registration'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const [nameList, setNameList, updateUsers] = useUsersList();
  const [filterNameChoices, setFilteredNameChoices] = useState([]);
  const [fullList, setFullList, updateFn] = useBloglist();
  const [filteredList, setFilteredList] = useState([]); //filtered blog entries
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  let openRegistration = (e) =>{
    e.preventDefault();
    setOpenRegister(true);  }
  
  let submitUpdate = (updateEntry)=>{
    const stamp = new Date().toUTCString();
    
    let bodyData = {id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content};
    //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
    fetch("http://localhost:3001/posts", {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(bodyData)
        
    }).then((res)=>{
     updateFn()});
  }

  let deleteEntry=(id)=>{
    //console.log(`id is ${id}`)
    fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE", 
    }).then((res)=>{
     updateFn()});
  }

  let createEntry = (newEntry)=>{

    let bodyData = { users_id:newEntry.users_id,stamp:newEntry.stamp,title:newEntry.title,content:newEntry.content};
    //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(bodyData)
        
    }).then((res)=>{
     updateFn()});
  }

  let [currentUserView, setCurrentUserView]= useState({id:0,username:'View All'}); //asign user id

  const handleFilterChange = (event) => {
    let fullObject = filterNameChoices.filter((el)=>(parseInt(el.id)===parseInt(event.target.value)))
    //if(parseInt(event.target.value)===1){window.alert(`${filterNameChoices[1].id} ?= ${event.target.value} ${fullObject.length} ${Object.keys(fullObject)} ${fullObject.id}`)}
    setCurrentUserView({...fullObject[0]});
  };
  
  useEffect(()=>{
    setFilteredNameChoices([{id:0,username:'View All'}].concat([...nameList]));
  },[nameList])
  
  useEffect(()=>{   
    setFilteredList([].concat(fullList.filter((element)=>(((currentUserView.id===0) || (element.users_id===currentUserView.id))))));
  },[fullList, currentUserView])
  
  return (
    <div className="App">
      <Grid container spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  variant="outlined" >
        <Grid item xs={3}>
        <Typography variant="h2">TheBlog</Typography>
        </Grid>
        <Grid item xs={2}>
          <InputLabel variant="standard" htmlFor="Filter_Dropdown">
            Author Filter
          </InputLabel>
          <NativeSelect
            defaultValue={currentUserView.id}
            inputProps={{
              name: 'filter',
              id: 'Filter_Dropdown',
            }}
            onChange={handleFilterChange}>
              {filterNameChoices.map((el)=>(<option key={`option_${el.id}`} value={el.id}>{el.username}</option>))}

            </NativeSelect>
          </Grid>
            <Grid container direction="column">
            <Button onClick={openRegistration}>Register</Button>
            <Registration open={openRegister} setOpen={setOpenRegister}></Registration>
            <Button>Login</Button>
            </Grid>
        </Grid>
      <CreatePost users_id={1} createFn={createEntry}/>
      <PostList updateFn={submitUpdate} deleteFn={deleteEntry} entryList={filteredList}/>
    </div>
  );
}

export default App;
