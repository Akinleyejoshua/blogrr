import { BiDotsHorizontalRounded } from "react-icons/bi"
import { Avater } from "./Avater"
import { Space } from "./Space"
import { useSelector } from "react-redux"
import { formatNumber, shortenText } from "@/utils/helpers"
import { CiChat1, CiShare1 } from "react-icons/ci";
import { useRouter } from "next/navigation"

export const Post = ({ data, like }) => {
    const userState = useSelector(state => state.state.user);
    const router = useRouter();


    if (data.length === 0) {
        return <h1>Post Not Available</h1>
    }

    return <div className="flex rev-col">
        {data?.map((item, i) => {
            return <div className="post-item flex w-full h-max row" key={i}>
                <div className="flex col items-center">
                    <button className="b-none c-white" onClick={() => router.push(`/@${item?.username}`)}>
                        <Avater data={{ username: item?.username }} size={"3rem"} />

                    </button>
                    <Space val={".3rem"} />
                    <div className="vline"></div>
                </div>
                <Space val={".6rem"} />

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
                    <div className="flex col content pointer btn" onClick={() => router.push(`/post/${item?._id}`)}>
                        <h3 className="title w-full">{item?.title}</h3>
                        <p className="title dim tiny">{shortenText(item?.content, 333)}</p>
                        {/* <p className="title dim tiny">{item?.content}</p> */}
                    </div>
                    <Space val={".3rem"} />
                    <div className="actions fit flex row space-betwee">

                        {item?.likes?.includes(userState._id) ?

                            <button className="btn items-center b-none c-red fa fa-heart red" onClick={e => like(e)}>
                                <Space val={".3rem"} />
                                <p className="">{formatNumber(item?.likes.length)}</p>
                                <p className="not-visible">{item?.likes.length}</p>
                            </button> : <button className="btn items-center b-none c-red far fa-heart red" onClick={e => like(e)}>
                                <Space val={".3rem"} />
                                <p className="">{formatNumber(item?.likes.length)}</p>
                                <p className="not-visible">{item?.likes.length}</p>
                            </button>
                        }
                        <button onClick={() => router.push(`/post/${item?._id}`)} className="btn flex items-center c-white b-none">
                            <CiChat1 className="icon" />
                            <Space val={".3rem"} />
                            <p>{item?.comments.length}</p>
                        </button>

                        <button className="btn flex items-center c-white b-none">
                            <CiShare1 className="icon" />
                        </button>
                    </div>

                </div>
            </div>
        })
        }
    </div>



}