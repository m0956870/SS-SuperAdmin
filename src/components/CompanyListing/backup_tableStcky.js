import "../../App.css"
import React, { useContext, useEffect, useState } from 'react'
import group from "../../images/group.png";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import { MdOutlineSettings } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { BsFillEyeSlashFill } from "react-icons/bs";

import { useRef } from "react";
import { BsFilterLeft } from "react-icons/bs"
import { saveToPdf } from "../../utils/saveToPdf";
import xlsx from "json-as-xlsx";
import { AdminContext } from "../../App";
import { deleteCompany, getCompany } from "../../api/companyAPI";
import getStateFunc from "../../api/locationAPI";

const CompanyListing = () => {
    const { state } = useContext(AdminContext)
    // console.log("company listing state:company", state?.result)
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const pdfView = useRef(null);
    const [filterDivExtended, setfilterDivExtended] = useState(false);
    const [exportBtnLoading, setexportBtnLoading] = useState(false)
    const [pdfBtnLoading, setpdfBtnLoading] = useState(false)

    const [allState, setallState] = useState([]);
    const [selectedState, setselectedState] = useState()

    const [search, setSearch] = useState("");
    const [activeTab, setactiveTab] = useState("SFA ( Sales for Automation )")
    const [planType, setPlanType] = useState("sfa")

    const [allData, setallData] = useState([])
    const [pageCount, setpageCount] = useState(1);
    const [pageLength, setpageLength] = useState();
    const [totalDataCount, settotalDataCount] = useState();

    const [deletePopup, setdeletePopup] = useState(false);
    const [currentGroup, setcurrentGroup] = useState({});

    const [filterData, setfilterData] = useState({
        state: "",
        page: pageCount,
        limit: "10",
    })

    useEffect(() => {
        // getCompanyFunc({ type: "SFA ( Sales for Automation )" });
        getStateFunc().then((res) => setallState(res.data.result));
    }, []);
    useEffect(() => {
        if (state) getCompanyFunc({ type: "SFA ( Sales for Automation )" });
    }, [state]);
    // useEffect(() => {
    //     fetchAllBeatFunc({ ...filterData, page: pageCount });
    // }, [pageCount]);

    // useEffect(() => {
    //     if (search !== "") {
    //         let ID = setTimeout(() => {
    //             fetchAllBeatFunc({ ...filterData, search })
    //         }, 1000);

    //         return () => clearTimeout(ID);
    //     }
    // }, [search]);
    // console.log("allData", allData)

    const getCompanyFunc = async (arg) => {
        setactiveTab(arg.type);
        setallData([]);

        let permissionType;
        if (arg.type === "SFA ( Sales for Automation )") {
            permissionType = "SFA";
            arg.type = "sfa";
            setPlanType("sfa");
        } else if (arg.type === "DMS ( Distributor Management System )") {
            permissionType = "DMS";
            arg.type = "dms";
            setPlanType("dms");
        } else if (arg.type === "Lead Managment") {
            permissionType = "Lead Management";
            arg.type = "lead_management";
            setPlanType("lead_management");
        } else if (arg.type === "Demo Control") {
            permissionType = "Demo Control";
            arg.type = "demo_control";
            setPlanType("Demo Control");
        }
        if (state?.result?.role !== "super_admin") if (!state?.result?.permissions.includes(permissionType) || !state?.result?.permissions.includes("View Listing")) return toast.error("Permission required from super admin!")
        setisLoading(true);
        let { data } = await getCompany(arg);
        if (data.status) {
            data.data.map(user => { user.showPass = false })
            setallData(data.data);
            setpageLength(data.total_pages);
            settotalDataCount(data.total_users);
        } else {
            console.log(data.message);
        }
        setisLoading(false);
    }

    const deleteCompanyFunc = async () => {
        let { data } = await deleteCompany(currentGroup._id);
        if (data.status) {
            toast.success(data.message)
            getCompanyFunc({ type: "SFA ( Sales for Automation )" })
        } else {
            console.log(data.message)
        }
        setdeletePopup(false);
    }

    const passwordToggleFunc = (row) => {
        if (state?.result?.role !== "super_admin") if (!state?.result?.permissions?.includes('View Password')) return toast.error("Permission is required form super admin!")
        allData.map(user => {
            if (user._id === row._id) {
                user.showPass = !user.showPass
            }
        })
        setallData([...allData])
    }

    const filterFunc = () => {
        getCompanyFunc({ type: planType, state: selectedState })
    };

    const filterAndExportFunc = (type) => {
        setTimeout(() => {
            setexportBtnLoading(false)
            setpdfBtnLoading(false)
        }, 2000);

        if (type === "column_filter") return setfilterDivExtended(!filterDivExtended);
        else if (type === "export") {
            setexportBtnLoading(true)
            setfilterDivExtended(false);
            // return exportFunc();
        } else if (type === "pdf") {
            setpdfBtnLoading(true)
            setfilterDivExtended(false);
            if (allData.length < 1) return toast.error("list is empty!");
            return saveToPdf(pdfView, "Company Listing");
        }
    }

    // Filter
    const [tableCols, setTableCols] = useState([
        {
            label: 'CompanyName',
            key: 'company_name',
            type: "company_value",
            active: true,
        },
        {
            label: 'Company Id',
            key: 'name',
            type: "company_code_value",
            active: true,
        },
        {
            label: 'State',
            key: 'state',
            type: "state_value",
            active: true,
        },
        {
            label: 'City',
            key: "city",
            type: "state_value",
            active: true,
        },
        {
            label: 'Email',
            key: "email",
            type: "value",
            active: true,
        },
        {
            label: 'Password',
            key: 'password',
            type: "password_value",
            active: true,
        },
        {
            label: 'Total Users',
            key: 'userCount',
            type: "sfa_vlaue",
            active: true,
        },
        {
            label: 'Registered User',
            key: 'registeredUser',
            type: "value",
            active: true,
        },
        {
            label: 'Plan Purchased',
            key: 'features',
            type: "sfa_plan_vlaue",
            active: true,
        },
        {
            label: 'Plan Amount',
            key: 'totalPayment',
            type: "sfa_vlaue",
            active: true,
        },
        {
            label: 'Period',
            key: 'durationCount',
            type: "sfa_vlaue",
            active: true,
        },
        {
            label: 'Renewal Date',
            key: 'endDate',
            type: "sfa_vlaue",
            active: true,
        },
        // {
        //     label: 'Active User',
        //     key: 'beatName',
        //     type: "value",
        //     active: true,
        // },
        // {
        //     label: 'Status',
        //     key: "status",
        //     type: "status",
        //     active: true,
        // },
        {
            label: 'Action',
            key: "abscent",
            type: "action",
            active: true,
        },
    ]);

    let filterCols = tableCols.filter(col => col.active);
    const toogleTableCol = (key) => {
        const temp = tableCols.map(col => {
            if (col.key === key) return { ...col, active: !col.active }
            return col;
        })
        setTableCols(temp)
    }

    const TCComponent = ({ data }) => {
        let { row, col } = data;
        if (col.type === "action") {
            return (
                <StyledTableCell style={{ whiteSpace: "nowrap" }} >
                    <BorderColorIcon
                        className="emp_grp_icons"
                        style={{ fontSize: "1rem", color: "var(--main-color)", marginLeft: "0.5rem", }}
                        onClick={() => navigate("#", { state: row })}
                    />
                    <DeleteIcon
                        style={{ fontSize: "1rem", color: "red", marginLeft: "0.5rem", }}
                        className=" emp_grp_icons"
                        onClick={() => {
                            if (state?.result?.role !== "super_admin") if (!state?.result?.permissions.includes("Delete Company")) return toast.error("Permission required from super admin!")
                            setdeletePopup(true);
                            setcurrentGroup(row);
                        }}
                    />
                    <MdOutlineSettings
                        className="emp_grp_icons"
                        style={{ fontSize: "1rem", color: "var(--main-color)", marginLeft: "0.5rem", }}
                        onClick={() => navigate("/company_action_page", { state: { company: row, planType } })}
                    />
                    {planType !== "Demo Control" && (
                        <RxCounterClockwiseClock
                            className="emp_grp_icons"
                            style={{ fontSize: "1rem", color: "var(--main-color)", marginLeft: "0.5rem", }}
                            onClick={() => navigate("/purchased_plan", { state: { company: row, planType } })}
                        />
                    )}
                </StyledTableCell>
            )
        } else if (col.type === "password_value") {
            return (
                <StyledTableCell style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <span>{row.showPass ? row[col.key] : row[col.key].split("").map(x => x = "*").join("")}</span>
                    <span>
                        {row.showPass ? (
                            <BsFillEyeSlashFill
                                style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                onClick={() => passwordToggleFunc(row)}
                            />
                        ) : (
                            <FaEye
                                style={{ margin: "0 0.3rem", fontSize: "1rem", cursor: "pointer", }}
                                onClick={() => passwordToggleFunc(row)}
                            />
                        )}
                    </span>
                </StyledTableCell>
            )
        } else if (col.type === "company_code_value") {
            return <StyledTableCell>{row.companyShortCode + row.companyShortCode2}</StyledTableCell>;
        } else if (col.type === "state_value") {
            return <StyledTableCell>{row[col.key]?.name}</StyledTableCell>;
        } else if (col.type === "sfa_vlaue") {
            return <StyledTableCell>{row[planType]?.[col.key]}</StyledTableCell>;
        } else if (col.type === "sfa_plan_vlaue") {
            return <StyledTableCell>{row[planType]?.plan?.[col.key]}</StyledTableCell>;
        } else if (col.type === "company_value") {
            return <StyledTableCell style={{ position: "sticky", left: 0, zIndex: 100, backgroundColor: "#fff" }} >{row[col.key]}</StyledTableCell>;
        }
        return <StyledTableCell>{row[col.key]}</StyledTableCell>;
    }

    // Table style
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "var(--main-color)",
            color: theme.palette.common.white,
            fontWeight: "bold",
            borderRight: "1px solid #fff",
            overflow: "hidden",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            border: "none",
            borderLeft: "2px solid #f3f3f3",
            '&:last-child': {
                borderRight: "2px solid #f3f3f3",
            },
            whiteSpace: "nowrap"
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        borderBottom: "2px solid #f3f3f3",
        '&:nth-of-type(odd)': {
            backgroundColor: "#fff",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#fbfbfb",
        },
    }));

    return (
        <>
            <div className="beat_heading">
                <div className="beat_left">
                    <div className="icon">
                        <img src={group} alt="icon" />
                    </div>
                    <div className="title">{activeTab}</div>
                </div>
                <div className="beat_right">
                    <div className="search">
                        <SearchIcon style={{ color: `var(--main-color)` }} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                        />
                    </div>
                </div>
            </div>

            <div className="config_tab">
                <div onClick={() => getCompanyFunc({ type: "SFA ( Sales for Automation )" })} className={`confi_div ${activeTab === "SFA ( Sales for Automation )" ? "config_active_tab" : ""}`}
                >
                    SFA
                </div>
                <div onClick={() => getCompanyFunc({ type: "DMS ( Distributor Management System )" })} className={`confi_div ${activeTab === "DMS ( Distributor Management System )" ? "config_active_tab" : ""}`}
                >
                    DMS
                </div>
                <div onClick={() => getCompanyFunc({ type: "Lead Managment" })} className={`confi_div ${activeTab === "Lead Managment" ? "config_active_tab" : ""}`}
                >
                    Lead Managment
                </div>
                <div onClick={() => getCompanyFunc({ type: "Demo Control" })} className={`confi_div ${activeTab === "Demo Control" ? "config_active_tab" : ""}`}
                >
                    Demo Control
                </div>
            </div>

            <div class="tracking_tabs">
                <div className="tarcking_tab_left">
                    <select onChange={(e) => setselectedState(e.target.value)}>
                        <option value="">Select State</option>
                        {allState?.map((state) => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </select>
                    <div className="view_btn" onClick={() => filterFunc()} >
                        View
                    </div>
                </div>
                <div className="top_filter_section">
                    <div className="top_left_filter">
                        <div className="entry_div">Show Entries</div>
                        <select name="limit" /* onChange={topFilterHandleInput} */ className="limit_select" >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="new_add_btn_top_filter" >
                        <div className="top_right_filter">
                            <div className="other_functionality_section" style={{ marginRight: 0 }}>
                                <div className="section_options" onClick={() => filterAndExportFunc("column_filter")}>
                                    <span className="filter_icon" ><BsFilterLeft size={22} /></span> Filter
                                </div>
                                <div className="section_options" onClick={() => filterAndExportFunc("export")}>
                                    {exportBtnLoading ? <CircularProgress size={24} /> : "Export"}
                                </div>
                                <div className="section_options" onClick={() => filterAndExportFunc("pdf")} >
                                    {pdfBtnLoading ? <CircularProgress size={24} /> : "PDF"}
                                </div>
                                <div style={{ display: filterDivExtended ? "block" : "none" }} className="col_filter_section">
                                    {tableCols?.map((col) => (
                                        <div className="col_filter" >
                                            <label >
                                                <input type="checkbox" checked={col.active} onChange={() => toogleTableCol(col.key)} />
                                                <span onChange={() => toogleTableCol(col.key)} >{col.label}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <div className="add_new_side_btn" onClick={() => navigate("/add_beat")}>
                            Add New
                        </div> */}
                    </div>
                </div>
            </div >

            {/* table ui */}
            {isLoading ? (
                <div style={{ margin: "auto", }} >
                    <CircularProgress />
                </div>
            ) : (
                <div className="" ref={pdfView}>
                    <div className="table_scroll_container">
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S. No.</StyledTableCell>
                                    {filterCols?.map(col => <StyledTableCell style={{ position: col.label === "CompanyName" && "sticky", left: col.label === "CompanyName" && 0 }} >{col.label}</StyledTableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allData?.map((row, i) => (
                                    <StyledTableRow key={i} >
                                        <StyledTableCell>{((pageCount * filterData.limit) - filterData.limit) + (i + 1)}</StyledTableCell>
                                        {filterCols?.map(col => <TCComponent data={{ row, col }} />)}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {allData?.length !== 0 && (
                        <div className="top_filter_section" style={{ marginBlock: "1rem" }} >
                            <div className="limit_bottom_info">Showing {((pageCount * filterData.limit) - filterData.limit) + 1} to {totalDataCount > pageCount * filterData.limit ? pageCount * filterData.limit : totalDataCount} of {totalDataCount} entries</div>
                            <div>
                                <Pagination
                                    count={pageLength}
                                    size="medium"
                                    color="primary"
                                    shape="rounded"
                                    variant="outlined"
                                    onChange={(e, value) => setpageCount(value)}
                                    page={pageCount}
                                />
                            </div>
                        </div>
                    )}

                    {allData?.length === 0 && (
                        <div className="no_data">
                            No data
                        </div>
                    )}
                </div>
            )}

            <Dialog
                open={deletePopup}
                aria-labelledby="form-dialog-title"
                maxWidth="xs"
                fullWidth="true"
                onClose={() => setdeletePopup(false)}
            >
                <DialogTitle className="dialog_title">
                    <div>Do you want to delete {currentGroup.company_name}?</div>
                </DialogTitle>
                <DialogContent className="cardpopup_content_delete">
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div
                            className="employee_gl_popup"
                            onClick={() => setdeletePopup(false)}
                        >
                            Cancel
                        </div>
                        <div
                            className="employee_gl_popup_del"
                            onClick={() => deleteCompanyFunc()}
                        >
                            Delete
                        </div>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </>
    )
}

export default CompanyListing