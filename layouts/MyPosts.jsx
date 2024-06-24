import { Post } from "@/components/Post";
import { Space } from "@/components/Space"
import { usePost } from "@/hooks/usePost";
import { useSelector } from "react-redux";

export const MyPosts = ({data}) => {
    const { state, like, searching, searchItems } = usePost();
    const userState = useSelector(state => state.state.user);
    const filter = state.items.filter(item => item.user_id == userState._id);

    return <div className="my-post">
        <h1>POSTS</h1>
        <Space val={"1rem"}/>
        <Post data={searching ? searchItems : filter} like={like} />

    </div>
}