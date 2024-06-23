import { toggleProfileLoading, setProfile } from "@/redux/features/state";
import { getProfileDataAPI, getUserDataAPI } from "@/services/user";
import { get } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useProfile = () => {
    const state = useSelector(state => state.state.profile);
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
        _following,
        _followers,
    } = state;


    const getProfileData = (username) => {
        dispatch(toggleProfileLoading(true))
        getProfileDataAPI({ username }).then(res => {
            const data = res.data;
            if (data.msg == "found") {
                dispatch(setProfile(data));
            } else {
                router.push("/home");
            }
            dispatch(toggleProfileLoading(false))

        })
    }

    const [form, setForm] = useState({
        loading: true,
        _id: "",
        username: "",
        email: "",
        following: 0,
        followers: 0,
        img: "",
        _following: [],
        _followers: [],
        bio: "",
        pwd: "",

    })

    const handleForm = (name, val) => {
        setForm(prev => ({
            ...prev,
            [name]: val
        }))
    }

    return {
        loading,
        _id,
        username,
        email,
        following,
        followers,
        img,
        getProfileData,
        _following,
        _followers,
        state,
        handleForm,
        form
    }
}