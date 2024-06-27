import { AiOutlineBook, AiOutlineDashboard, AiOutlineLogout, AiOutlineUser } from "react-icons/ai"
import { Avater } from "./Avater"
import { NavBrand } from "./NavBrand"
import { Space } from "./Space"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { GoHome } from "react-icons/go";
import { useComponents } from "@/hooks/useComponents"
import { useUser } from "@/hooks/useUser"
import { useEffect } from "react"
import { Loader } from "./Loader"
import { get } from "@/utils/localstorage"
import { HLine } from "./HLine"

export const SideBar = () => {
    const { sidebar, closeSideBar } = useComponents();
    const { loading, username, email, followers, following, getUserData, img } = useUser();
    const { authenticate } = useAuth();

    const router = useRouter();
    const { logout } = useAuth()

    useEffect(() => {
        const userTokenId = JSON.parse(get("login-id"));
        if (email == "") {
            getUserData(userTokenId);
        }


    }, [])

    return <div className={`${sidebar ? "sidebar flex open" : "sidebar flex"}`}>
        <div className="content fit">
            <div className="top">

                <NavBrand size={"3rem"} />
                <Space val={"1.3rem"} />
                {loading ? <Loader size={"1rem"} /> :
                    <div className="flex row data fit">
                        <Avater data={{ username, img }} size={"6rem"} fontSize={"3rem"} />
                        <Space val={"1rem"} />

                        <div className="flex col fit center">
                            <h3 className="">{username}</h3>
                            <small className="dim">{email}</small>

                            <div className="flex row fit">
                                <div className="flex row tiny">
                                    <div className="flex row">{followers.length}</div>
                                    <Space val={".1rem"} />
                                    <p className="dim">follower{followers.length > 1 && "s"}</p>
                                </div>
                                <Space val={".3rem"} />
                                <div className="flex row tiny">
                                    <div className="flex row">{following.length}</div>
                                    <Space val={".1rem"} />
                                    <p className="dim">following</p>
                                </div>
                            </div>
                        </div>

                    </div>

                }

                <Space val={"1.3rem"} />

                <div className="links" onClick={closeSideBar}>
                    <button className="flex row items-center btn c-white" onClick={() => router.push("/home")}>
                        <GoHome className="icon" />
                        <Space val={".3rem"} />
                        <p>Home</p>
                    </button>
                    <button className="flex row items-center btn c-white" onClick={() => router.push(`/@${username}`)}>
                        <AiOutlineUser className="icon" />
                        <Space val={".3rem"} />
                        <p>Profile</p>
                    </button>
                    <button className="flex row items-center btn c-white" onClick={() => router.push(`/publish`)}>
                        <AiOutlineBook className="icon" />
                        <Space val={".3rem"} />
                        <p>Create</p>
                    </button>
                    {/* <button className="flex row items-center btn c-white" onClick={() => router.push("/dashboard")}>
                        <AiOutlineDashboard className="icon" />
                        <Space val={".3rem"} />
                        <p>Dashbaord</p>
                    </button> */}
                    <Space val={".6rem"} />

                    <HLine width={"9rem"}/>
                    <Space val={".6rem"} />

                    <button className="flex row items-center btn c-red" onClick={() => logout()}>
                        <AiOutlineLogout className="icon" />
                        <Space val={".3rem"} />
                        <p>Logout</p>
                    </button>
                </div>

            </div>

        </div>

        <div className="close-bar" onClick={closeSideBar}></div>
    </div>
}