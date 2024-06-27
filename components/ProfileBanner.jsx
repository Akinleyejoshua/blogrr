import { FaWhatsapp } from "react-icons/fa6";
import { Avater } from "./Avater"
import { FollowBtn } from "./FollowBtn";
import { LinkIcon } from "./LinkIcon";
import { Space } from "./Space";

export const ProfileBanner = ({ data, user, follow }) => {
    const { username, email, followers, following, img, bio, _id, whatsapp } = data;
    return <div className="banner flex row space-between">
        <Avater data={{ username, img }} size={"12rem"} fontSize={"6rem"} />
        <Space val={"1.3rem"} />

        <div className="flex col center fit">
            <h3 className="medium username">{username}</h3>
            <small className="dim small email">{email}</small>
            <Space val={".3rem"} />

            {user?.username !== username

                &&
                <>
                    <FollowBtn followers={followers} following_id={_id} user_id={user?._id} follow={follow} />
                    <Space val={".3rem"} />

                </>
            }


            <div className="flex row fit">
                <div className="flex row small">
                    <div className="flex row">{followers.length}</div>
                    <Space val={".1rem"} />
                    <p className="dim">follower{followers.length > 1 && "s"}</p>
                </div>
                <Space val={".3rem"} />
                <div className="flex row small">
                    <div className="flex row">{following.length}</div>
                    <Space val={".1rem"} />
                    <p className="dim">following</p>
                </div>
            </div>
            <Space val={".3rem"} />
            {whatsapp != undefined &&
                <LinkIcon icon={<FaWhatsapp className="c-green" fontSize={30}/>} to={`https://wa.me/${whatsapp}`} />
            }
            <Space val={".3rem"} />
            {
                bio != undefined &&
                <small className="bio tiny">{bio}</small>
            }
        </div>
    </div>
}