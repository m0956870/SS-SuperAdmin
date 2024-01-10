import React, { useContext, useEffect, useState } from 'react';
import { Avatar, CircularProgress } from '@mui/material';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser } from '../../api/userAPI';
import { toast } from 'react-toastify';
import { AdminContext } from '../../App';
import { updateProfile } from '../../api/auth';

const Profile = () => {
    const { state, dispatch } = useContext(AdminContext)
    // console.log("profile state", state)
    const location = useLocation();
    const navigate = useNavigate();
    const [btnLoading, setbtnLoading] = useState(false);

    const [profilePic, setprofilePic] = useState(location.state?.image);
    const [demoProfilePic, setdemoProfilePic] = useState();

    const [user, setuser] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
    })

    useEffect(() => {
        if (state) {
            let { result: user } = state
            setuser({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                email: user.email,
            })
        }
    }, [])
    // console.log("user", user)


    const handleInput = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    };

    const addPicFunc = async (e) => {
        let file = e.target.files[0];
        setprofilePic(file);
        setdemoProfilePic(URL.createObjectURL(file));
    };

    const editProfileFunc = async () => {
        setbtnLoading(true)
        let { data } = await updateProfile(user)
        if (data.status) {
            dispatch({ type: "ADMIN", payload: { result: data.data } })
            navigate("/dashboard")
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
                    </div>
                    <div className="input_group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleInput}
                        />
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
                    </div>
                    <div className="input_group">
                        <label>Email Id</label>
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="btn changepass_btn" onClick={() => !btnLoading && editProfileFunc()} >
                    {btnLoading ? <CircularProgress style={{ color: "#fff" }} /> : "UPDATE"}
                </div>
            </div>
        </>
    )
}

export default Profile