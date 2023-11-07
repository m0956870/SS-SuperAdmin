import "../../App.css"
import React, { useContext, useEffect, useState } from 'react'
import group from "../../images/group.png";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useRouteError } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";

import { useRef } from "react";
import { BsFilterLeft } from "react-icons/bs"
import { saveToPdf } from "../../utils/saveToPdf";
import xlsx from "json-as-xlsx";
import { AdminContext } from "../../App";
import { fetchAllUsers } from "../../api/userAPI";

const User = () => {
    // const {state} = useContext(AdminContext)
    // console.log(state)
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const pdfView = useRef(null);
    const [filterDivExtended, setfilterDivExtended] = useState(false);
    const [exportBtnLoading, setexportBtnLoading] = useState(false)
    const [pdfBtnLoading, setpdfBtnLoading] = useState(false)

    const [search, setSearch] = useState("");

    const [allData, setallData] = useState([])
    const [pageCount, setpageCount] = useState(1);
    const [pageLength, setpageLength] = useState();
    const [totalDataCount, settotalDataCount] = useState();

    const [filterData, setfilterData] = useState({
        state: "",
        page: pageCount,
        limit: "10",
    })

    // useEffect(() => {
    //     getStateFunc().then((res) => setallState(res.data.result));
    // }, []);
    useEffect(() => {
        fetchAllUsersFunc({ ...filterData, page: pageCount });
    }, [pageCount]);

    useEffect(() => {
        if (search !== "") {
            let ID = setTimeout(() => {
                fetchAllUsersFunc({ ...filterData, search })
            }, 1000);

            return () => clearTimeout(ID);
        }
    }, [search]);

    const fetchAllUsersFunc = async (filterData) => {
        setisLoading(true);

        let { data } = await fetchAllUsers(filterData);
        if (data.status) {
            setallData(data.data);
            settotalDataCount(data.total_count);
            setpageLength(data.total_pages);
        } else {
            console.log(data.messaage)
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
            label: 'Name',
            key: 'first_name',
            type: "value",
            active: true,
        },
        {
            label: 'Email ID',
            key: 'email',
            type: "value",
            active: true,
        },
        {
            label: 'Password',
            key: 'password',
            type: "value",
            active: true,
        },
        {
            label: 'Permission',
            key: "day",
            type: "value",
            active: true,
        },
        // {
        //     label: 'Status',
        //     key: "status",
        //     type: "status",
        //     active: true,
        // },
        // {
        //     label: 'Action',
        //     key: "abscent",
        //     type: "action",
        //     active: true,
        // },
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
                    {/* <BorderColorIcon
                        onClick={() => navigate("/edit_beat", { state: row })}
                        style={{ fontSize: "1rem", color: "var(--main-color)", marginLeft: "0.5rem", }}
                    /> */}
                    {/* <DeleteIcon
                        style={{ fontSize: "1rem", color: "red", marginLeft: "0.5rem", }}
                        className="emp_grp_icons"
                        onClick={() => {
                        setdeletePopup(true);
                        setcurrentGroup(row);
                        }}
              /> */}
                </StyledTableCell>
            )
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
                    <div className="title">User Lisiting</div>
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

            {/* <div class="tracking_tabs">
                <div className="tarcking_tab_left">
                     <select
                        name="state"
                        className="select_btn new_state_select"
                        onChange={stateHandleInput}
                        style={{ color: "#000" }}
                    >
                        <option value="">All State</option>
                        {allState?.map((state) => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                    </select> 
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
                    <div className="view_btn"  onClick={() => fetchAllBeatFunc(filterData)} >
                View
                    </div >
                </div >
    <div className="top_filter_section">
        <div className="top_left_filter">
            <div className="entry_div">Show Entries</div>
            <select name="limit" onChange={topFilterHandleInput}  className = "limit_select" >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select >
        </div >
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
    </div >
            </div > * /}

            
            {/* table ui */ }
            {isLoading ? (
                <div style={{ margin: "auto", }} >
                    <CircularProgress />
                </div>
            ) : (
                <div className="" ref={pdfView}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }} >
                        <div className="user_add_new_side_btn" onClick={() => navigate("/add_beat")}>
                            Add New
                        </div>
                    </div>
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

export default User;