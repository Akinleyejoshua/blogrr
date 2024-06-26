import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { Space } from "@/components/Space"
import { usePost } from "@/hooks/usePost";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MyPosts = ({data}) => {
    const { state, like, searching, searchItems, getPosts } = usePost();
    const userState = useSelector(state => state.state.user);

    useEffect(() => {
        getPosts();
    }, [])

    if (state.loading){
        return <Loader/>
    }

    const filter = state.items.filter(item => item.user_id == data._id);

    if (filter.length === 0){
        return <div>
            <h1>No Post</h1>
            <Link to={"/publish"} text={"Create your first post"}/>
        </div>
    }

    return <div className="my-post">
        <h1>POSTS</h1>
        <Space val={"1rem"}/>
        
        <Post data={searching ? searchItems : filter} like={like} is_comment={false}/>

    </div>
}