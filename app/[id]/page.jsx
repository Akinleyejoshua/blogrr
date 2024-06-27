"use client";

import { Header } from "@/components/Header";
import { Link } from "@/components/Link";
import { Loader } from "@/components/Loader";
import { ProfileBanner } from "@/components/ProfileBanner";
import { SideBar } from "@/components/SideBar";
import { Space } from "@/components/Space";
import { Tabs } from "@/components/Tabs";
import { useProfile } from "@/hooks/useProfile";
import { EditProfile } from "@/layouts/EditProfile";
import { MyComments } from "@/layouts/MyComments";
import { MyFollowers } from "@/layouts/MyFollowers";
import { MyFollowing } from "@/layouts/MyFollowing";
import { MyLikes } from "@/layouts/MyLikes";
import { MyPosts } from "@/layouts/MyPosts";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const {
    state,
    getProfileData,
    handleForm,
    form,
    updateProfileData,
    followAction,
    profileNotFound,
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
          <div className="main scroll-y">
            {state.loading ? (
              <Loader />
            ) : profileNotFound ? <>
              <h1>404 Not Found</h1>
              <Space val={".3rem"} />
              <Link to={"/home"} text={"Home"} />
            </> : (
              <>
                <ProfileBanner data={state} user={loggedUser} follow={followAction} />
                <Space val={"1rem"} />

                <Tabs
                  links={[
                    {
                      name: "Posts",
                      id: 1,
                      tab: <MyPosts data={state} />,
                      open: true,
                    },
                    {
                      name: "Comments & Replies",
                      id: 2,
                      tab: <MyComments data={state} />,
                      open: true,
                    },
                    {
                      name: "Edit Profile",
                      id: 3,
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
                      id: 4,
                      tab: <MyFollowing data={state} />,
                      open: true,
                    },
                    {
                      name: "Followers",
                      id: 5,
                      tab: <MyFollowers data={state} />,
                      open: true,
                    },
                    {
                      name: "Likes",
                      id: 6,
                      tab: <MyLikes data={state} />,
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
