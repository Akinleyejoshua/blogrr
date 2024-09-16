import { Button } from "@/components/Button";
import { Space } from "@/components/Space";
import { Toast } from "@/components/Toast";
import { fileToBlob } from "@/utils/helpers";
import Image from "next/image";
import {
    AiOutlineFileImage,
    AiOutlineSave,
    AiOutlineUser,
} from "react-icons/ai";
import { FaAt, FaKey, FaWhatsapp } from "react-icons/fa6";

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


                <div className="input-bar input-file img">

                    {(form?.img == "" || form?.img == undefined)
                        ?
                        <AiOutlineFileImage className="icon" />
                        :
                        <Image height={10} width={10} src={form?.img} alt="" />

                    }

                    <input
                        type="file"
                        onChange={(e) => {
                            const file = new FileReader();
                            file.readAsDataURL(e.target.files[0]);
                            file.onload = () => {
                                handleState("img", file.result);
                            }
                        }}
                    />
                </div>
                <Space val={".3rem"} />

                <small>Upload Image</small>

                <Space val={"1rem"} />
                <div className="grid">
                    <div className="flex col">
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
                        <Space val={".3rem"} />
                        {form.emailExistErr &&
                            <small className="c-red">This email is already in use!</small>
                        }
                    </div>

                    <div className="input-bar h-max">
                        <AiOutlineUser className="icon" />
                        <Space val={".3rem"} />
                        <input
                            type="text"
                            defaultValue={data?.username}
                            placeholder="Username"
                            onChange={(e) => handleState("username", e.target.value)}
                        />
                    </div>
                    <div className="input-bar h-max">
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

                <div className="grid">
                    <div className="input-bar">
                        <FaWhatsapp className="icon" />
                        <Space val={".3rem"} />
                        <input
                            type="text"
                            defaultValue={data?.whatsapp}
                            placeholder="Whatsapp for chat"
                            onChange={(e) => handleState("whatsapp", e.target.value)}
                        />
                    </div>
                </div>
                <Space val={"1rem"} />

                <textarea
                    defaultValue={data?.bio}
                    className="bio-input"
                    placeholder="Your Bio (About yourself)"
                    onChange={(e) => handleState("bio", e.target.value)}
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
