import React, { useEffect, useState } from 'react';
import group from "../../images/group.png";
import { useLocation } from 'react-router-dom';
import { GoPlus } from "react-icons/go"
import { CircularProgress } from '@mui/material';
import { getCompanyListing, updateProfile } from '../../api/companyAPI';
import { toast } from 'react-toastify';
import getStateFunc from '../../api/locationAPI';

const Action = () => {
    const [btnLoading, setbtnLoading] = useState(false);
    const { state: location } = useLocation();
    // console.log("location", location)

    const [allState, setallState] = useState([]);
    const [companyListing, setcompanyListing] = useState();
    const [selectedCompany, setselectedCompany] = useState();
    const [selectedModule, setselectedModule] = useState();

    const [increaseUserCount, setincreaseUserCount] = useState(10);
    const [gracePeriodCount, setgracePeriodCount] = useState(10);
    const [trackingTime, settrackingTime] = useState()
    const [billed, setbilled] = useState();

    const [totalUsers, settotalUsers] = useState();
    const [renewalDate, setrenewalDate] = useState();

    useEffect(() => {
        getCompanyListing().then(res => setcompanyListing(res.data.data));
        getStateFunc().then((res) => setallState(res.data.result));
    }, [])

    const stateHandleInput = (e) => {
        getCompanyListing({ state: e.target.value }).then(res => setcompanyListing(res.data.data))
    }

    const handleInput = (e, type, count) => {
        if (count) {
            if (type === "total_user") {
                if (!totalUsers) return;
                setincreaseUserCount(Number(increaseUserCount) + 1)
                settotalUsers(Number(increaseUserCount) + 1)
                return;
            }
            else if (type === "grace_period") {
                if (!renewalDate) return;
                setgracePeriodCount(Number(gracePeriodCount) + 1)
                let oldDate = new Date(renewalDate)
                let addedDate = new Date(oldDate.setDate(oldDate.getDate() + Number(1)))
                setrenewalDate(addedDate.toLocaleDateString())
                return;
            }
        }

        if (type === "total_user") {
            if (isNaN(e.target.value.trim())) return;
            setincreaseUserCount(e.target.value)
            settotalUsers(Number(totalUsers) + Number(e.target.value))
        } else if (type === "grace_period") {
            if (isNaN(e.target.value.trim())) return;
            setgracePeriodCount(e.target.value)
            let oldDate = new Date(renewalDate)
            let addedDate = new Date(oldDate.setDate(oldDate.getDate() + Number(e.target.value)))
            setrenewalDate(addedDate.toLocaleDateString())
        } else if (type === "tracking_time") {
            settrackingTime(e.target.value)
        } else if (type === "billed") {
            setbilled(!billed)
        }
    }

    const saveSettingFunc = async () => {
        if(!selectedCompany) return toast.error("Please select company first!");

        let tempObj = {};
        tempObj.id = location.company._id;
        tempObj.tracking_time = trackingTime
        tempObj[location.planType] = location.company[location.planType];
        tempObj[location.planType].billed = billed
        tempObj[location.planType].userCount = totalUsers
        tempObj[location.planType].endDate = renewalDate
        console.log(tempObj);

        setbtnLoading(true)
        let { data } = await updateProfile(tempObj);
        if (data.status) {
            toast.success("Company setting updated successfully.")
        } else {
            console.log("some error")
        }
        setbtnLoading(false)
    }

    function formateDate(date) {
        let arr = date?.split("/");
        return !arr ? "" : `${arr[1]}-${arr[0]}-${arr[2]}`;
    }

    return (
        <div>
            <div className="beat_heading">
                <div className="beat_left">
                    <div className="icon">
                        <img src={group} alt="icon" />
                    </div>
                    <div className="title">Action Page</div>
                </div>
                <div className="beat_right"></div>
            </div>

            <div class="tracking_tabs">
                <div className="tarcking_tab_left">
                    <select onChange={stateHandleInput}>
                        <option value="">Select State</option>
                        {allState?.map((state) => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setselectedCompany(e.target.value)}>
                        <option value="">Select Company</option>
                        {companyListing?.map((company) => (
                            <option key={company._id} value={company._id}>{company.company_name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setselectedModule(e.target.value)}>
                        <option value="">Selecte Module</option>
                        <option value="sfa">SFA</option>
                        <option value="dms">DMS</option>
                        <option value="lead_management">Lead Management</option>
                    </select>
                    <div className="view_btn" /* onClick={() => fetchAllBeatFunc(filterData)}*/ >
                        View
                    </div>
                </div>
            </div>

            <div className="action_tab_section">
                <div className="tab_container">
                    <div className="action_tab_left">
                        <div className="action_title">Increase Users</div>
                        <div className="action_input">
                            <input
                                type="text"
                                value={increaseUserCount}
                                onChange={(e) => handleInput(e, "total_user")}
                                placeholder="0"
                            />
                            <span className="plus_icon" >
                                <GoPlus onClick={(e) => handleInput(e, "total_user", 1)} />
                            </span>
                        </div>
                    </div>
                    <div className="action_tab_right">Total Users : {totalUsers}</div>
                </div>
                <div className="tab_container">
                    <div className="action_tab_left">
                        <div className="action_title">Grace Period</div>
                        <div className="action_input">
                            <input
                                type="text"
                                value={gracePeriodCount}
                                onChange={(e) => handleInput(e, "grace_period")}
                                placeholder="0"
                            />
                            <span className="plus_icon" >
                                <GoPlus onClick={(e) => handleInput(e, "grace_period", 1)} />
                            </span>
                        </div>
                    </div>
                    <div className="action_tab_right">Renewal Date : {formateDate(renewalDate)}</div>
                </div>
                <div className="tab_container">
                    <div className="action_tab_left">
                        <div className="action_title">Tracking Time</div>
                        <div className="action_input">
                            <select value={trackingTime} onChange={(e) => handleInput(e, "tracking_time")} style={{ width: "8.5rem" }} >
                                <option value="5">5 min</option>
                                <option value="10">10 min</option>
                                <option value="15">15 min</option>
                                <option value="20">20 min</option>
                                <option value="25">25 min</option>
                                <option value="30">30 min</option>
                            </select>
                            {/* <span className="plus_icon" >
                                <GoPlus onClick={(e) => handleInput(e, "grace_period", 1)} />
                            </span> */}
                        </div>
                    </div>
                    <div className="action_tab_right">Tracking Time : {trackingTime && `${trackingTime} Minutes`}</div>
                </div>
                <div className="tab_container">
                    <div className="action_tab_left">
                        <div className="action_title" style={{ backgroundColor: "#fff", color: "var(--main-color)" }} >Action</div>
                        <div onClick={() => handleInput("11", "billed")} className="action_title billed_btn" style={{ backgroundColor: billed && "#fff", color: billed && "var(--main-color)" }} >Non-Billed</div>
                    </div>
                    <div className="action_tab_right">{billed ? "Billed" : "Non-Billed"}</div>
                </div>

                {/* bnt */}
                <div className="btn changepass_btn" onClick={() => !btnLoading && saveSettingFunc()} >
                    {btnLoading ? <CircularProgress style={{ color: "#fff" }} /> : "SAVE"}
                </div>
            </div>
        </div>
    )
}

export default Action