"use client"

import { Button } from "@/components/Button"
import { Draft } from "@/components/Draft"
import { Header } from "@/components/Header"
import { Loader } from "@/components/Loader"
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space"
import { Toast } from "@/components/Toast"
import { usePublish } from "@/hooks/usePublish"
import { useURL } from "@/hooks/useURL"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { AiOutlineSave } from "react-icons/ai"
import { useSelector } from "react-redux"

export default function Page() {
    const { id } = useParams();
    const { is_comment } = useURL();

    const { state, handleState, updatePublished, getPost } = usePublish();
    const userState = useSelector(state => state.state.user);

    useEffect(() => {
        if (is_comment != undefined) {
            getPost(id, is_comment);
        }
    }, [id, is_comment])

    return <main className="home">
        <div className="flex row fit">
            <SideBar />
            <div className="flex col fit">
                <Header title={"Publisher"} />
                <div className="main scroll-y">
                    {userState.loading ?
                        <Loader /> :
                        <form onSubmit={e => {
                            e.preventDefault();
                            updatePublished(id, is_comment);
                        }}>
                            <small>Your title/Heading</small>
                            <Space val={".3rem"} />
                            <div className="input-bar">
                                <input defaultValue={state.title} type="text" placeholder="Title" onChange={e => handleState("title", e.target.value)} />
                            </div>
                            <Space val={".3rem"} />

                            <small>Your content/post</small>
                            <Space val={".3rem"} />
                            <Draft val={state.content} onChange={(val) => handleState("content", val)} />

                            <Space val={".4rem"} />
                            <Toast text={state.msg} type={state.msgType} />
                            <Space val={".6rem"} />
                            {state.content !== "" &&
                                <Button
                                    icon={<AiOutlineSave className="icon" />}
                                    text={"Publsih"}
                                    loading={state.loading}
                                    onClick={() => { }}
                                />
                            }
                        </form>

                    }


                </div>
            </div>
        </div>
    </main>
}
