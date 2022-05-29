import logo from './logo.svg';
import useBloglist from './customHooks/useBlogList'

import PostList from './Components/PostList'
import './App.css';

function App() {
  const [fullList, setFullList, updateFn] = useBloglist([]);
  let temp = {id:'1', users_id: '1',stamp:'10 Mar 2022',title:'alpha Intro',content:'alpha Intro Content \nxxxxxxxxxxxxxxxxxxxxxxx'};
  let list = [];
  for (let i=0; i < 10; i++){
      list.push({...temp});
  }
  let blank = ()=>{};
  
  return (
    <div className="App">
      <PostList updateFn={updateFn} deleteFn={blank} entryList={fullList}/>
    </div>
  );
}

export default App;
