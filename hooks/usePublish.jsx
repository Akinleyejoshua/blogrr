import { setPostItem } from "@/redux/features/state";
import { getPostAPI } from "@/services/post";
import { publishPostAPI, updatePublishedPostAPI } from "@/services/publish";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const usePublish = () => {
    const userState = useSelector(state => state.state.user);
    const posts = useSelector(state => state.state.posts);
    const router = useRouter();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        loading: false,
        title: "",
        content: "",
        msg: "",
        msgType: "",
    })

    const handleState = (name, val) => {
        setState(prev => ({
            ...prev,
            [name]: val
        }))
    }

    const getPost = (id, is_comment) => {
        handleState("loading", true);

        const filter = posts.items.filter((item) => item?._id == id)[0];
        if (filter === undefined) {
            getPostAPI({ id, is_comment }).then((res) => {
                const data = res.data;
                if (data.msg == "not-found") {

                } else {
                    handleState("title", data?.title);
                    handleState("content", data?.content);
                }
                handleState("loading", false);
            });
        } else {
            handleState("title", filter?.title);
            handleState("content", filter?.content);
            handleState("loading", false);
        }
    };

    const addToPost = () => {
        getPostAPI({ id }).then((res) => {
            const data = res.data;
            if (data.msg == "not-found") {
            } else {
                dispatch(setPostItem(data));
            }
            setLoading(false);
        });
    };

    const publish = (is_comment) => {
        if (state.title == "" || state.content == "") {
            handleState("msg", "All fields are required")
            handleState("msgType", "error")
        } else {
            handleState("loading", true)

            publishPostAPI({
                _id: userState._id,
                title: state.title,
                content: state.content,
                is_comment: is_comment,
                main_post_id: "",
            }).then(res => {
                const data = res.data;
                if (data.posted) {
                    handleState("msg", "Posted")
                    handleState("msgType", "success");
                    handleState("loading", false)
                    router.push(`/post/${data._id}?is_comment=${is_comment}`);
                }

            })
        }

    }

    const updatePublished = (id, is_comment) => {
        if (state.content == "") {
            handleState("msg", "All fields are required")
            handleState("msgType", "error")
        } else {
            handleState("loading", true)

            updatePublishedPostAPI({
                id: id,
                _id: userState._id,
                title: state.title,
                content: state.content,
                is_comment: is_comment,
            }).then(res => {
                const data = res.data;
                if (data.posted) {
                    handleState("msg", "Posted")
                    handleState("msgType", "success");
                    handleState("loading", false)
                    router.push(`/post/${data._id}?is_comment=${is_comment}`);
                } else {
                    publish(is_comment)
                }

            })
        }

    }


    return { state, handleState, publish, addToPost, getPost, updatePublished }
}