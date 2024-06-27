import { shortenText } from "@/utils/helpers"
import { Avater } from "./Avater"
import { FollowBtn } from "./FollowBtn"
import { Space } from "./Space"
import { useProfile } from "@/hooks/useProfile"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

export const MiniUserBar = ({ data }) => {
    const { followAction } = useProfile();
    const loggedUser = useSelector(state => state.state.user);

    const router = useRouter();

    return data?.map((item, i) => {
        return <div key={i} className="mini-user-bar flex row space-between">
            <div className="flex row">
                <Avater data={{ username: item?.username, img: item?.img }} size={"3rem"} />
                <Space val={".3rem"} />
                <div className="flex col">
                    <h3 className="pointer" onClick={() => router.push(`/@${item?.username}`)}>@{shortenText(item?.username, 9)}</h3>
                    <small className="dim">{shortenText(item?.email, 16)}</small>
                </div>
            </div>
            {
                item._id != loggedUser._id ?
                    <FollowBtn followers={item?.followers} user_id={loggedUser?._id} follow={followAction} following_id={item?._id} />
                    :
                    <small>You</small>
            }
        </div>
    })
}   