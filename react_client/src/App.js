import React, { useState, useEffect } from 'react';
import baseURL from './baseURL';
import useUsersList from './customHooks/useUsersList';
import useBloglist from './customHooks/useBlogList';
import CreatePost from './Components/CreatePost';
import PostList from './Components/PostList';
import Login from './Components/Login';
import Registration from './Components/Registration';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext from './Context';
import './App.css';

function App() {
  const [nameList, setNameList, updateUsers] = useUsersList();
  const [filterNameChoices, setFilteredNameChoices] = useState([]);
  const [fullList, setFullList, updateFn] = useBloglist();
  const [filteredList, setFilteredList] = useState([]); //filtered blog entries
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);
  const [logButtonValue, setLogButtonValue] = useState("Log In")
  const authObjContext = useState({AuthId:0,PW:"",username:"Guest"});
  const [authObj, setAuthObj] = authObjContext;
  let [currentUserView, setCurrentUserView]= useState({id:0,username:'View All'}); //asign user id


  let openRegistration = (e) =>{
    e.preventDefault();
    setOpenRegister(true);  }

  const changeView=(id)=>{
      let fullObject = filterNameChoices.filter((el)=>(parseInt(el.id)===parseInt(id)))
      setCurrentUserView({...fullObject[0]});
  }

  const logOut=()=>{
    setLogButtonValue("Log In");
    setAuthObj({AuthId:0,PW:"", username:"Guest"});
    changeView(0);

  }

  useEffect(()=>{

    if(authObj.AuthId>0){setDisableCreate(false)}else{setDisableCreate(true)}
  }
  ,[authObj])
  
    let openLog = (e) =>{
      e.preventDefault();
      if (logButtonValue==="Log In"){
        setOpenLogin(true);
      }else{
        logOut();
      }
        
    }

  let submitUpdate = (updateEntry)=>{
    const stamp = new Date().toUTCString();
    
    let bodyData = {id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content};
    //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
    fetch(`${baseURL}posts`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(bodyData)
        
    }).then((res)=>{
     updateFn()});
  }

  let deleteEntry=(id)=>{
    //console.log(`id is ${id}`)
    fetch(`${baseURL}posts/${id}`, {
      method: "DELETE", 
    }).then((res)=>{
     updateFn()});
  }

  let createEntry = (newEntry)=>{

    let bodyData = { users_id:newEntry.users_id,stamp:newEntry.stamp,title:newEntry.title,content:newEntry.content};
    //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
    fetch(`${baseURL}posts`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(bodyData)
        
    }).then((res)=>{
     updateFn()});
  }

  //called on successful login
  useEffect(()=>{
    if (logButtonValue==="Log Out"){
      setOpenLogin(false);
    }
      let index = filterNameChoices.findIndex((el)=>(el.id===authObj.AuthId))
      document.getElementById("Filter_Dropdown").selectedIndex = index;

  },[authObj, logButtonValue])

  let loginUser = (credentials)=>{
   
    fetch(`${baseURL}login`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(credentials)
          
    }).then((response) => {
      //window.alert(`Fetch Answer REturned ${response}`);
      return response.json()})
      .then((res)=>{
        //  window.alert(res) 
        // window.alert(Object.keys(res))
        // window.alert(res.users_id)
      let idAnswer = parseInt(res.users_id);

      if (idAnswer>0){
        //window.alert(`Answer ${idAnswer}`);
        setAuthObj({AuthId:idAnswer,PW:credentials.password, username:credentials.username});
        setLogButtonValue("Log Out");
        changeView(idAnswer);

      }else{
        window.alert("Incorrect username or password");

      }
      
    });

  }
  
  let createUser = (newEntry)=>{
    //window.alert("Create Triggered")

        let bodyData = { 
          firstname:newEntry.firstname,
          lastname:newEntry.lastname,
          username:newEntry.username,
          password:newEntry.password,
        }
        
        //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
        fetch(`${baseURL}users`, {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify(bodyData)
            
        }).then((res)=>{
       
          updateUsers();
        });

    

  }


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
      <AuthContext.Provider value={authObjContext}>
      <Grid container spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  variant="outlined" >
        <Grid item xs={3}>
        <Typography variant="h3">TheBlog for {authObj.username}</Typography>
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
            <Grid item xs={2} container direction="column">
            <Button onClick={openRegistration}>Register</Button>            
            <Button onClick={openLog}>{logButtonValue}</Button>
    
            </Grid>
            </Grid>
        <Registration open={openRegister} setOpen={setOpenRegister} createFn={createUser}></Registration>
        <Login open={openLogin} setOpen={setOpenLogin} loginFn={loginUser}></Login>
        
 
      <CreatePost disableCreate={disableCreate} users_id={authObj.AuthId} createFn={createEntry}/>
      <PostList updateFn={submitUpdate} deleteFn={deleteEntry} entryList={filteredList}/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
