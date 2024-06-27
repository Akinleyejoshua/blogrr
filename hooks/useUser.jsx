import { setUserData, toggleUserLoading } from "@/redux/features/state";
import { getFollowingFollowersAPI, getUserDataAPI } from "@/services/user";
import { get } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useUser = () => {
    const state = useSelector(state => state.state.user);
    const dispatch = useDispatch();
    const router = useRouter();


    const {
        loading,
        _id,
        username,
        email,
        following,
        followers,
        img,
    } = state;

    const [followingFollowers, setFollowingFollowers] = useState({});
    const [userLoading, setUserLoading] = useState(false);


    const getUserData = (id) => {
        dispatch(toggleUserLoading(true));
        getUserDataAPI({ id }).then(res => {
            const data = res.data;
            if (data.msg == "found") {
                dispatch(setUserData(data))
            } else {
                router.push("/");
            }
            dispatch(toggleUserLoading(false));

        })
    }

    const getFollowingFollowers = (id) => {
        setUserLoading(true);
        getFollowingFollowersAPI({ id }).then(res => {
            const data = res.data;
            setFollowingFollowers(data)
            setUserLoading(false);

        })
    }


    return {
        loading,
        _id,
        username,
        email,
        following,
        followers,
        img,
        getUserData,
        userLoading,
        followingFollowers,
        getFollowingFollowers,
    }
}