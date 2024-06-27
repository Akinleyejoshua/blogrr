export const FollowBtn = ({followers, user_id, following_id, follow}) => {
    return followers?.includes(user_id)
        ?
        <div id="un-follow" onClick={e => follow(following_id, user_id, e)} className="btn h-max pointer follow-btn b-none c-white w-max">Unfollow</div>
        :
        <div id="follow" onClick={e => follow(following_id, user_id, e)} className="btn h-max pointer follow-btn b-none c-white w-max">Follow</div>
    
}