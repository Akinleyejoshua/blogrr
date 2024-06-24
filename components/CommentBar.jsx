import { useRouter } from "next/navigation"
import { Avater } from "./Avater"
import { Space } from "./Space"
import { BiDotsHorizontalRounded } from "react-icons/bi";

export const CommentBar = ({ data }) => {

    const router = useRouter();

    if (data?.length === 0) {
        return <h1>No Comment</h1>
    }

    return <div className="comment-bar flex rev-col fit">
        {data?.map((item, i) => {
            return <div className="flex row fit comment-item" key={i}>
                <div className="flex col items-center">
                    <button className="c-white b-none items-center">
                        <Avater data={{ username: item?.username }} size={"3rem"} />

                    </button>
                    <Space val={".3rem"} />
                    <div className="vline"></div>
                </div>
                <Space val={".3rem"} />

                <div className="flex fit col">
                    <div className="flex w-full row space-between">
                        <div className="flex fit row pointer items-center">
                            <h3 className="tiny dim" onClick={() => router.push(`/@${item?.username}`)}>@{item?.username}</h3>
                            <Space val={".3rem"} />
                            ·
                            <Space val={".3rem"} />
                            <p className="dim tiny">{item?.timestamp}</p>
                        </div>

                        <button className="btn flex items-center option b-none c-white">
                            <BiDotsHorizontalRounded className="icon" />
                        </button>
                    </div>
                    <Space val={".0rem"} />
                    <div className="flex col content pointer btn">
                        <p className="title tiny">{item?.content}</p>
                        {/* <p className="title dim tiny">{item?.content}</p> */}
                    </div>
                </div>
            </div>
        })}


    </div>
}