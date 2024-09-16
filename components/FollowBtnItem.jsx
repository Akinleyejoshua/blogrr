import { useState } from "react";

export const FollowBtnItem = ({ followers, user_id, following_id, follow }) => {
  const [following, setFollowing] = useState(followers?.includes(user_id));
  const state = following ? "un-follow" : "follow";

  return following ? (
    <div
      id="un-follow"
      onClick={(e) => {
        setFollowing(false);
        follow(following_id, user_id, state)
      }}
      className="btn h-max pointer follow-btn b-none c-white w-max"
    >
      Unfollow
    </div>
  ) : (
    <div
      id="follow"
      onClick={(e) => {
        setFollowing(true);
        follow(following_id, user_id, state)
      }}
      className="btn h-max pointer follow-btn b-none c-white w-max"
    >
      Follow
    </div>
  );
};
