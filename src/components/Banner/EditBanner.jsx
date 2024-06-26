import React, { useContext, useEffect, useState } from 'react';
import group from "../../images/group.png";
import { Avatar, CircularProgress } from '@mui/material';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminContext } from '../../App';
import { addBanner, editBanner } from '../../api/bannerAPI';

const EditBanner = () => {
    const { state } = useContext(AdminContext);
    // console.log("edit banner state", state)
    const location = useLocation();
    console.log("edit banner location", location)
    const navigate = useNavigate();
    const [btnLoading, setbtnLoading] = useState(false);

    const [profilePic, setprofilePic] = useState();
    const [demoProfilePic, setdemoProfilePic] = useState();
    const [user, setuser] = useState({
        banner_name: "",
        category_name: "",
        logo_position: "top-left",
        size: "",
    })

    const [error, seterror] = useState({
        banner_name: "",
        category_name: "",
        logo_position: "",
        size: "",
    })

    useEffect(() => {
        setuser({
            id: location.state._id,
            banner_name: location.state.banner_name,
            category_name: location.state.category_name,
            logo_position: location.state.logo_position,
            size: location.state.size,
        })
        setdemoProfilePic(location.state.banner_image)
    }, [])

    const handleInput = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    };

    const addPicFunc = async (e) => {
        let file = e.target.files[0];
        setprofilePic(file);
        setdemoProfilePic(URL.createObjectURL(file));
    };

    const addBannerFunc = async () => {
        // if (!state?.result?.permissions?.includes("Create User")) return toast.error("Permission required from super admin!")

        let err = false;
        if (user.banner_name === "") { seterror((prev) => ({ ...prev, banner_name: "Banner name is required!" })); err = true; }
        else { seterror((prev) => ({ ...prev, banner_name: "" })); }
        if (user.category_name === "") { seterror((prev) => ({ ...prev, category_name: "Category name is required!" })); err = true; }
        else { seterror((prev) => ({ ...prev, category_name: "" })); }
        if (user.logo_position === "") { seterror((prev) => ({ ...prev, logo_position: "Logo position is required!" })); err = true; }
        else { seterror((prev) => ({ ...prev, logo_position: "" })); }
        // if (!profilePic) return toast.error("Image is required!")
        if (err) return;

        if (profilePic) {
            let sizeArr = user.size.split(":")
            let img = new Image()
            img.src = URL.createObjectURL(profilePic)
            img.onload = async () => {
                let ratio = sizeArr[0] / sizeArr[1];
                let minExpRatio = (img.width / img.height * 10 | 0) / 10;
                let maxExpRatio = (img.width / img.height).toFixed(1);
                if (ratio >= minExpRatio && ratio <= maxExpRatio) {
                    setbtnLoading(true)
                    let { data } = await editBanner({ ...user, profilePic })
                    if (data.status) {
                        navigate("/banner")
                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                    setbtnLoading(false)
                } else {
                    setbtnLoading(false)
                    return toast.error(`Invalid image ratio! optimal ratio is ${user.size}`);
                }
            }
        } else {
            setbtnLoading(true)
            let { data } = await editBanner({ ...user, profilePic })
            if (data.status) {
                navigate("/banner")
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
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
                        <label>Banner Name</label>
                        <input
                            type="text"
                            name="banner_name"
                            value={user.banner_name}
                            onChange={handleInput}
                        />
                        <div>
                            {error.banner_name.length !== 0 && (
                                <div className="input_error" >{error.banner_name}</div>
                            )}
                        </div>
                    </div>
                    <div className="input_group">
                        <label>Category Name</label>
                        <input
                            type="text"
                            name="category_name"
                            value={user.category_name}
                            onChange={handleInput}
                        />
                        <div>
                            {error.category_name.length !== 0 && (
                                <div className="input_error" >{error.category_name}</div>
                            )}
                        </div>
                    </div>
                    <div className="input_group">
                        <label>Logo Position</label>
                        <select name="logo_position" className='select' value={user.logo_position} onChange={handleInput} >
                            <option value="top-left">Top-Left</option>
                            <option value="top-right">Top-Right</option>
                            <option value="bottom-left">Bottom-Left</option>
                            <option value="bottom-left">Bottom-Left</option>
                        </select>
                        {/* <input
                            type="text"
                            name="logo_position"
                            value={user.logo_position}
                            onChange={handleInput}
                            /> */}
                        <div>
                            {error.logo_position.length !== 0 && (
                                <div className="input_error" >{error.logo_position}</div>
                            )}
                        </div>
                    </div>
                    <div className="input_group">
                        <label>Size</label>
                        <select name="size" className='select' value={user.size} onChange={handleInput} >
                            <option value="1.91:1">Facebook (1.91:1)</option>
                            <option value="1:1">Instagram (1:1)</option>
                            <option value="16:9">Banner (16:9)</option>
                        </select>
                        <div>
                            {error.size.length !== 0 && (
                                <div className="input_error" >{error.size}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="btn changepass_btn" onClick={() => !btnLoading && addBannerFunc()} >
                    {btnLoading ? <CircularProgress style={{ color: "#fff" }} /> : "EDIT BANNER"}
                </div>
            </div>
        </>
    )
}

export default EditBanner