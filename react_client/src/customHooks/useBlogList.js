import React, { useState, useEffect } from 'react';

const useBloglist = () => {
    const [fullList, setFullList] = useState([]);
    let update = 0;
    const updateFn = ()=>{update++;};
    useEffect(() => {
        let url = "http://localhost:3001/posts";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
             //window.alert('fetchData: ', data)
                setFullList(data);
            });
    }, [update]);

    return [fullList, setFullList, updateFn];
}

export default useBloglist;