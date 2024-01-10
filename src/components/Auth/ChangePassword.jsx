import React, { useContext, useEffect, useState } from "react";
import group from "../../images/group.png";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { blankValidator } from "../../utils/Validation";
import { getBaseUrl } from "../../utils/baseUrl";
import { updateUser } from "../../api/userAPI";
import { AdminContext } from "../../App";

const ChangePassword = () => {
    const { state } = useContext(AdminContext);
    // console.log("state", state)
    const navigate = useNavigate();
    const [btnLoading, setbtnLoading] = useState(false);

    const [showPass, setShowPass] = useState({
        opass: false,
        pass: false,
        cpass: false,
    });

    const [user, setUser] = useState({
        oldPassword: "",
        newPassword: "",
        cPassword: "",
    });

    const [error, setError] = useState({
        oldPassword: { status: false, },
        newPassword: { status: false, },
        shortpassword: { status: false, },
        cPassword: { status: false, },
        cPasswordMatch: { status: false, },
    });

    useEffect(() => {
        setUser({
            oldPassword: "",
            newPassword: "",
            cPassword: "",
        })
    }, [])


    const handleInput = (e) => {
        setError({
            oldPassword: { status: false, },
            newPassword: { status: false, },
            shortpassword: { status: false, },
            cPassword: { status: false, },
            cPasswordMatch: { status: false, },
        });
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const changePassFunc = async () => {
        if (!blankValidator(user.oldPassword)) return setError({ ...error, oldPassword: { status: true } });
        if (!blankValidator(user.newPassword)) return setError({ ...error, newPassword: { status: true, }, });
        if (user.newPassword.length < 6) return setError({ ...error, shortpassword: { status: true, }, });
        if (!blankValidator(user.cPassword)) return setError({ ...error, cPassword: { status: true, }, });
        if (user.newPassword !== user.cPassword) return setError({ ...error, cPasswordMatch: { status: true, }, });

        let tempData = { _id: state.result._id, oldPassword: user.oldPassword, password: user.newPassword, };
        setbtnLoading(true);
        let { data } = await updateUser(tempData, "password");
        if (data.status) {
            toast.success("Password Updated Successfully!");
            setUser({ oldPassword: "", newPassword: "", cPassword: "", })
        } else {
            toast.error(data.message);
        }
        setbtnLoading(false);
    };

    return (
        <div className="">
            <div className="beat_heading">
                <div className="beat_left">
                    <div className="icon">
                        <img src={group} alt="icon" />
                    </div>
                    <div className="title">Change Password</div>
                </div>
                <div className="beat_right">
                </div>
            </div>
            <div className="changepass_container">
                <div className="changepass_form">
                    <div className="cp_parent">
                        <input
                            type={showPass.opass ? "text" : "password"}
                            name="oldPassword"
                            value={user.oldPassword}
                            onChange={handleInput}
                            placeholder="Current Password"
                            autoComplete="off"
                        />
                        <span className="pass_icon_cp">
                            {showPass.opass ? (
                                <BsFillEyeSlashFill
                                    style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                    onClick={() => setShowPass({ ...showPass, opass: false })}
                                />
                            ) : (
                                <FaEye
                                    style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                    onClick={() => setShowPass({ ...showPass, opass: true })}
                                />
                            )}
                        </span>
                    </div>
                    {error.oldPassword.status && (
                        <p style={{ width: "99%", color: "red" }}>Enter Old Password</p>
                    )}
                    <div className="cp_parent">
                        <input
                            type={showPass.pass ? "text" : "password"}
                            name="newPassword"
                            value={user.newPassword}
                            onChange={handleInput}
                            placeholder="New Password"
                        />
                        <span className="pass_icon_cp">
                            {showPass.pass ? (
                                <BsFillEyeSlashFill
                                    style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                    onClick={() => setShowPass({ ...showPass, pass: false })}
                                />
                            ) : (
                                <FaEye
                                    style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                    onClick={() => setShowPass({ ...showPass, pass: true })}
                                />
                            )}
                        </span>
                    </div>
                    {error.newPassword.status && (
                        <p style={{ width: "99%", color: "red" }}>Enter New Password</p>
                    )}
                    {error.shortpassword.status && (
                        <p style={{ width: "99%", color: "red" }}>
                            Password length should be 6
                        </p>
                    )}
                    <div className="cp_parent">
                        <input
                            type={showPass.cpass ? "text" : "password"}
                            name="cPassword"
                            value={user.cPassword}
                            onChange={handleInput}
                            placeholder="Confirm Password"
                        />
                        <span className="pass_icon_cp">
                            {showPass.cpass ? (
                                <BsFillEyeSlashFill
                                    style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                    onClick={() => setShowPass({ ...showPass, cpass: false })}
                                />
                            ) : (
                                <FaEye
                                    style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                    onClick={() => setShowPass({ ...showPass, cpass: true })}
                                />
                            )}
                        </span>
                    </div>

                    {error.cPassword.status && (
                        <p style={{ width: "99%", color: "red" }}>Enter Confirm Password</p>
                    )}
                    {error.cPasswordMatch.status && (
                        <p style={{ width: "99%", color: "red" }}>Password Didn't Match</p>
                    )}

                    <div className="btn changepass_btn" onClick={() => changePassFunc()}>
                        {btnLoading ? (
                            <CircularProgress style={{ color: "#fff" }} size={26} />
                        ) : (
                            "SUBMIT"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
