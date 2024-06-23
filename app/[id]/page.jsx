"use client"

import { Header } from "@/components/Header"
import { Loader } from "@/components/Loader"
import { ProfileBanner } from "@/components/ProfileBanner"
import { SideBar } from "@/components/SideBar"
import { Space } from "@/components/Space"
import { Tabs } from "@/components/Tabs"
import { useProfile } from "@/hooks/useProfile"
import { EditProfile } from "@/layouts/EditProfile"
import { MyPosts } from "@/layouts/MyPosts"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    const {
        loading,
        state,
        getProfileData,
        handleForm,
        form
    } = useProfile();

    const { id: user } = useParams();
    const name = user.replace("%40", "");

    useEffect(() => {
        getProfileData(name);
    }, [])


    return <main className="home">
        <div className="flex row fit">
            <SideBar />
            <div className="flex col fit">
                <Header title={"Profile"} />
                <Space val={"1rem"} />
                <div className="main scroll-y">
                    {loading ? <Loader /> : <>
                        <ProfileBanner data={state} />
                        <Space val={"1rem"} />

                        <Tabs
                            links={[
                                {
                                    name: "My Post",
                                    id: 1,
                                    tab: <MyPosts />,
                                    open: true,
                                },
                                {
                                    name: "Edit Profile",
                                    id: 2,
                                    tab: <EditProfile data={state} handleState={handleForm} form={form}/>,
                                    open: name == state?.username,
                                },
                                {
                                    name: "Following",
                                    id: 3,
                                    tab: <></>,
                                    open: true,

                                },
                                {
                                    name: "followers",
                                    id: 4,
                                    tab: <></>,
                                    open: true,

                                },
                            ]}
                        />
                    </>
                    }
                </div>
            </div>
        </div>
    </main>
}