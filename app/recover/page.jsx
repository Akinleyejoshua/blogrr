"use client"


import { Button } from "@/components/Button";
import { NavBrand } from "@/components/NavBrand";
import { Space } from "@/components/Space";
import { FaAt, FaKey } from "react-icons/fa6";
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { Link } from "@/components/Link";
import { Toast } from "@/components/Toast";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { msg, msgType, recover, handleState, loading } = useAuth();

  return (
    <main className="auth">
      <div className="flex auth-center row fit">
        <div className="flex col fit justify-center">
          <NavBrand size={"6rem"} />
          <Space val={"1rem"} />
          <h3 className="bolder">Think Creative.</h3>
          <h3 className="">Join the creative social network where people change the world</h3>
          <small className="dim">Create, Publish, Edit and Share Content</small>
          <Space val={"1rem"} />
        </div>
        <div className="flex col fit justify-center">

          <form className="center" onSubmit={e => {
            e.preventDefault();
            recover();
          }}>
            <h1 className="bolder">Recover Account!</h1>

            <Space val={".6rem"} />
            <Toast text={msg} type={msgType} />
            <Space val={".6rem"} />

            <div className="input-bar">
              <FaAt className="icon" />
              <Space val={".3rem"} />
              <input type="text" placeholder="Email" onChange={e => handleState("email", e.target.value)} />
            </div>

            <Space val={".6rem"} />

            <div className="input-bar">
              <FaKey className="icon" />
              <Space val={".3rem"} />
              <input type="password" placeholder="New Password" onChange={e => handleState("pwd", e.target.value)} />
            </div>

            <Space val={".6rem"} />

            <Button
              icon={<AiOutlineLogin className="icon" />}
              text={"Change Password"}
              loading={loading}
              onClick={() => { }}
            />

            <Space val={".6rem"} />

            <div className="flex row">
              <Link to={"/signin"} text={"Sign in"} />
              <Space val={".3rem"} />
              <Link to={"/"} text={"Sign up"} />
            </div>

          </form>
        </div>
      </div>


    </main>
  );
}
