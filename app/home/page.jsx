"use client"

import { Header } from "@/components/Header"
import { Post } from "@/components/Post";
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space";
import { usePost } from "@/hooks/usePost"
import { AiOutlineSearch } from "react-icons/ai";

export default function Page() {
    const { state } = usePost();

    return <main className="home">
        <div className="flex row fit">
            <SideBar />
            <div className="flex col fit">
                <Header title={"Home"} />
                <div className="search">
                    <div className="input-bar">
                        <AiOutlineSearch className="icon" />
                        <Space val={".3rem"} />
                        <input type="text" placeholder="Search Post" onChange={e => { }} />
                    </div>
                </div>
                <div className="main scroll-y">
                    <Post data={state.items} />
                </div>
            </div>
        </div>
    </main>
}