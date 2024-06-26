"use client";

import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { ProfileBanner } from "@/components/ProfileBanner";
import { SideBar } from "@/components/SideBar";
import { Space } from "@/components/Space";
import { Tabs } from "@/components/Tabs";
import { useProfile } from "@/hooks/useProfile";
import { EditProfile } from "@/layouts/EditProfile";
import { MyPosts } from "@/layouts/MyPosts";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const {
    loading,
    state,
    getProfileData,
    handleForm,
    form,
    updateProfileData,
    followAction,
    
  } = useProfile();

  const { id: user } = useParams();
  const name = user.replace("%40", "");
  const loggedUser = useSelector(state => state.state.user);

  useEffect(() => {
    getProfileData(name);
  }, []);

  return (
    <main className="profile fit">
      <div className="flex row fit">
        <SideBar />
        <div className="flex col fit">
          <Header title={"Profile"} />
          <Space val={"1rem"} />
          <div className="main scroll-y">
            {loading ? (
              <Loader />
            ) : (
              <>
                <ProfileBanner data={state} user={loggedUser} follow={followAction} />
                <Space val={"1rem"} />

                <Tabs
                  links={[
                    {
                      name: "Posts",
                      id: 1,
                      tab: <MyPosts data={state}/>,
                      open: true,
                    },
                    {
                      name: "Edit Profile",
                      id: 2,
                      tab: (
                        <EditProfile
                          onSubmit={updateProfileData}
                          data={state}
                          handleState={handleForm}
                          form={form}
                        />
                      ),
                      open: name == loggedUser?.username,
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
