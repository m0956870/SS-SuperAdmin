import "./auth.css";
import React from 'react'
import logo from "../../images/logo.png";

const ResetPassword = () => {
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
                    <div className="right_container_heading">Reset Password</div>
                    <div className="input_container">
                        <div className="input_group">
                            <label htmlFor="">New Password</label>
                            <input type="text" name="" placeholder="Enter new password" />
                        </div>
                        <div className="input_group">
                            <label htmlFor="">Confirm Password</label>
                            <input type="text" name="" placeholder="Enter confirm password" />
                        </div>
                    </div>
                    <div className="forgot_div">forget password?</div>
                    <div className="auth_btn">SAVE</div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword