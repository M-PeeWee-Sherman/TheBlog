
import useBloglist from './customHooks/useBlogList'
import CreatePost from './Components/CreatePost'
import PostList from './Components/PostList'
import './App.css';

function App() {
  const [fullList, setFullList, updateFn] = useBloglist();
  
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



  return (
    <div className="App">
      <CreatePost users_id={1} createFn={createEntry}/>
      <PostList updateFn={submitUpdate} deleteFn={deleteEntry} entryList={fullList}/>
    </div>
  );
}

export default App;
