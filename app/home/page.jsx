"use client";

import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { SideBar } from "@/components/SideBar";
import { Space } from "@/components/Space";
import { usePost } from "@/hooks/usePost";
import { get } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Page() {
  const {
    state,
    like,
    searching,
    handleSearch,
    searchItems,
    loading,
    getPosts,
  } = usePost();

  const router = useRouter();

  const userState = useSelector((state) => state.state.user);

  useEffect(() => {
   
    getPosts();

  }, []);

  const userId = get("login-id");

  if (userId == "null") {
    return (
      <main className="home">
        <div className="flex row fit">
          <SideBar />
          <div className="flex col fit">
            <Header title={"Home"} />
            <div className="top-nav flex space-between items-center">
              <div className="input-bar">
                <AiOutlineSearch className="icon" />
                <Space val={".3rem"} />
                <input
                  type="text"
                  placeholder="Search Post"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
            </div>
            <div className="main scroll-y">
              {(!loading) ? <Post
                data={searching ? searchItems : state.items}
                like={like}
                is_comment={false}
              /> : <Loader />}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="flex row fit">
        <SideBar />
        <div className="flex col fit">
          <Header title={"Home"} />
          <div className="top-nav flex space-between items-center">
            <div className="input-bar">
              <AiOutlineSearch className="icon" />
              <Space val={".3rem"} />
              <input
                type="text"
                placeholder="Search Post"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Space val={".3rem"} />

            <button
              className="flex items-center b-none c-white btn"
              onClick={() => router.push("/publish")}
            >
              <AiOutlineEdit className="icon" />
              <Space val={".13rem"} />
              <p>Creator</p>
            </button>
          </div>
          <div className="main scroll-y">
            {(!loading) ? !userState.loading && <Post
              data={searching ? searchItems : state.items}
              like={like}
              is_comment={false}
            /> : <Loader />}
          </div>
        </div>
      </div>
    </main>
  );
}
