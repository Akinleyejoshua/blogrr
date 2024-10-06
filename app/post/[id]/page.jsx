"use client";

import { Avater } from "@/components/Avater";
import { DropdownMenu } from "@/components/DropdownMenu";
import { Header } from "@/components/Header";
import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { RelativeTimeBar } from "@/components/RelativeTimeBar";
import { SideBar } from "@/components/SideBar";
import { Space } from "@/components/Space";
import { Toast } from "@/components/Toast";
import { usePost } from "@/hooks/usePost";
import { useTime } from "@/hooks/useTime";
import { useURL } from "@/hooks/useURL";
import { atlify, formatNumber, urlify } from "@/utils/helpers";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineHeart, AiOutlineSend, AiOutlineShareAlt } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiChat1, CiShare1 } from "react-icons/ci";
import { useSelector } from "react-redux";
// import { domToReact } from "html-react-parser";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const {
    loading,
    post,
    getPost,
    like,
    notFound,
    commentState,
    setCommentState,
    commentOnPost,
    sharePost,
    deletePost,
  } = usePost();
  const item = post;
  const userState = useSelector((state) => state.state.user);
  const { is_comment } = useURL();
  const {relativeTime} = useTime();
  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (is_comment != undefined) {
      getPost(id, is_comment, userState._id);
    }
  }, [id, is_comment]);

  useEffect(() => {
    if (item){
      setLiked(item?.likes?.includes(userState._id));
      setLikes(item?.likes?.length)
    }
  }, [loading])

  return (
    <main className="home">
      <div className="flex row fit">
        <SideBar />
        <div className="flex col fit">
          <Header title={"Post"} />
          <div className="main scroll-y">
            {loading ? (
              userState.loading ? (
                <Loader />
              ) : (
                <Loader />
              )
            ) : notFound ? (
              <>
                <h1>404 Not Found</h1>
                <Space val={".3rem"} />
                <Link to={"/home"} text={"Home"} />
                <Link to={"/publish"} text={"Publish Your Own Post"} />
                <Space val={".3rem"} />

                <a href={location.href} className="c-blue">
                  Refresh
                </a>
              </>
            ) : (
              <div className="post">
                <Avater
                  data={{ username: item?.username, img: item?.img }}
                  size={"6rem"}
                  fontSize={"3rem"}
                />
                <Space val={".3rem"} />

                {item?.title !== "" ? <h1>{item?.title}</h1> : <h1>Comment</h1>}
                <Space val={".3rem"} />
                <small className="dim">
                  Posted {relativeTime(item?.timestamp)} ago
                </small>
                <Space val={".3rem"} />

                <div className="w-full post-content" dangerouslySetInnerHTML={{ __html: atlify(urlify(item?.content)) }}></div>

                <Space val={"1rem"} />
                <div className="flex row">
                  <div className="actions fit flex row space-betwee items-center">
                  {
                  liked ? <button
                    className="icon btn items-center b-none c-red"
                    onClick={(e) => {
                      like(item?._id, "un-like")
                      setLikes(likes - 1)
                      setLiked(false)
                    }
                    }
                  >
                    <AiFillHeart className="icon" />
                    <Space val={".3rem"} />
                    <p className="num">{formatNumber(likes)}</p>
                  </button> :
                    <button
                      className="icon btn items-center b-none c-red"
                      onClick={(e) => {
                        like(item?._id, "like")
                        setLikes(likes + 1)
                        setLiked(true)

                      }
                      }
                    >
                      <AiOutlineHeart className="icon" />
                      <Space val={".3rem"} />
                      <p className="num">{formatNumber(likes)}</p>
                    </button>
                }

                    <Space val={"1rem"} />

                    <button className="btn flex items-center c-white b-none">
                      <CiChat1 className="icon" />
                      <Space val={".3rem"} />
                      <p>{item?.comments?.length}</p>
                    </button>
                    <Space val={"1rem"} />
                    <button
                      className="btn flex items-center c-white b-none"
                    >
                      <AiOutlineEye className="icon"/>
                      <Space val={".3rem"} />
                      {item?.views?.length}
                    </button>
                    <Space val={"1rem"} />

                    <button
                      onClick={() => sharePost(`${location.protocol}//${location.host}/post/${item?._id}?is_comment=${is_comment}`)}
                      className="btn flex items-center c-white b-none">
                      <CiShare1 className="icon" />
                    </button>
                    <Space val={"1rem"} />

                    <DropdownMenu
                      icon={
                        <BiDotsVerticalRounded className="icon" />
                      }

                      menu={[
                        {
                          icon: <AiOutlineDelete className="icon" />,
                          text: "Delete",
                          color: "var(--red)",
                          open: item.user_id == userState._id,
                          onClick: () => deletePost(item?._id)
                        },
                        {
                          icon: <AiOutlineEdit className="icon" />,
                          text: "Edit",
                          color: "var(--white)",
                          open: item.user_id == userState._id,
                          onClick: () => router.push(`/publish/${item?._id}?is_comment=${is_comment}`)
                        },
                        {
                          icon: <AiOutlineShareAlt className="icon" />,
                          text: "Share",
                          color: "var(--blue)",
                          open: true,
                          onClick: () => sharePost(`${location.protocol}//${location.host}/post/${item?._id}?is_comment=${is_comment}`),
                        },
                      ]}
                    />
                  </div>
                </div>
                <Space val={"1rem"} />
                <h3>Comments</h3>
                <Space val={".3rem"} />
                {item?.comments?.length === 0 ? (
                  <>
                    <h1>No comments</h1>
                    <small className="dim">
                      Be the first to share your thoughts!
                    </small>
                  </>
                ) : (
                  <Post data={item?.comments} like={like} is_comment={true} />
                )}
                <Space val={"1rem"} />

                <div className="input-bar items-center">
                  <CiChat1 className="icon" />
                  <Space val={".3rem"} />
                  <input
                    type="text"
                    placeholder="Comment"
                    onChange={(e) =>
                      setCommentState({
                        ...commentState,
                        content: e.target.value,
                      })
                    }
                  />
                  {commentState.content != "" && (
                    <button className="b-none flex items-center">
                      {commentState.loading ? (
                        <Loader />
                      ) : (
                        <AiOutlineSend
                          className="icon"
                          onClick={() => commentOnPost(item?._id, is_comment)}
                        />
                      )}
                    </button>
                  )}
                </div>
                <Space val={".3rem"} />
                <Toast text={commentState.msg} type={commentState.msgType} />
                <Space val={".3rem"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main >
  );
}
