"use client"

import { Button } from "@/components/Button"
import { Draft } from "@/components/Draft"
import { Header } from "@/components/Header"
import { Loader } from "@/components/Loader"
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space"
import { Toast } from "@/components/Toast"
import { usePublish } from "@/hooks/usePublish"
import { AiOutlineSave } from "react-icons/ai"
import { useSelector } from "react-redux"

export default function Page() {
    const { state, handleState, publish } = usePublish();
    const userState = useSelector(state => state.state.user);

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
                            publish();
                        }}>
                            <small>Your title/Heading</small>
                            <Space val={".3rem"} />
                            <div className="input-bar">
                                <input type="text" placeholder="Title" onChange={e => handleState("title", e.target.value)} />
                            </div>
                            <Space val={".3rem"} />

                            <small>Your content/post</small>
                            <Space val={".3rem"} />
                            <Draft onChange={(e) => handleState("content", e.target.value)} />

                            <Space val={".4rem"} />
                            <Toast text={state.msg} type={state.msgType} />
                            <Space val={".6rem"} />

                            {state.title !== "" && state.content !== "" && 
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