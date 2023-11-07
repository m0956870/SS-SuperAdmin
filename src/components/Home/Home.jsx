import './Home.css';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from '@mui/material/InputBase';
import Icon from '@mui/material/Icon';
import { GoPlus } from "react-icons/go"
import Avatar from "@mui/material/Avatar";
import { Menu, MenuItem } from "@mui/material";
import routeArray from "../../routes.js";
import { useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../../App.js';
import bell from "../../images/bell.png";
import { getProfile } from '../../api/auth';
import Sidebar from '../../common/Sidebar/Sidebar.jsx';
export let cid;

export default function Home(props) {
    const [drawerWidth, setdrawerWidth] = useState(200)
    const [hamMargin, sethamMargin] = useState("13.5rem")
    const { state, dispatch } = React.useContext(AdminContext);
    cid = state?.result?.company_name
    const { route } = useParams();
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        const auth = localStorage.getItem("ss_auth");
        if (auth === "false" || !auth) {
            navigate("/login");
            toast.error("Please Login First!");
        }

        const allRoutes = [];
        routeArray.map((item) => {
            allRoutes.push(item.params);
        });
        if (!allRoutes.includes(route)) {
            navigate("/error");
        }

        getProfileFunc();
    }, []);
    useEffect(() => {
        if (mobileOpen) {
            setMobileOpen(!mobileOpen);
        }
    }, [route])

    const [anchorEl, setAnchorEl] = useState(null);
    const openAcc = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const logoutFunc = () => {
        setAnchorEl(null);
        localStorage.setItem("ss_token", null);
        localStorage.setItem("ss_auth", false);
        toast.success("Logout Successfully!");
        navigate("/login");
    };

    const getProfileFunc = async () => {
        let res = await getProfile();
        if (res.data.status) dispatch({ type: "ADMIN", payload: { ...state, user: res.data.data }, });
        else navigate("/login");
    }

    const changeWidth = () => {
        if (drawerWidth == 200) {
            setdrawerWidth(80)
            sethamMargin("5rem")
            setOpen(false)
        } else {
            setdrawerWidth(200)
            sethamMargin("13.5rem")
            setOpen(true)
        }
    }

    // Search bar 
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25), },
        marginLeft: 0,
        marginRight: 6,
        width: '100%',
        boxShadow: "var(--box-shadow)",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        color: "var(--main-color)",
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            color: "gray",
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': { width: '20ch', },
            },
        },
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ paddingRight: "0 !important" }}>
                <div className="main">
                    <div className="navbar">
                        <div onClick={() => changeWidth()} className="hamburger_menu" style={{ marginLeft: `${hamMargin}`, color: "#000", transition: "all 0.3s ease-in-out" }}>
                            <MenuIcon />
                        </div>
                        <div className="toggle_btn">
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ display: { sm: 'none' }, color: "#000" }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>
                        </div>
                        <div className="user_info">
                            {/* <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                            </Search> */}
                            {/* <div className='appbar_plus_icon'>
                                <Icon className="emp_grp_icons">
                                    <GoPlus style={{ color: "var(--main-color)" }} />
                                </Icon>
                                <PlusIconContainer />
                            </div> */}
                            {state && (
                                <>
                                    <img src={bell} alt="notification" onClick={() => navigate("/message")} />
                                    <Avatar
                                        alt="Profile Pic"
                                        src={state?.result?.profileImage}
                                        aria-controls={openAcc ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openAcc ? "true" : undefined}
                                        onClick={handleClick}
                                    />
                                    <Menu
                                        className="menu"
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openAcc}
                                        onClose={handleClose}
                                        MenuListProps={{ "aria-labelledby": "basic-button", }}
                                        sx={{ position: "absolute" }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <NavLink style={{ textDecoration: "none", color: "#000" }} to="/profile">
                                                Profile
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <NavLink style={{ textDecoration: "none", color: "#000" }} to="/change_password" >
                                                Change Password
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={() => logoutFunc()}>Logout</MenuItem>
                                    </Menu>
                                    <div className="name">{state?.result?.company_name}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, transition: "all 0.3s ease-in-out" }} aria-label="mailbox folders" >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true, }}
                    sx={{ display: { xs: 'block', sm: 'none' }, backgroundColor: "var(--main-color)", '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, transition: "all 0.3s ease-in-out" }, }}
                >
                    <Sidebar open={open} />
                </Drawer>
                <Drawer open variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, backgroundColor: "var(--main-color)", '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, transition: "all 0.3s ease-in-out" }, }}>
                    <Sidebar open={open} />
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, marginTop: "4rem", backgroundColor: "#f9f9fa" }} >
                <div id={`${open === true ? "open" : "close"}`}>
                    {routeArray.map((item) => route === item.params && (
                        <div key={item.params} className='container' >
                            {item.component}
                        </div>
                    ))}
                </div>
            </Box>
        </Box>
    );
}

const PlusIconContainer = () => {
    return (
        <div className="plus_icon_hover_layer">
            <div className="add_btn_container">
                {/* <div className='add_elem'>
                    <span className="add_elem_img"><img src={area_white} alt="" /></span>
                    <Link to="/create_route">Add Route</Link>
                </div> */}
            </div>
        </div>
    )
}