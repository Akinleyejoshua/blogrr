"use client"

import { CommentBar } from "@/components/CommentBar";
import { Header } from "@/components/Header"
import { Loader } from "@/components/Loader";
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space";
import { usePost } from "@/hooks/usePost";
import { formatNumber } from "@/utils/helpers";
import { useParams } from "next/navigation"
import { useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CiChat1, CiShare1 } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function Page() {
    const { id } = useParams();
    const { loading, post, getPost, like } = usePost()
    const item = post;
    const userState = useSelector(state => state.state.user);

    useEffect(() => {
        getPost(id)
    }, [])

    return <main className="home">
        <div className="flex row fit">
            <SideBar />
            <div className="flex col fit">
                <Header title={"Post"} />
                <div className="main scroll-y">
                    {loading ? <Loader /> : <div className="post">
                        <h1>{item?.title}</h1>
                        <Space val={".3rem"} />
                        <small>Posted {item?.timestamp} ago</small>
                        <Space val={".3rem"} />
                        
                        <p className="dim flex wrap">{item?.content}</p>

                        <Space val={"1rem"} />
                        <div className="flex row">
                            <div className="actions fit flex row space-betwee">

                                {item?.likes?.includes(userState._id) ?

                                    <button className="btn items-center b-none c-red fa fa-heart red" onClick={e => like(e)}>
                                        <Space val={".3rem"} />
                                        <p className="">{formatNumber(item?.likes?.length)}</p>
                                        <p className="not-visible">{item?.likes?.length}</p>
                                    </button> : <button className="btn items-center b-none c-red far fa-heart red" onClick={e => like(e)}>
                                        <Space val={".3rem"} />
                                        <p className="">{formatNumber(item?.likes?.length)}</p>
                                        <p className="not-visible">{item?.likes?.length}</p>
                                    </button>
                                }
                                <button className="btn flex items-center c-white b-none">
                                    <CiChat1 className="icon" />
                                    <Space val={".3rem"} />
                                    <p>{item?.comments?.length}</p>
                                </button>

                                <button className="btn flex items-center c-white b-none">
                                    <CiShare1 className="icon" />
                                </button>
                            </div>
                        </div>
                        <Space val={"1rem"} />

                        <div className="input-bar items-center">
                            <CiChat1 className="icon" />
                            <Space val={".3rem"} />
                            <input type="text" placeholder="Comment" onChange={e => { }} />
                            <button className="b-none flex items-center">
                                <AiOutlineSend className="icon" />
                            </button>
                        </div>
                        <Space val={"1rem"} />
                        <h3>Comments</h3>
                        <Space val={"1rem"} />
                        <CommentBar data={item?.comments}/>
                    </div>}
                </div>
            </div>
        </div>
    </main>
}