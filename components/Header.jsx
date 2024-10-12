import { GoBell } from "react-icons/go"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";
import { useComponents } from "@/hooks/useComponents";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { FloatAlert } from "./FloatAlert";
import { useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { get } from "@/utils/localstorage";

export const Header = memo(({ title }) => {
    const { openSideBar, floatAlert } = useComponents();
    const userId = get("login-id");

    const { logout } = useAuth();
    const router = useRouter();
    const user = useSelector(state => state.state.notifications);

    const seen = user ? [] : filter.filter(item => item.seen == false);

    return <header className="">
        <nav className="flex row space-between items-center">
            <AiOutlineArrowLeft className="icon pointer" onClick={() => router.back()} />
            <div className="title">{title}</div>

            <div className="nav-links flex">
                <button className="btn flex items-center c-white menu-btn" onClick={openSideBar}>
                    <BiDotsHorizontalRounded className="icon" />
                </button>

                {userId != "null"
                    &&
                    <button className="btn flex items-center c-white bell" onClick={() => router.push("/notifications")}>
                        <GoBell className="icon" />
                        {seen.length > 0 &&
                            <div className="bell-tag">{seen.length}</div>
                        }
                    </button>  
                }
              

                <button className="btn flex items-center c-red" onClick={logout}>
                    <AiOutlineLogout className="icon" />
                </button>
            </div>
        </nav>

        {floatAlert.content != "" &&
            <FloatAlert content={floatAlert?.content} type={floatAlert.type} />
        }
    </header>
})