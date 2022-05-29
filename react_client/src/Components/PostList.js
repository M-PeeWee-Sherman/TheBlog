import Post from './Post'
import Stack from '@mui/material/Stack';
import {SpinningCircles} from 'react-loading-icons'

const PostList=({updateFn,deleteFn,entryList})=> {
    let compiledPosts = entryList.map((element)=>(
        <Post updateFn={updateFn} deleteFn={deleteFn} entry={element}/>
        ))
    if (entryList.length===0) {
        return(<SpinningCircles/>)
    } else {
        return (<Stack 
                direction="column" 
                spacing={1}
                alignItems="center"
                justifyContent="center"
                margin={2}>
                { compiledPosts }
            </Stack>)
    }
}

export default PostList;
