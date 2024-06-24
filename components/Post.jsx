import { BiDotsHorizontalRounded } from "react-icons/bi"
import { Avater } from "./Avater"
import { Space } from "./Space"
import { useSelector } from "react-redux"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useState } from "react"

export const Post = ({ data }) => {
    const userState = useSelector(state => state.state.user);

    return data?.map((item, i) => {
        return <div className="post-item flex w-full h-max row">
            <div className="flex col items-center">
                <Avater data={{ username: item?.username }} size={"3rem"} />
                <Space val={".3rem"} />
                <div className="hline"></div>
            </div>
            <Space val={".6rem"} />

            <div className="flex fit col">
                <div className="flex w-full row space-between">
                    <div className="flex fit row pointer items-center">
                        <h3 className="tiny dim">@{item?.username}</h3>
                        <Space val={".3rem"} />
                        <p className="dim tiny">{item?.timestamp}</p>
                    </div>

                    <button className="btn flex items-center option b-none c-white">
                        <BiDotsHorizontalRounded className="icon" />
                    </button>
                </div>
                <Space val={".0rem"} />
                <div className="flex col content pointer">
                    <h3 className="title w-full di">{item?.title}</h3>
                    <p className="title dim tiny">{item?.content}</p>
                </div>
                <Space val={".3rem"} />
                <div className="actions fit flex row space-between">
                    {item.likes?.includes(userState._id) ?
                        <button className="btn flex items-center b-none c-red">
                            <AiFillHeart className="icon" />
                            <Space val={".3rem"}/>
                            <p>{item?.likes.length}</p>
                        </button>
                        :
                        <button className="btn flex items-center b-none c-red">
                            <AiOutlineHeart className="icon" />
                            <Space val={".3rem"}/>
                            <p>{item?.likes.length}</p>
                        </button>
                    }

                </div>

            </div>
        </div>
    })


}