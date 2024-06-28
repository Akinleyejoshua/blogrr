import { BiDotsVerticalRounded } from "react-icons/bi";
import { Avater } from "./Avater";
import { Space } from "./Space";
import { useSelector } from "react-redux";
import { atlify, formatNumber, shortenText, urlify } from "@/utils/helpers";
import { CiChat1, CiShare1 } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Link } from "./Link";
import { RelativeTimeBar } from "./RelativeTimeBar";
import { DropdownMenu } from "./DropdownMenu";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { usePost } from "@/hooks/usePost";

export const Post = ({ data, like, is_comment }) => {
  const userState = useSelector((state) => state.state.user);
  const router = useRouter();
  const { deletePost, sharePost } = usePost();

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
              <div className="vline"></div>
            </div>
            <Space val={".6rem"} />

            <div className="flex fit col">
              <div className="flex w-full row space-between">
                <div className="flex fit row pointer items-center">
                  <h3
                    className="tiny dim"
                    onClick={() => router.push(`/@${item?.username}`)}
                  >
                    @{item?.username}
                  </h3>
                  <Space val={".3rem"} />
                  ·
                  <Space val={".3rem"} />
                  <p className="dim tiny">
                    {<RelativeTimeBar timestamp={item?.timestamp} />}
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
                      onClick: () => deletePost(item?._id),
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
                  className={`w-full tiny ${!is_comment && "dim"}`}
                  dangerouslySetInnerHTML={{
                    __html: atlify(urlify(shortenText(item?.content, 333))),
                  }}
                ></div>
              </div>
              <Space val={".3rem"} />
              <div className="actions fit flex row space-between">
                {item?.likes?.includes(userState._id) ? (
                  <button
                    className="icon btn items-center b-none c-red fa fa-heart red"
                    onClick={(e) => like(e, item?._id)}
                  >
                    <Space val={".3rem"} />
                    <p className="num">{formatNumber(item?.likes?.length)}</p>
                    <p className="not-visible">{item?.likes?.length}</p>
                  </button>
                ) : (
                  <button
                    className="icon btn items-center b-none c-red far fa-heart red"
                    onClick={(e) => like(e, item?._id)}
                  >
                    <Space val={".3rem"} />
                    <p className="num">{formatNumber(item?.likes?.length)}</p>
                    <p className="not-visible">{item?.likes?.length}</p>
                  </button>
                )}
                <button
                  onClick={() =>
                    router.push(`/post/${item?._id}?is_comment=${is_comment}`)
                  }
                  className="btn flex items-center c-white b-none"
                >
                  <CiChat1 className="icon" />
                  <Space val={".3rem"} />
                  <p>{item?.comments?.length}</p>
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
};
