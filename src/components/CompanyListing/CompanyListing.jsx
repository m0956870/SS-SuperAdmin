import "../../App.css"
import React, { useState } from 'react'
import group from "../../images/group.png";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyListing = () => {
    const [search, setSearch] = useState("");
    const [selectedTab, setselectedTab] = useState("SFA ( Sales for Automation )")

    // useEffect(() => {
    //     getStateFunc().then((res) => setallState(res.data.result));
    // }, []);
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

    return (
        <>
            <div className="beat_heading">
                <div className="beat_left">
                    <div className="icon">
                        <img src={group} alt="icon" />
                    </div>
                    <div className="title">{selectedTab}</div>
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
        </>
    )
}

export default CompanyListing