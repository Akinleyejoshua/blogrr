import { Button } from "@/components/Button";
import { Space } from "@/components/Space";
import { Toast } from "@/components/Toast";
import { AiOutlineSave, AiOutlineUser } from "react-icons/ai";
import { FaAt, FaKey } from "react-icons/fa6";

export const EditProfile = ({ data, onSubmit, handleState, form }) => {
    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            <Space val={"1rem"} />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className="grid">
                    <div className="input-bar">
                        <FaAt className="icon" />
                        <Space val={".3rem"} />
                        <input
                            type="text"
                            defaultValue={data?.email}
                            placeholder="Email"
                            onChange={(e) => handleState("email", e.target.value)}
                        />
                    </div>
                    <div className="input-bar">
                        <AiOutlineUser className="icon" />
                        <Space val={".3rem"} />
                        <input
                            type="text"
                            defaultValue={data?.username}
                            placeholder="Username"
                            onChange={(e) => handleState("username", e.target.value)}
                        />
                    </div>
                    <div className="input-bar">
                        <FaKey className="icon" />
                        <Space val={".3rem"} />
                        <input
                            type="password"
                            defaultValue={data?.pwd}
                            placeholder="Password"
                            onChange={(e) => handleState("pwd", e.target.value)}
                        />
                    </div>
                </div>
                <Space val={"1rem"} />

                <textarea
                    defaultValue={data?.bio}
                    className="bio-input"
                    placeholder="Your Bio (About yourself)"
                    onChange={e => handleState("bio", e.target.value)}
                ></textarea>
                
                <Space val={".6rem"} />
                <Toast text={form.msg} type={form.msgType} />
                <Space val={".6rem"} />

                <Button
                    icon={<AiOutlineSave className="icon" />}
                    text={"Update"}
                    loading={form.loading}
                    onClick={() => { }}
                />
            </form>
        </div>
    );
};
