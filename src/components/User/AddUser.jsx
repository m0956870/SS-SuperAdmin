import React, { useState } from 'react';
import group from "../../images/group.png";
import { Avatar } from '@mui/material';
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const AddUser = () => {
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    permissions: [],
  })

  return (
    <>
      {/* <div className="beat_heading">
        <div className="beat_left">
          <div className="icon">
            <img src={group} alt="icon" />
          </div>
          <div className="title">Add User</div>
        </div>
      </div> */}
      <div className="add_user_section">
        <div className="profile_details" style={{ marginTop: "1rem" }}>
          <div className="avatar">
            <Avatar
              alt="Profile Pic"
              // src={demoProfilePic || profilePic}
              style={{ height: "9rem", width: "9rem" }}
            // onClick={handleClick}
            />
            <label>
              <CameraAltIcon className="camera_icon" />
              <input
                type="file"
                // onChange={addEmployeePic}
                name="myfile"
                accept="image/*"
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="input_container add_user_imput_container" >
          <div className="input_group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
            // onChange={handleInput}
            />
            <div>
              {/* {error.email.length !== 0 && (
                <div className="input_error" >{error.email}</div>
              )} */}
            </div>
          </div>
          <div className="input_group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
            // onChange={handleInput}
            />
            <div>
              {/* {error.password.length !== 0 && (
                <div className="input_error" >{error.password}</div>
              )} */}
            </div>
          </div>
          <div className="input_group">
            <label>Mobile number</label>
            <input
              type="text"
              name="phone_number"
              value={user.phone_number}
            // onChange={handleInput}
            />
            <div>
              {/* {error.email.length !== 0 && (
                <div className="input_error" >{error.email}</div>
              )} */}
            </div>
          </div>
          <div className="input_group">
            <label>Email Id</label>
            <input
              type="text"
              name="email"
              value={user.email}
            // onChange={handleInput}
            />
            <div>
              {/* {error.password.length !== 0 && (
                <div className="input_error" >{error.password}</div>
              )} */}
            </div>
          </div>
          <div className="input_group">
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={user.password}
            // onChange={handleInput}
            />
            <div>
              {/* {error.email.length !== 0 && (
                <div className="input_error" >{error.email}</div>
              )} */}
            </div>
          </div>
          <div className="input_group">
            <label>Premissions</label>
            <input
              type="text"
              name="password"
            // value={user.password}
            // onChange={handleInput}
            />
            <div>
              {/* {error.password.length !== 0 && (
                <div className="input_error" >{error.password}</div>
              )} */}
            </div>
          </div>
        </div>
        <div class="btn changepass_btn">ADD USER</div>
      </div>
    </>
  )
}

export default AddUser