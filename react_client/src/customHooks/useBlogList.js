import React, { useState, useEffect } from 'react';

const useBloglist = () => {
    const [fullList, setFullList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateFn = ()=>{setUpdate(update+1);};
    useEffect(() => {
        let url = "http://localhost:3001/posts";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
      
                setFullList(data);
            });
    }, [update]);

    return [fullList, setFullList, updateFn];
}

export default useBloglist;