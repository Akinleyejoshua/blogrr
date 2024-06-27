import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { Space } from "@/components/Space"
import { usePost } from "@/hooks/usePost";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MyPosts = ({ data }) => {
    const { state, like, searching, searchItems, getPosts } = usePost();
    const loggedUser = useSelector(state => state.state.user);

    useEffect(() => {
        getPosts();
    }, [])

    if (state.loading) {
        return <Loader />
    }

    const filter = state.items.filter(item => item.user_id == data._id);

    if (filter?.length === 0) {
        return <div>
            <h1>No Post</h1>
            {
                loggedUser._id == data._id ?
                    <Link to={"/publish"} text={"Create your first post"} />
                    :
                    <p>{data?.username} has not posted</p>
            }
        </div>
    }

    return <div className="my-post">
        <h1>{filter?.length} POST{filter?.length > 1 && "S"}</h1>
        <Space val={"1rem"} />

        <Post data={searching ? searchItems : filter} like={like} is_comment={false} />

    </div>
}