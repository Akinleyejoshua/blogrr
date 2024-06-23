import { GoBell } from "react-icons/go"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useComponents } from "@/hooks/useComponents";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const Header = ({ title }) => {
    const { openSideBar } = useComponents();
    const { logout } = useAuth();
    const router = useRouter();

    return <header className="">
        <nav className="flex row space-between items-center">
            <div className="title">{title}</div>

            <div className="nav-links flex">
                <button className="btn flex items-center c-white menu-btn" onClick={openSideBar}>
                    <BiDotsHorizontalRounded className="icon" />
                </button>

                <button className="btn flex items-center c-white" onClick={() => router.push("/notifications")}>
                    <GoBell className="icon" />
                </button>

                <button className="btn flex items-center c-red" onClick={logout}>
                    <AiOutlineLogout className="icon" />
                </button>
            </div>
        </nav>
    </header>
}