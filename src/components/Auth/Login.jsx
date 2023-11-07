import "./auth.css";
import React, { useContext, useState } from 'react'
import logo from "../../images/logo.png";
import { CircularProgress } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { userLogin } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../App";

const Login = () => {
    const navigate = useNavigate()
    const [btnLoading, setbtnLoading] = useState(false);

    const [user, setuser] = useState({
        email: "",
        password: "",
    })
    const [error, seterror] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const loginFunc = async () => {
        let err = false;
        if (user.email === "") {
            seterror((prev) => { return { ...prev, email: "Email is required!" } });
            err = true;
        } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(user.email)) {
            seterror((prev) => ({ ...prev, email: "Invalid email!" }))
            err = true;
        } else seterror((prev) => ({ ...prev, email: "" }));

        if (user.password === "") {
            seterror((prev) => { return { ...prev, password: "Password is required!" } });
            err = true;
        } else seterror((prev) => ({ ...prev, password: "" }))

        if (err) return;
        setbtnLoading(true)
        let { data } = await userLogin(user)
        if(data.status){
            navigate("/")
            toast.success(data.message)
            localStorage.setItem("ss_token", data.data.token);
            localStorage.setItem("ss_auth", true);
        } else {
            toast.error(data.message)
        }
        setbtnLoading(false)
    }

    return (
        <div id="login_container">
            <div className="sa_left">
                <div className="sa_logo">
                    <img src={logo} alt="salesparrow" />
                </div>
            </div>

            <div className="ss_right">
                <div className="top_help">Need Help?</div>
                <div className="login_main_container">
                    <div className="right_container_heading">Log In</div>
                    <div className="input_container">
                        <div className="input_group">
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                placeholder="Enter your email"
                            />
                            <div>
                                {error.email.length !== 0 && (
                                    <div className="input_error" >{error.email}</div>
                                )}
                            </div>
                        </div>
                        <div className="input_group">
                            <label htmlFor="">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleInput}
                                placeholder="Enter your password"
                            />
                            <span className="pass_icon">
                                {showPassword ? (
                                    <BsFillEyeSlashFill
                                        style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                        onClick={() => setShowPassword(false)}
                                    />
                                ) : (
                                    <FaEye
                                        style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                        onClick={() => setShowPassword(true)}
                                    />
                                )}
                            </span>
                            <div>
                                {error.password.length !== 0 && (
                                    <div className="input_error" >{error.password}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="forgot_div">forget password?</div>
                    <div className="auth_btn" onClick={() => !btnLoading && loginFunc()} >
                        {btnLoading ? <CircularProgress style={{ color: "#fff" }} /> : "Login"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login