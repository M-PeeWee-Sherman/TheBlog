import React, { useState, useEffect } from 'react';

const useUsersList=()=>{
    const [nameList, setNameList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateUsers = ()=>{setUpdate(update+1);};

    //pull user name lookup list
    useEffect(()=>{
        let urlNames = "http://localhost:3001/users";
        fetch(urlNames)
        .then((res) => res.json())
        .then((data) => {
            setNameList(data);
        });
    })

    return [nameList, setNameList, updateUsers];

}

export default useUsersList;