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
import { useURL } from "@/hooks/useURL";
import { formatNumber } from "@/utils/helpers";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSend, AiOutlineShareAlt } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiChat1, CiShare1 } from "react-icons/ci";
import { useSelector } from "react-redux";
// import { domToReact } from "html-react-parser";

export default function Page() {
  const { id } = useParams();
  const {
    loading,
    post,
    getPost,
    like,
    notFound,
    commentState,
    setCommentState,
    commentOnPost,
  } = usePost();
  const item = post;
  const userState = useSelector((state) => state.state.user);
  const { is_comment } = useURL();

  useEffect(() => {
    if (is_comment != undefined) {
      getPost(id, is_comment);
    }
  }, [id, is_comment]);

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
                <small>
                  Posted <RelativeTimeBar timestamp={item?.timestamp} /> ago
                </small>
                <Space val={".3rem"} />

                <p className="dim" dangerouslySetInnerHTML={{ __html: item?.content }}></p>

                <Space val={"1rem"} />
                <div className="flex row">
                  <div className="actions fit flex row space-betwee items-center">
                    {item?.likes?.includes(userState._id) ? (
                      <button
                        className="btn items-center b-none c-red fa fa-heart red"
                        onClick={(e) => like(e, item?._id)}
                      >
                        <Space val={".3rem"} />
                        <p className="">{formatNumber(item?.likes?.length)}</p>
                        <p className="not-visible">{item?.likes?.length}</p>
                      </button>
                    ) : (
                      <button
                        className="btn items-center b-none c-red far fa-heart red"
                        onClick={(e) => like(e, item?._id)}
                      >
                        <Space val={".3rem"} />
                        <p className="">{formatNumber(item?.likes?.length)}</p>
                        <p className="not-visible">{item?.likes?.length}</p>
                      </button>
                    )}
                    <Space val={"1rem"} />

                    <button className="btn flex items-center c-white b-none">
                      <CiChat1 className="icon" />
                      <Space val={".3rem"} />
                      <p>{item?.comments?.length}</p>
                    </button>
                    <Space val={"1rem"} />

                    <button className="btn flex items-center c-white b-none">
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
                <Space val={"1rem"} />
                <h3>Comments</h3>
                <Space val={"1rem"} />
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
                {/* <CommentBar data={item?.comments} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
