import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { MiniUserBar } from "@/components/MiniUserBar";
import { Space } from "@/components/Space"
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MyFollowers = ({ data }) => {
    const { followingFollowers, getFollowingFollowers, userLoading } = useUser();
    const loggedUser = useSelector(state => state.state.user);

    useEffect(() => {
        getFollowingFollowers(data?._id);
    }, [])

    if (userLoading) {
        return <Loader />
    }

    const filter = followingFollowers?.followers;

    if (filter?.length === 0) {
        return <div>
            <h1>No Followers</h1>
            {loggedUser._id == data._id
                ?
                <Link to={"/publish"} text={"Create your first post to attract followers"} />
                :
                <p>{data.username} has no followers</p>
            }
        </div>
    }

    return <div className="my-post">
        <h1>{filter?.length} Follower{filter?.length > 1 && "s"}</h1>
        <Space val={"1rem"} />
        <MiniUserBar data={filter} />
    </div>
}