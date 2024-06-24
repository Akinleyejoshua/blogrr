import { toggleProfileLoading, setProfile, clearProfileData } from "@/redux/features/state";
import { getProfileDataAPI, updateProfileDataAPI } from "@/services/user";
import { get } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useProfile = () => {
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
    })

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
        // dispatch(clearProfileData())
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
            } else {
                router.push("/home");
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
            } else {
                handleForm("msg", "Oops, an error occured!")
                handleForm("msgType", "error")
            }
            handleForm("loading", false);

        })
    }

    return {
        loading,
        state,
        handleForm,
        form,
        getProfileData,
        updateProfileData
    }
}