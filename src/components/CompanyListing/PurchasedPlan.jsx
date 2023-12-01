import "../../App.css"
import React, { useContext, useEffect, useState } from 'react'
import group from "../../images/group.png";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
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
// import { PiClockCounterClockwiseFill } from "react-icons/pi";

import { useRef } from "react";
import { BsFilterLeft } from "react-icons/bs"
import { saveToPdf } from "../../utils/saveToPdf";
import xlsx from "json-as-xlsx";
import { AdminContext } from "../../App";
import { getCompany } from "../../api/companyAPI";
import { getPruchasedPlan } from "../../api/planAPI";

const PurchasedPlan = () => {
    // const { state } = useContext(AdminContext)
    // console.log(state)
    const { state: location } = useLocation();
    console.log("location", location)
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const pdfView = useRef(null);
    const [filterDivExtended, setfilterDivExtended] = useState(false);
    const [exportBtnLoading, setexportBtnLoading] = useState(false)
    const [pdfBtnLoading, setpdfBtnLoading] = useState(false)

    const [search, setSearch] = useState("");
    const [planType, setPlanType] = useState(location?.planType)

    const [allData, setallData] = useState([])
    const [pageCount, setpageCount] = useState(1);
    const [pageLength, setpageLength] = useState();
    const [totalDataCount, settotalDataCount] = useState();

    const [deletePopup, setdeletePopup] = useState(false);
    const [currentGroup, setcurrentGroup] = useState({});

    const [filterData, setfilterData] = useState({
        id: location?.company?._id,
        type: location?.planType,
        state: "",
        page: pageCount,
        limit: "10",
    })

    useEffect(() => {
        // getStateFunc().then((res) => setallState(res.data.result));
        getPurchasedPlanFunc({ ...filterData, type: planType })
    }, [planType]);


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
    console.log("allData", allData)

    const getPurchasedPlanFunc = async (filterData) => {
        // setactiveTab(filterData.type);
        // setPlanType(filterData.type);

        setisLoading(true);
        let { data } = await getPruchasedPlan(filterData);
        if (data.status) {
            setallData(data.data);
            setpageLength(data.total_pages);
            settotalDataCount(data.total_users);
        } else {
            console.log(data.message);
        }
        setisLoading(false);
    }

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
            // if (allRouts.length < 1) return toast.error("Report list is empty!");
            // return saveToPdf(pdfView, "Monthly Attendence Report (All Employee)");
        }
    }

    // Filter
    const [tableCols, setTableCols] = useState([
        {
            label: 'Date of Subscription',
            key: 'planPurchaseDate',
            type: "value",
            active: true,
        },
        {
            label: 'Modul Covered',
            key: 'features',
            type: "plan_value",
            active: true,
        },
        {
            label: 'Plan Name',
            key: 'plan_name',
            type: "plan_value",
            active: true,
        },
        {
            label: 'Plan Amount',
            key: "totalPayment",
            type: "value",
            active: true,
        },
        {
            label: 'Subscription Start Date',
            key: "startDate",
            type: "value",
            active: true,
        },
        {
            label: 'Subscription End Date',
            key: 'endDate',
            type: "value",
            active: true,
        },
        {
            label: 'Number of Users',
            key: 'userCount',
            type: "value",
            active: true,
        },
        {
            label: 'Billing Frequency',
            key: 'billing_frequency',
            type: "plan_value",
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
        if (col.type === "plan_value") {
            if (row?.plan?.[col.key] === "lead_management") return <StyledTableCell>{row?.plan?.[col.key].split("_").join(" ")}</StyledTableCell>;
            return <StyledTableCell>{row?.plan?.[col.key]}</StyledTableCell>;
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
                    <div className="title">{location.company?.company_name}</div>
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
                <div onClick={() => setPlanType("sfa")} className={`confi_div ${planType === "sfa" ? "config_active_tab" : ""}`}
                >
                    SFA
                </div>
                <div onClick={() => setPlanType("dms")} className={`confi_div ${planType === "dms" ? "config_active_tab" : ""}`}
                >
                    DMS
                </div>
                <div onClick={() => setPlanType("lead_management")} className={`confi_div ${planType === "lead_management" ? "config_active_tab" : ""}`}
                >
                    Lead Managment
                </div>
                <div onClick={() => setPlanType("demo_control")} className={`confi_div ${planType === "demo_control" ? "config_active_tab" : ""}`}
                >
                    Demo Control
                </div>
            </div>

            <div class="tracking_tabs">
                <div className="tarcking_tab_left">
                    {/* <select
                        name="state"
                        className="select_btn new_state_select"
                        onChange={stateHandleInput}
                        style={{ color: "#000" }}
                    >
                        <option value="">All State</option>
                        {allState?.map((state) => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </select> */}
                    <select name="" id="">
                        <option value="">State</option>
                        <option value="">1</option>
                        <option value="">2</option>
                    </select>
                    <select name="" id="">
                        <option value="">State</option>
                        <option value="">1</option>
                        <option value="">2</option>
                    </select>
                    <div className="view_btn" /* onClick={() => fetchAllBeatFunc(filterData)}*/ >
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
                        <div className="add_new_side_btn" onClick={() => navigate("/add_beat")}>
                            Add New
                        </div>
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
                                    {filterCols?.map(col => <StyledTableCell>{col.label}</StyledTableCell>)}
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
            )
            }
        </>
    )
}

export default PurchasedPlan