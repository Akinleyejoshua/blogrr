import { toggleSideBar } from "@/redux/features/state";
import { useDispatch, useSelector } from "react-redux";

export const useComponents = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.state.components);
    const sidebar = state.sidebar;

    const openSideBar = () => dispatch(toggleSideBar(true));
    const closeSideBar = () => dispatch(toggleSideBar(false));

    return {
        openSideBar,
        closeSideBar,
        sidebar,
    }
}