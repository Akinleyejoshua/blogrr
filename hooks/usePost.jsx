import { setPostComments, setPostItem, setPostItems, togglePostLoading } from "@/redux/features/state";
import { deletePostAPI, getCommentsAPI, getPostAPI, getPostsAPI, likeActionAPI } from "@/services/post";
import { publishPostAPI } from "@/services/publish";
import { formatNumber, } from "@/utils/helpers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useComponents } from "./useComponents";

export const usePost = () => {
    const state = useSelector((state) => state.state.posts);
    const userState = useSelector(state => state.state.user);
    const { openFloatAlert } = useComponents();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const [searching, setSearching] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = (title) => {
        if (title.length > 0) {
            setSearching(true);
            const filter = state.items.filter((item) =>
                item?.title.toLowerCase().includes(title.toLowerCase())
            );
            setSearchItems(filter);
        } else {
            setSearching(false);
        }
    };

    const [post, setPost] = useState({});

    const getPost = (id, is_comment) => {
        setLoading(true);

        const filter = state.items.filter((item) => item?._id == id)[0];
        if (filter === undefined) {
            getPostAPI({ id, is_comment }).then((res) => {
                const data = res.data;
                if (data.msg == "not-found") {
                    setNotFound(true);
                } else {
                    setPost(data);
                }
                setLoading(false);
            });
        } else {
            setPost(filter);
            setLoading(false);
        }
    };

    const getPosts = () => {
        dispatch(togglePostLoading(true))
        getPostsAPI({}).then(res => {
            const data = res.data;
            if (data.msg == "not-found") {

            } else {
                dispatch(setPostItems(data))
            }

            dispatch(togglePostLoading(false))

        })
    };

    const getComments = () => {
        dispatch(togglePostLoading(true))
        getCommentsAPI({}).then(res => {
            const data = res.data;
            if (data.msg == "not-found") {

            } else {
                dispatch(setPostComments(data))
            }

            dispatch(togglePostLoading(false))

        })
    };

    const refreshPost = (id, is_comment) => {
        getPostAPI({ id, is_comment }).then((res) => {
            const data = res.data;
            if (data.msg == "not-found") {
                // setNotFound(true);
                setCommentState({
                    ...commentState,
                    loading: false,
                    msg: "Oops! an error occured while updating comments!",
                    msgType: "error"
                })
            } else {
                setPost(data);
                setCommentState({
                    ...commentState,
                    loading: false,
                    msg: "Comments updated",
                    msgType: "success"
                })
            }
        });
    }

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

    const like = (e, id) => {
        let target = e.target;
        let btn = e.target.children[1];
        let text = e.target.children[2];

        if (target.className.includes("far")) {
            target.classList.replace("far", "fa");
            let val = parseInt(text.innerHTML) + 1;
            text.innerHTML = val;
            btn.innerHTML = formatNumber(val);
            likeActionAPI({ type: "like", id: id, user_id: userState._id })
        } else {
            target.classList.replace("fa", "far");
            let val = parseInt(text.innerHTML) - 1;
            text.innerHTML = val;
            btn.innerHTML = formatNumber(val);
            likeActionAPI({ type: "un-like", id: id, user_id: userState._id })

        }
    };

    const [commentState, setCommentState] = useState({
        content: "",
        loading: false,
        msg: "",
        msgType: "",
    })

    const commentOnPost = (id, is_comment) => {
        setCommentState({
            ...commentState,
            loading: true,
        })
        publishPostAPI({
            _id: userState._id,
            title: "",
            content: commentState.content,
            is_comment: true,
            main_post_id: id,
        }).then(res => {
            const data = res.data;
            if (data.posted) {

                refreshPost(id, is_comment);

                setCommentState({
                    ...commentState,
                    loading: false,
                    msg: "Commented!",
                    msgType: "success"
                })
            }

        })
    }

    const deletePost = (id) => {
        deletePostAPI({ id }).then(res => {
            const data = res.data;
            if (data.deleted) {
                openFloatAlert("Post Deleted!", "del")
            }
        })
    }

    const sharePost = (path) => {
        navigator.clipboard.writeText(path);
        openFloatAlert("Post copied to clipboard!", "")

    }

    return {
        commentState,
        setCommentState,
        state,
        like,
        searching,
        handleSearch,
        searchItems,
        loading,
        post,
        getPost,
        notFound,
        getPosts,
        addToPost,
        commentOnPost,
        deletePost,
        getComments,
        sharePost,
    };
};
