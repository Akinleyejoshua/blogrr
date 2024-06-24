import { formatNumber, formatPostTitle } from "@/utils/helpers";
import { useState } from "react";
import { useSelector } from "react-redux"

export const usePost = () => {
    const state = useSelector(state => state.state.posts);
    const userState = useSelector(state => state.state.user);

    const [loading, setLoading] = useState(false);

    const [searching, setSearching] = useState(false);
    const [searchItems, setSearchItems] = useState([]);

    const handleSearch = (title) => {
        if (title.length > 0) {
            setSearching(true)
            const filter = state.items.filter(item => item?.title.toLowerCase().includes(title.toLowerCase()));
            setSearchItems(filter)
        } else {
            setSearching(false)
        }

    }

    const [post, setPost] = useState({});

    const getPost = (id) => {
        const filter = state.items.filter(item => item?._id == id)[0];
        setPost(filter);
    }

    const like = (e) => {
        let target = e.target;
        let btn = e.target.children[1];
        let text = e.target.children[2];

        if (target.className.includes("far")) {
            target.classList.replace("far", "fa");
            let val = parseInt(text.innerHTML) + 1
            text.innerHTML = val
            btn.innerHTML = formatNumber(val);
        } else {
            target.classList.replace("fa", "far");
            let val = parseInt(text.innerHTML) - 1
            text.innerHTML = val
            btn.innerHTML = formatNumber(val);
        }
    };

    return { state, like, searching, handleSearch, searchItems, loading, post, getPost }
}