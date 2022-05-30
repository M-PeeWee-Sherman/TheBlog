import React, { useState, useEffect } from 'react';

const useBloglist = () => {
    const [postList, setPostList] = useState([]);
    const [nameList, setNameList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateFn = ()=>{setUpdate(update+1);};
    useEffect(() => {
        let urlPosts = "http://localhost:3001/posts";
        let postAnswer = fetch(urlPosts)
        .then((res) => res.json())
        .then((data) => {
  
            setPostList(data);
        });
        let urlNames = "http://localhost:3001/users";
        let nameAnswer = fetch(urlNames)
        .then((res) => res.json())
        .then((data) => {
  
            setNameList(data);
        });
        Promise.all([postAnswer, nameAnswer]).then(()=>{
            let mapNames = new Map();
            nameList.forEach((entry)=>{
                mapNames(entry.id,{firstname:entry.firstname, lastname:entry.lastname, username:entry.username})
            })
            
        })
    }, [update]);



    return [combinedList, setCombinedList, updateFn];
}

export default useBloglist;