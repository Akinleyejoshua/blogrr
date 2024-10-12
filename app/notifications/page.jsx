"use client"

import { Header } from "@/components/Header"
import { NotificationBar } from "@/components/NotificationBar";
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser"
import { get } from "@/utils/localstorage";
import { useEffect } from "react";

export default function Page(){
    const {getUserNotification, notifications, setNotificationSeenStatus} = useUser();
    const { authenticate } = useAuth();

    useEffect(() => {
        authenticate();
    }, [])
    
    useEffect(() => {
        const userId = get("login-id")
        getUserNotification(userId)
        setNotificationSeenStatus(userId, true);
    }, [])

    return <main className="home notifications">
        <div className="flex row fit">
            <SideBar/>
            <div className="flex col fit">
                <Header title={"Notifications"}/>
                <div className="main scroll-y">
                    <Space val={".3rem"}/>
                    <div className="notification-section">
                    <NotificationBar data={notifications}/>
                    </div>
                </div>
            </div>
        </div>
    </main>
}