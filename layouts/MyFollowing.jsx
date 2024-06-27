import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { MiniUserBar } from "@/components/MiniUserBar";
import { Space } from "@/components/Space"
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MyFollowing = ({ data }) => {
    const { followingFollowers, getFollowingFollowers, userLoading } = useUser();
    const loggedUser = useSelector(state => state.state.user);

    useEffect(() => {
        getFollowingFollowers(data?._id);
    }, [])

    if (userLoading) {
        return <Loader />
    }

    const filter = followingFollowers?.following;

    if (filter?.length === 0) {
        return <div>
            <h1>No Following</h1>
            {loggedUser._id == data._id
                ?
                <Link to={"/home"} text={"View user posts you will like to follow"} />
                :
                <p>{data?.username} has no follower</p>
            }
        </div>
    }

    return <div className="my-post">
        <h1>{filter?.length} Following</h1>
        <Space val={"1rem"} />
        <MiniUserBar data={filter} />
    </div>
}