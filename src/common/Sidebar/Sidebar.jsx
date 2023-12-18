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
import company_lisitng_img from "../../images/Company listing.png";
import user_img from "../../images/user.png";
import plan_img from "../../images/plan.png";
import action_img from "../../images/action.png";
import scheme_img from "../../images/scheme.png";

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const [open2, setOpen2] = React.useState(false);
  const [activeMenu, setactiveMenu] = useState(1);
  const [menuItems, setmenuItems] = useState([
    {
      index: 1,
      icon: company_lisitng_img,
      icon_white: company_lisitng_img,
      title: "Company Lisitng",
      navigate: "company_listing",
      show: false,
      subItems: [
        { name: "Company Lisitng", link: "/company_listing" },
      ],
    },
    {
      index: 2,
      icon: user_img,
      icon_white: user_img,
      title: "User",
      navigate: "user",
      show: false,
      subItems: [
        { name: "User", link: "/user" },
      ],
    },
    {
      index: 3,
      icon: plan_img,
      icon_white: plan_img,
      title: "Plan",
      navigate: "plan",
      show: false,
      subItems: [
        { name: "Plan", link: "/plan" },
      ],
    },
    {
      index: 4,
      icon: action_img,
      icon_white: action_img,
      title: "Action",
      navigate: "action",
      show: false,
      subItems: [
        { name: "Action", link: "/action" },
      ],
    },
    {
      index: 5,
      icon: scheme_img,
      icon_white: scheme_img,
      title: "Banners",
      navigate: "banner",
      show: false,
      subItems: [
        { name: "Action", link: "/banner" },
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
