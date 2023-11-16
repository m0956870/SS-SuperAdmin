import React, { useEffect, useState } from "react";
import group from "../../images/group.png";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { blankValidator } from "../../utils/Validation";
import { addPlan, editPlan } from "../../api/planAPI";

const EditPlan = () => {
    const location = useLocation();
    // console.log("location", location.state)
    const navigate = useNavigate();
    const [btnLoading, setbtnLoading] = useState(false);

    const [plan, setplan] = useState({
        plan_name: "",
        cost_per_user_per_month: "",
        billing_frequency: "",
        discount: "",
        minimum_user: "",
        features: "",
    });

    const [error, seterror] = useState({
        // plan_name: "",
        cost_per_user_per_month: "",
        discount: "",
        minimum_user: "",
        // features: "",
    });

    useEffect(() => {
        setplan({
            plan_name: location.state.plan_name,
            cost_per_user_per_month: location.state.cost_per_user_per_month,
            billing_frequency: location.state.billing_frequency,
            discount: location.state.discount,
            minimum_user: location.state.minimum_user,
            features: location.state.features,
        })
    }, [])

    const handleInput = (e) => {
        setplan({ ...plan, [e.target.name]: e.target.value });
    };

    const editPlanFunc = async () => {
        let err = false;
        // if (plan.plan_name === "") { seterror((prev) => ({ ...prev, plan_name: "Plan name is required!" })); err = true; }
        // else { seterror((prev) => ({ ...prev, plan_name: "" })); }
        if (plan.cost_per_user_per_month === "") { seterror((prev) => ({ ...prev, cost_per_user_per_month: "Cost per month is required!" })); err = true; }
        else { seterror((prev) => ({ ...prev, cost_per_user_per_month: "" })); }
        if (plan.discount === "") { seterror((prev) => ({ ...prev, discount: "discount is required!" })); err = true; }
        else { seterror((prev) => ({ ...prev, discount: "" })); }
        if (plan.minimum_user === "") { seterror((prev) => ({ ...prev, minimum_user: "Minimum user is required!" })); err = true; }
        else { seterror((prev) => ({ ...prev, minimum_user: "" })); }
        // if (plan.features === "") { seterror((prev) => ({ ...prev, features: "Password is required!" })); err = true; }
        // else { seterror((prev) => ({ ...prev, features: "" })); }
        if (err) return;

        setbtnLoading(true)
        let { data } = await editPlan({ ...plan, id: location.state._id })
        if (data.status) {
            navigate("/plan")
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
        setbtnLoading(false)
    }

    return (
        <div className="container">
            <div className="beat_heading">
                <div className="beat_left">
                    <div className="icon">
                        <img src={group} alt="icon" />
                    </div>
                    <div className="title">Add Plan</div>
                </div>
            </div>

            <div className="addbeat_container">
                <div className="addbeat_form">
                    <div className="addbeat_left">
                        <select name="plan_name" value={plan.plan_name} onChange={handleInput} >
                            <option value="sfa">SFA</option>
                            <option value="dms">DMS</option>
                            <option value="lead management">Lead Management</option>
                        </select>
                        {/* {error.plan_name.length !== 0 && (
                            <div className="input_error" >{error.plan_name}</div>
                        )} */}
                        <select name="billing_frequency" value={plan.billing_frequency} onChange={handleInput} >
                            <option value="monthly">Monthly</option>
                            <option value="annually">Annually</option>
                        </select>
                        <input
                            type="text"
                            name="minimum_user"
                            value={plan.minimum_user}
                            onChange={(e) => {
                                if (isNaN(e.target.value)) return;
                                handleInput(e)
                            }}
                            placeholder="Minimum User"
                        />
                        {error.minimum_user.length !== 0 && (
                            <div className="input_error" >{error.minimum_user}</div>
                        )}
                    </div>

                    <div className="addbeat_right">
                        <input
                            type="text"
                            name="cost_per_user_per_month"
                            value={plan.cost_per_user_per_month}
                            onChange={(e) => {
                                if (isNaN(e.target.value)) return;
                                handleInput(e)
                            }}
                            placeholder="Cost per user per month"
                        />
                        {error.cost_per_user_per_month.length !== 0 && (
                            <div className="input_error" >{error.cost_per_user_per_month}</div>
                        )}
                        <input
                            type="text"
                            name="discount"
                            value={plan.discount}
                            onChange={(e) => {
                                if (isNaN(e.target.value)) return;
                                if (Number(e.target.value) > 100) return;
                                handleInput(e)
                            }}
                            placeholder="Discount"
                        />
                        {error.discount.length !== 0 && (
                            <div className="input_error" >{error.discount}</div>
                        )}
                        <select name="features" value={plan.features} onChange={handleInput}>
                            <option value="basic">Basic</option>
                            {plan.plan_name === "sfa" && (
                                <>
                                    <option value="standard">Standard</option>
                                    <option value="premium">Premium</option>
                                </>
                            )}
                        </select>
                        {/* {error.features.length !== 0 && (
                            <div className="input_error" >{error.features}</div>
                        )} */}
                    </div>
                </div>
                <div onClick={() => !btnLoading && editPlanFunc()} className="btn changepass_btn">
                    {btnLoading ? (
                        <CircularProgress style={{ color: "#fff" }} size={26} />
                    ) : (
                        "SAVE"
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPlan;
