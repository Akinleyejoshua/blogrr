import { clearUserData } from "@/redux/features/state";
import { recoverAPI, signinAPI, signupAPI } from "@/services/auth";
import { get, save } from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        msg: "",
        msgType: "",
        email: "",
        pwd: "",
        username: "",
        loading: false,
    });

    const isAuth = () => {
        const auth = get("login-id");
        if (auth === undefined || auth === null || auth === "") {
            return false;
        } else {
            return true;
        }
    };

    const authenticate = () => {
        if (!isAuth()) {
            save("prev-url", window.location.href);
            router.push("/signin");
            return false
        } else {
            const lastVisit = get("prev-url");
            if (
                lastVisit !== "" ||
                lastVisit !== undefined ||
                lastVisit !== null
            ) {
                router.replace(lastVisit);
            } else {
                router.push("/home");
            }
            return true;
        }
    };

    const handleState = (name, val) => {
        setState((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    const clearState = () => {
        setState({
            msg: "",
            msgType: "",
            email: "",
            pwd: "",
            username: "",
            loading: false,
        });
    };

    const { msg, msgType, email, username, pwd, loading } = state;

    const signup = async () => {
        if ([email, username, pwd].includes("")) {
            handleState("msg", "All fields are required!");
            handleState("msgType", "error");
        } else {
            handleState("loading", true);
            handleState("msg", "");
            handleState("msgType", "");
            signupAPI({
                email: email,
                pwd: pwd,
                username: username.replace(" ", "_"),
            })
                .then((res) => {
                    const data = res.data;
                    if (data.created) {
                        handleState("msg", "Account Registered!");
                        handleState("msgType", "success");
                        router.push("signin");
                    } else if (data.msg == "already-exist") {
                        handleState("msg", "This user already exist");
                        handleState("msgType", "error");
                    }
                    handleState("loading", false);
                })
                .catch(() => {
                    handleState("loading", false);
                    handleState("msgType", "error");
                    handleState(
                        "msg",
                        "Oops, an error occured!, check internet connection"
                    );
                });
        }
    };

    const signin = async () => {
        if ([email, pwd].includes("")) {
            handleState("msg", "All fields are required!");
            handleState("msgType", "error");
        } else {
            handleState("loading", true);
            signinAPI({ email, pwd })
                .then((res) => {
                    const data = res.data;
                    if (data.msg == "found") {
                        handleState("msg", "Access granted!");
                        handleState("msgType", "success");
                        save("login-id", JSON.stringify(data._id));
                        const lastVisit = get("prev-url");
                        console.log(lastVisit)
                        if (
                            lastVisit !== "" ||
                            lastVisit !== undefined ||
                            lastVisit !== null
                        ) {
                            router.replace(lastVisit);
                        } else {
                            router.push("/home");
                        };
                    } else if (data.msg == "not-found") {
                        handleState("msg", "Account does not exist!, Sign up!");
                        handleState("msgType", "error");
                    } else if (data?.msg == "wrong-data") {
                        handleState("msg", "Wrong email/password");
                        handleState("msgType", "error");
                    }
                    handleState("loading", false);
                })
                .catch((err) => {
                    console.log(err);

                    handleState("loading", false);
                    handleState("msgType", "error");
                    handleState(
                        "msg",
                        "Oops, an error occured!, check internet connection"
                    );
                });
        }
    };

    const recover = async () => {
        if ([email, pwd].includes("")) {
            handleState("msg", "All fields are required!");
            handleState("msgType", "error");
        } else {
            handleState("loading", true);
            recoverAPI({ email, pwd })
                .then((res) => {
                    const data = res.data;
                    if (data.msg == "recovered") {
                        handleState("msg", "Account Recovered");
                        handleState("msgType", "success");
                        router.push("signin");
                    } else if (data.msg == "not-found") {
                        handleState("msg", "Account does not exist!, Sign up!");
                        handleState("msgType", "error");
                    }
                    handleState("loading", false);
                })
                .catch((err) => {
                    console.log(err);
                    handleState("loading", false);
                    handleState("msgType", "error");
                    handleState(
                        "msg",
                        "Oops, an error occured!, check internet connection"
                    );
                });
        }
    };

    const logout = () => {
        save("login-data", "");
        save("prev-url", window.location.href);
        router.push("/signin");
        dispatch(clearUserData());

    };

    return {
        signup,
        msg,
        msgType,
        handleState,
        loading,
        email,
        username,
        pwd,
        signin,
        recover,
        authenticate,
        logout,
    };
};
