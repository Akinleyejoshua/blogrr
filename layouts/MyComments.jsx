import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { Space } from "@/components/Space"
import { usePost } from "@/hooks/usePost";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MyComments = ({ data }) => {
    const { state, like, searching, searchItems, getPosts, getComments } = usePost();
    const loggedUser = useSelector(state => state.state.user);

    useEffect(() => {
        getComments();
    }, [])

    if (state.loading) {
        return <Loader />
    }

    const filter = state.comments.filter(item => (item.user_id == data._id && item.is_comment == true));

    if (filter?.length === 0) {
        return <div>
            <h1>No Comments & Replies</h1>
            {loggedUser._id == data._id ?
                <Link to={"/home"} text={"Open a post and comment"} />
                :
                <p>{data?.username} has no comments & replies</p>
            }
        </div>
    }

    return <div className="my-post">
        <h1>{filter?.length} POST{filter?.length > 1 ? "Comments & Replies": "Comment & Reply"}</h1>

        <Space val={"1rem"} />

        <Post data={searching ? searchItems : filter} like={like} is_comment={true} />

    </div>
}