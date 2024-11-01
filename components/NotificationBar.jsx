import { AiFillHeart, AiOutlineComment, AiOutlineEye, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { Space } from "./Space";
import { useRouter } from "next/navigation";
import { Avater } from "./Avater";
import { atlify, shortenNotification, urlify } from "@/utils/helpers";
import { useTime } from "@/hooks/useTime";

export const NotificationBar = ({ data }) => {
    // if (data == undefined) {
    //     return <small>No Notifications</small>;
    // }
    // console.log(data);
    const router = useRouter();
    const {relativeTime} = useTime();

    return data?.map((item, i) => {
        return <div onClick={() => {
            item?.path && router.push(item?.path);
        }} className="notification-bar w-full h-max b-none flex row space-between" key={i}>

            <div className="flex row items-cente">
                <div className="flex items-cente col">
                    {item?.type == "like" && <AiFillHeart className="icon c-red" />}
                    {item?.type == "follow" && <AiOutlineUserAdd className="icon c-blue" />}
                    {item?.type == "comment" && <AiOutlineComment className="icon c-white" />}
                    {item?.type == "signin" && <AiOutlineLogin className="icon c-white" />}
                    {item?.type == "profile" && <AiOutlineEye className="icon c-white" />}
                    <Space val={".3rem"} />
                    {/* <div className="vline center"></div> */}
                </div>
                <Space val={".3rem"} />

                <div className="flex col">
                    <Avater size={"2rem"} data={{ username: item.user?.username, img: item.user?.img }} />
                    <Space val={".3rem"} />
                    <p className="tiny dim">{item?.msg}</p>
                    <Space val={".0rem"} />
                    {item?.post?.content &&
                        <>
                            <small
                                dangerouslySetInnerHTML={{
                                    __html: atlify(urlify(shortenNotification(item?.post?.content, 333))),
                                }}
                            ></small>
                            <small className="tiny dim">...see more</small>
                        </>
                    }

                </div>

            </div>
            <Space val={".3rem"} />

            <div className="flex row dim micro">
                {relativeTime(item?.timestamp)}
            </div>
        </div>
    })


}
