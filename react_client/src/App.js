
import useBloglist from './customHooks/useBlogList'

import PostList from './Components/PostList'
import './App.css';

function App() {
  const [fullList, setFullList, updateFn] = useBloglist();
  let temp = {id:'1', users_id: '1',stamp:'10 Mar 2022',title:'alpha Intro',content:'alpha Intro Content \nxxxxxxxxxxxxxxxxxxxxxxx'};
  let list = [];
  for (let i=0; i < 10; i++){
      list.push({...temp});
  }
  let blank = ()=>{};
  let submitUpdate = (updateEntry)=>{
    const stamp = new Date().toUTCString();
    let tempObj = { users_id: '1',title:'alphaNEW',content:'alpha NEW'};
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

  return (
    <div className="App">
      <PostList updateFn={submitUpdate} deleteFn={deleteEntry} entryList={fullList}/>
    </div>
  );
}

export default App;
