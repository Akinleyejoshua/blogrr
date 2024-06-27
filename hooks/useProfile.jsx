import { toggleProfileLoading, setProfile, clearProfileData } from "@/redux/features/state";
import { followActionAPI, getProfileDataAPI, updateProfileDataAPI } from "@/services/user";
import { get } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useComponents } from "./useComponents";

export const useProfile = () => {
    const {openFloatAlert} = useComponents();
    const state = useSelector(state => state.state.profile);
    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        loading: false,
        id: "",
        username: "",
        email: "",
        img: "",
        bio: "",
        pwd: "",
        whatsapp: "",
        emailExistErr: false,
    })

    const [profileNotFound, setProfileNotFound] = useState(false);

    const handleForm = (name, val) => {
        setForm(prev => ({
            ...prev,
            [name]: val
        }))
    }

    const {
        loading,
    } = state;

    const getProfileData = (username) => {
        dispatch(toggleProfileLoading(true))
        getProfileDataAPI({ username }).then(res => {
            const data = res.data;
            if (data.msg == "found") {
                dispatch(setProfile(data));
                handleForm("id", data._id);
                handleForm("username", data.username);
                handleForm("email", data.email);
                handleForm("pwd", data.pwd);
                handleForm("bio", data.bio);
                handleForm("img", data.img);
                handleForm("whatsapp", data.whatsapp);
            } else if (data.msg == "not-found") {
                setProfileNotFound(true)
            }
            dispatch(toggleProfileLoading(false))

        })
    }


    const updateProfileData = () => {

        handleForm("loading", true);
        updateProfileDataAPI({ ...form }).then(res => {
            const data = res.data;
            if (data.updated) {
                handleForm("msg", "Updated!")
                handleForm("msgType", "success");
                getProfileData(data?.username);
                if (data.msg == "email-exist"){
                    handleForm("emailExistErr", true);
                }
            } else {
                handleForm("msg", "Oops, an error occured!")
                handleForm("msgType", "error")
            }
            handleForm("loading", false);

        })
    }

    const followAction = (id, userId, e) => {
        const type = e.target.id;

        if (e.target.id == "follow") {
            e.target.innerHTML = "Unfollow"
            e.target.id = "un-follow";
        } else if (e.target.id == "un-follow") {
            e.target.innerHTML = "Follow"
            e.target.id = "follow";
        }

        followActionAPI({ id: id, user_id: userId, type }).then(res => {
            const data = res.data;
            if (data.followed){
                openFloatAlert("User followed", "user")
            } else if (data.un_followed){
                openFloatAlert("User Unfollowed", "user")

            }
        })

    }

    return {
        loading,
        state,
        handleForm,
        form,
        getProfileData,
        updateProfileData,
        followAction,
        profileNotFound,
    }
}