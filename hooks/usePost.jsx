import { useSelector } from "react-redux"

export const usePost = () => {
    const state = useSelector(state => state.state.posts);

    return {state}
}