import { Avater } from "./Avater"
import { Space } from "./Space";

export const ProfileBanner = ({ data }) => {
    const {username, email, followers, following, bio} = data;
    return <div className="banner flex row">
        <Avater data={{ username: data?.username }} size={"12rem"} fontSize={"6rem"} />
        <Space val={"3rem"} />

        <div className="flex col center">
            <h3 className="medium">{username}</h3>
            <small className="dim small">{email}</small>
            <Space val={".3rem"} />

            <div className="flex row fit">
                <div className="flex row small">
                    <div className="flex row">{followers}</div>
                    <Space val={".1rem"} />
                    <p className="dim">follower{followers > 1 && "s"}</p>
                </div>
                <Space val={".3rem"} />
                <div className="flex row small">
                    <div className="flex row">{following}</div>
                    <Space val={".1rem"} />
                    <p className="dim">following</p>
                </div>
            </div>
            <Space val={".3rem"} />

<small className="bio tiny">{bio}</small>
        </div>
    </div>
}