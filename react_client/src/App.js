import logo from './logo.svg';

import PostList from './Components/PostList'
import './App.css';

function App() {
  let temp = {id:'1', users_id: '1',stamp:'10 Mar 2022',title:'alpha Intro',content:'alpha Intro Content \nxxxxxxxxxxxxxxxxxxxxxxx'};
  let list = [];
  for (let i=0; i < 10; i++){
      list.push({...temp});
  }
  let blank = ()=>{};
  
  return (
    <div className="App">
      <PostList updateFn={blank} deleteFn={blank} entryList={list}/>
    </div>
  );
}

export default App;
