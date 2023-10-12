import "./auth.css";
import React from 'react'
import logo from "../../images/logo.png";

const Login = () => {
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
                            <input type="text" name="" placeholder="Enter your email" />
                        </div>
                        <div className="input_group">
                            <label htmlFor="">Password</label>
                            <input type="text" name="" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div className="forgot_div">forget password?</div>
                    <div className="auth_btn">Login</div>
                </div>
            </div>
        </div>
    )
}

export default Login