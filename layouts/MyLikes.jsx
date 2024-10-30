import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { Post } from "@/components/Post";
import { Space } from "@/components/Space";
import { usePost } from "@/hooks/usePost";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MyLikes = ({ data }) => {
  const { state, like, searching, searchItems, getPosts, getComments } =
    usePost();
  const loggedUser = useSelector((state) => state.state.user);

  useEffect(() => {
    getComments();
    // getPosts();
  }, []);

  if (state.loading) {
    return <Loader />;
  }
  const filter = [];
  const filterPosts = state.items.filter(
    (item) => item.likes.includes(data._id)
  );
  const filterComments = state.comments.filter(
    (item) => item.likes.includes(data._id)
  );
  filterPosts?.map((item) => filter.push(item));
  filterComments?.map((item) => filter.push(item));

  if (filter?.length === 0) {
    return (
      <div>
        <h1>No Likes</h1>
        {loggedUser._id == data._id ? (
          <Link to={"/home"} text={"Open a post and like"} />
        ) : (
          <p>{data?.username} has no likes</p>
        )}
      </div>
    );
  }

  return (
    <div className="my-post">
      <h1>
        {filter?.length} LIKE{filter?.length > 1 && "S"}
      </h1>

      <Space val={"1rem"} />

      <Post
        data={searching ? searchItems : filter}
        like={like}
        is_comment={false}
      />
    </div>
  );
};
