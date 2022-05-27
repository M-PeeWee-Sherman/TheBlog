import logo from './logo.svg';
import Post from './Components/Post'
import './App.css';

function App() {
  let blank = ()=>{};
  let temp = {id:'1', users_id: '1',stamp:'10 Mar 2022',title:'alpha Intro',content:'alpha Intro Content \nxxxxxxxxxxxxxxxxxxxxxxx'};
  return (
    <div className="App">

      <Post showFullFn={blank} updateFn={blank} deleteFn={blank} entry={temp}/>
    </div>
  );
}

export default App;
