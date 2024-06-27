import { toggleFloatAlert, toggleSideBar } from "@/redux/features/state";
import { useDispatch, useSelector } from "react-redux";

export const useComponents = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state.components);
  const sidebar = state.sidebar;
  const floatAlert = state.floatAlert;

  const openSideBar = () => dispatch(toggleSideBar(true));
  const closeSideBar = () => dispatch(toggleSideBar(false));
  const openFloatAlert = (content, type) =>
    dispatch(toggleFloatAlert({ type: type, content: content, open: true }));
  const closeFloatAlert = () =>
    dispatch(toggleFloatAlert({ content: "", open: false }));

  return {
    openSideBar,
    closeSideBar,
    sidebar,
    floatAlert,
    openFloatAlert,
    closeFloatAlert,
  };
};
