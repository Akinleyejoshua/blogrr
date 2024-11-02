import { BiDotsVerticalRounded } from "react-icons/bi";
import { Avater } from "./Avater";
import { Space } from "./Space";
import { useSelector } from "react-redux";
import { atlify, formatNumber, shortenText, urlify } from "@/utils/helpers";
import { CiChat1, CiShare1 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Link } from "./Link";
import { DropdownMenu } from "./DropdownMenu";
import {
  AiFillHeart,
  AiOutlineBarChart,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { usePost } from "@/hooks/usePost";
import { useTime } from "@/hooks/useTime";
import { memo, useEffect, useState } from "react";
import { get } from "@/utils/localstorage";

export const Post = memo(({ data, like, is_comment }) => {
  const userState = useSelector((state) => state.state.user);
  const router = useRouter();
  const { deletePost, sharePost } = usePost();
  const { relativeTime } = useTime();

  const userId = get("login-id");

  const [liked, setLiked] = useState([]);
  const [likes, setLikes] = useState([])

  useEffect(() => {
    setLiked(data.map(item => ({ id: item?._id, val: item?.likes.includes(userState._id) })))
    setLikes(data.map(item => ({ id: item?._id, val: item?.likes.length })))
  }, [data])

  const setLikeLikes = (id, likedVal, likesVal) => {
    setLiked(liked.map(like => like.id == id ? {
      ...like,
      val: likedVal,
    } : like))

    setLikes(likes.map(like => like.id == id ? {
      ...like,
      val: likesVal == +1 ? like.val + 1 : like.val - 1
    } : like))
  }

  if (data?.length === 0) {
    return (
      <>
        <h1>Post Not Available</h1>
        <Link
          to={"/publish"}
          text={"Be the first to publish something unique on Blogrr"}
        />
      </>
    );
  }



  return (
    <div className="flex rev-col">
      {data?.map((item, i) => {
        return (
          <div className="post-item flex w-full h-max row" key={i}>
            <div className="flex col items-center">
              <Avater
                data={{ username: item?.username, img: item?.img }}
                size={"3rem"}
              />
              <Space val={".3rem"} />
              {/* <div className="vline"></div> */}
            </div>
            <Space val={".3rem"} />

            <div className="flex fit col">
              <div className="flex w-full row space-between">
                <div className="flex fit row pointer items-center">
                  <p
                    className="tiny c-blu dim1 nospace"
                    onClick={() => router.push(`/@${item?.username}`)}
                  >
                    @{item?.username}
                  </p>
                  <Space val={".3rem"} />
                  ·
                  <Space val={".3rem"} />
                  <p className="dim1 micro">
                    {relativeTime(item?.timestamp)}
                  </p>
                </div>

                <DropdownMenu
                  icon={<BiDotsVerticalRounded className="icon" />}
                  menu={[
                    {
                      icon: <AiOutlineDelete className="icon" />,
                      text: "Delete",
                      color: "var(--red)",
                      open: item.user_id == userState._id,
                      onClick: () => {
                        const del = confirm("Do you want to delete this?");
                        if (del) {
                          deletePost(item?._id)
                        }
                      },
                    },
                    {
                      icon: <AiOutlineEdit className="icon" />,
                      text: "Edit",
                      color: "var(--white)",
                      open: item.user_id == userState._id,
                      onClick: () =>
                        router.push(
                          `/publish/${item?._id}?is_comment=${is_comment}`
                        ),
                    },
                    {
                      icon: <AiOutlineShareAlt className="icon" />,
                      text: "Share",
                      color: "var(--blue)",
                      open: true,
                      onClick: () =>
                        sharePost(
                          `${location.protocol}//${location.host}/post/${item?._id}?is_comment=${is_comment}`
                        ),
                    },
                  ]}
                />
              </div>
              <Space val={".0rem"} />
              <div
                className="flex col content pointer btn"
                onClick={() =>
                  router.push(`/post/${item?._id}?is_comment=${is_comment}`)
                }
              >
                {item?.title !== "" && (
                  <h3 className="title w-full">{item?.title}</h3>
                )}
                <div
                  className={`tiny w-full ${!is_comment && "dim"}`}
                  dangerouslySetInnerHTML={{
                    __html: atlify(urlify(shortenText(item?.content, 333))),
                  }}
                ></div>
                <small className="dim1 c-blue tiny">...see more</small>
              </div>
              <Space val={".3rem"} />
              <div className="actions fit flex row space-between">

                {
                  liked[i]?.val ? <button
                    className="icon btn items-center b-none c-red"
                    onClick={(e) => {
                      like(item?._id, "un-like")
                      setLikeLikes(item?._id, false, -1)
                    }
                    }
                  >
                    <AiFillHeart className="icon" />
                    <Space val={".3rem"} />
                    <p className="num">{formatNumber(likes[i]?.val)}</p>
                  </button> :
                    <button
                      className="icon btn items-center b-none c-red"
                      onClick={(e) => {
                        if (userId == "null") {
                          router.push("/")
                        } else {
                          like(item?._id, "like")
                          setLikeLikes(item?._id, true, +1)
                        }

                      }
                      }
                    >
                      <AiOutlineHeart className="icon" />
                      <Space val={".3rem"} />
                      <p className="num">{formatNumber(likes[i]?.val)}</p>
                    </button>
                }

                <button
                  onClick={() =>
                    router.push(`/post/${item?._id}?is_comment=${is_comment}`)
                  }
                  className="btn flex items-center c-white b-none"
                >
                  <CiChat1 className="icon" />
                  <Space val={".3rem"} />
                  <p>{formatNumber(item?.comments.length)}</p>
                </button>
                <button
                  className="btn flex items-center c-white b-none"
                >
                  <AiOutlineBarChart className="icon" />
                  <Space val={".3rem"} />
                  {formatNumber(item?.views?.length)}
                </button>
                <button
                  onClick={() =>
                    sharePost(
                      `${location.protocol}//${location.host}/post/${item?._id}?is_comment=${is_comment}`
                    )
                  }
                  className="btn flex items-center c-white b-none"
                >
                  <CiShare1 className="icon" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
