import React, { useContext, useState } from 'react';
import group from "../../images/group.png";
import { Avatar, CircularProgress } from '@mui/material';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser } from '../../api/userAPI';
import { toast } from 'react-toastify';
import { AdminContext } from '../../App';

const AddUser = () => {
  const { state } = useContext(AdminContext)
  // console.log("create user state", state)
  const location = useLocation();
  const navigate = useNavigate();
  const [btnLoading, setbtnLoading] = useState(false);

  const [showPermission, setshowPermission] = useState(false)
  const [modulePermissionState, setmodulePermissionState] = useState(['SFA', 'DMS', 'Lead Management', 'Demo Control']);
  const [permissionState, setpermissionState] = useState(['Edit Company', 'Delete Company', 'View Listing', 'View Password', 'Create Plan', 'View Plan', 'Create Company', 'Create User']);
  const [actionPermissionState, setactionPermissionState] = useState(['Increase User', 'Non Billed', 'Grace Period'])

  const [profilePic, setprofilePic] = useState(location.state?.image);
  const [demoProfilePic, setdemoProfilePic] = useState();
  const [userPermissions, setuserPermissions] = useState([]);

  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    permissions: [],
  })

  const [error, seterror] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  })

  const handleInput = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const addPicFunc = async (e) => {
    let file = e.target.files[0];
    setprofilePic(file);
    setdemoProfilePic(URL.createObjectURL(file));
  };

  const togglePermissionFunc = (e, p) => {
    if (e.target.checked == false) {
      setuserPermissions(userPermissions.filter(x => x !== p));
    } else {
      setuserPermissions([...userPermissions, p])
    }
  }

  const addUserFunc = async () => {
    if (!state?.result?.permissions?.includes("Create User")) return toast.error("Permission required from super admin!")

    let err = false;
    if (user.first_name === "") { seterror((prev) => ({ ...prev, first_name: "First name is required!" })); err = true; }
    else { seterror((prev) => ({ ...prev, first_name: "" })); }
    if (user.last_name === "") { seterror((prev) => ({ ...prev, last_name: "Last name is required!" })); err = true; }
    else { seterror((prev) => ({ ...prev, last_name: "" })); }
    if (user.phone_number === "") { seterror((prev) => ({ ...prev, phone_number: "Mobile number is required!" })); err = true; }
    else { seterror((prev) => ({ ...prev, phone_number: "" })); }
    if (user.email === "") { seterror((prev) => ({ ...prev, email: "Email is required!" })); err = true; }
    else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(user.email)) { seterror((prev) => ({ ...prev, email: "Invalid email!" })); err = true; }
    else { seterror((prev) => ({ ...prev, email: "" })); }
    if (user.password === "") { seterror((prev) => ({ ...prev, password: "Password is required!" })); err = true; }
    else { seterror((prev) => ({ ...prev, password: "" })); }
    if (err) return;

    setbtnLoading(true)
    let { data } = await addUser({ ...user, permissions: userPermissions, image: profilePic })
    if (data.status) {
      navigate("/user")
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
    setbtnLoading(false)
  }

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
              src={demoProfilePic || profilePic}
              style={{ height: "9rem", width: "9rem" }}
            // onClick={handleClick}
            />
            <label>
              <CameraAltIcon className="camera_icon" />
              <input
                type="file"
                onChange={addPicFunc}
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
              onChange={handleInput}
            />
            <div>
              {error.first_name.length !== 0 && (
                <div className="input_error" >{error.first_name}</div>
              )}
            </div>
          </div>
          <div className="input_group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleInput}
            />
            <div>
              {error.last_name.length !== 0 && (
                <div className="input_error" >{error.last_name}</div>
              )}
            </div>
          </div>
          <div className="input_group">
            <label>Mobile number</label>
            <input
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={(e) => {
                if (isNaN(e.target.value)) return;
                if (e.target.value.length > 10) return;
                handleInput(e)
              }}
            />
            <div>
              {error.phone_number.length !== 0 && (
                <div className="input_error" >{error.phone_number}</div>
              )}
            </div>
          </div>
          <div className="input_group">
            <label>Email Id</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
            />
            <div>
              {error.email.length !== 0 && (
                <div className="input_error" >{error.email}</div>
              )}
            </div>
          </div>
          <div className="input_group">
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={handleInput}
            />
            <div>
              {error.password.length !== 0 && (
                <div className="input_error" >{error.password}</div>
              )}
            </div>
          </div>
          <div className="input_group"  >
            <label>Premissions</label>
            <input
              type="text"
              name="permission"
              // value={user.password}
              // onChange={handleInput}
              style={{ caretColor: "transparent" }}
              onClick={() => setshowPermission(!showPermission)}
            />
            {showPermission && (
              <div className="cardpopup_content_add_user">
                <div className="permission_heading">Module (Permissions)</div>
                <hr />
                <div className="permission_line">
                  {modulePermissionState.map(p => (
                    <label >
                      <span>{p}</span>
                      <input type="checkbox" checked={userPermissions?.includes(p)} onChange={(e) => togglePermissionFunc(e, p)} />
                    </label>
                  ))}
                </div>
                <hr />
                <div className="permission_heading">Permissions</div>
                <hr />
                <div className="permission_line">
                  {permissionState.map(p => (
                    <label >
                      <span>{p}</span>
                      <input type="checkbox" checked={userPermissions?.includes(p)} onChange={(e) => togglePermissionFunc(e, p)} />
                    </label>
                  ))}
                </div>
                <hr />
                <div className="permission_heading">Action</div>
                <hr />
                <div className="permission_line">
                  {actionPermissionState.map(p => (
                    <label >
                      <span>{p}</span>
                      <input type="checkbox" checked={userPermissions?.includes(p)} onChange={(e) => togglePermissionFunc(e, p)} />
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div>
              {/* {error.password.length !== 0 && (
                <div className="input_error" >{error.password}</div>
              )} */}
            </div>
          </div>
        </div>
        <div className="btn changepass_btn" onClick={() => !btnLoading && addUserFunc()} >
          {btnLoading ? <CircularProgress style={{ color: "#fff" }} /> : "ADD USER"}
        </div>
      </div>
    </>
  )
}

export default AddUser