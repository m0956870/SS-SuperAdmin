import "./Sidebar.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Images
import logo_white from "../../images/logo_white.png";
import dashboard from "../../images/dashboard.png";
import dashboard_white from "../../images/dashboard_white.png";

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const [open2, setOpen2] = React.useState(false);
  const [activeMenu, setactiveMenu] = useState(1);
  const [menuItems, setmenuItems] = useState([
    {
      index: 1,
      icon: dashboard,
      icon_white: dashboard_white,
      title: "Dashboard",
      navigate: "dashboard",
      show: false,
      subItems: [
        { name: "Employee's Dashboard", link: "/dashboard" },
      ],
    },
  ]);

  const navigateFunc = (item) => {
    setactiveMenu(item.index);
  };


  const handleClick = (item, index) => {
    // console.log(item);
    menuItems.map(item2 => {
      if (item2.index === item.index) {
        if (!item2.show) item2.show = true
        else item2.show = false
      } else {
        item2.show = false
      }
    })

    setmenuItems([...menuItems]);
    setOpen2(!open2);
  };

  return (
    <>
      <div id="sidebar">
        <div className={`${open ? "logo" : "logo logo_close"}`}>
          <img onClick={() => navigate("/dashboard")} src={logo_white} alt="salesparrow" />
        </div>
        <div className="menu_items">
          {menuItems.map((item, index) => (
            <div
              key={item.index}
              className="item"
              onClick={() => navigateFunc(item)}
            >
              <div className={`${open ? "image" : "image"}`}>
                <div
                  onClick={() => navigate(`/${item.navigate}`)}
                  className={`${activeMenu !== item.index && `inactive`}`}
                >
                  <img
                    src={`${activeMenu === item.index
                      ? `${item.icon_white}`
                      : `${item.icon}`
                      }`}
                    alt="icons"
                  />
                </div>
              </div>
              <ListItemButton
                className={`${open ? " title" : " close"}`}
                sx={{ display: "flex", padding: 0 }}
                onClick={() => handleClick(item, index)}
              >
                <ListItemText sx={{ color: "#fff" }} primary={item.title} />
                {item.show ? (
                  <ExpandLess sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMore sx={{ color: "#fff" }} />
                )}
              </ListItemButton>
              <Collapse
                style={{ minWidth: "100%" }}
                in={item.show}
                timeout="auto"
                unmountOnExit
              >
                <div className={`${open ? "subItems title" : "subItems close"}`}                >
                  {item.subItems?.map((item, index) => (
                    <div
                      key={index}
                      className="subItems_item"
                      onClick={() => navigate(item.link)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
