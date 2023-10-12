import "./auth.css";
import React from 'react'
import logo from "../../images/logo.png";

const ForgetPassword = () => {
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
          <div className="forgot_headline">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </div>
          <div className="input_container">
            <div className="input_group">
              <label htmlFor="">Email</label>
              <input type="text" name="" placeholder="Enter your email" />
            </div>
          </div>
          <div className="auth_btn">SAVE</div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword