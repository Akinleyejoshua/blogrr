"use client"

import { Header } from "@/components/Header"
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space";
import { usePost } from "@/hooks/usePost"
import { AiOutlineBook, AiOutlineSearch } from "react-icons/ai";

export default function Page() {
    const { state, like, searching, handleSearch, searchItems, loading } = usePost();

    return <main className="home">
        <div className="flex row fit">
            <SideBar />
            <div className="flex col fit">
                <Header title={"Home"} />
                <div className="top-nav flex space-between items-center">
                    <div className="input-bar">
                        <AiOutlineSearch className="icon" />
                        <Space val={".3rem"} />
                        <input type="text" placeholder="Search Post" onChange={e => handleSearch(e.target.value)} />
                    </div>

                    <button className="flex items-center b-none c-white">
                        <AiOutlineBook className="icon" />
                        <Space val={".3rem"} />
                        <p>Publish</p>
                    </button>
                </div>
                <div className="main scroll-y">
                    {loading ? <Loader /> :
                        <Post data={searching ? searchItems : state.items} like={like} />
                    }
                </div>
            </div>
        </div>
    </main>
}