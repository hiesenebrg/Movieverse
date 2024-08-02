import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const MenuList = [
  {
    id: 1,
    name: "home",
    link: "/",

    displayName: "Home",
    subMenu: [],
  },
  {
    id: 2,
    name: "dashboard",
    link: "/dashboard",

    displayName: "Dashboard",
    subMenu: [],
  },
  {
    id: 3,
    name: "favorite",
    link: "/favorites",

    displayName: "Favorites",
    subMenu: [],
  },
];
const Hamburger = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const highlightSelectedMenu = (pathname) => {
    let moduleName = pathname.split("/")[1];
    let currentMenu = MenuList.find((menu) => menu.name === moduleName);
    setSelectedMenu((prev) => currentMenu);
  };
  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    navigate(menu.link);
    return menu;
  };
  React.useEffect(() => {
    highlightSelectedMenu(location.pathname);
  }, [location.pathname]);

  return (
    <div className="w-full h-fit p-4 pb-[5px] bg-white">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {MenuList &&
          MenuList.map((menu) => (
            <MenuItem
              key={menu.id}
              className={
                selectedMenu?.name === menu.name
                  ? "w-full flex gap-2 bg-slate-200 rounded-md  px-3 py-1 text-blue-800"
                  : "fw-full flex gap-2 px-3 py-1"
              }
              onClick={() => {
                handleMenuItemClick(menu);
                handleClose();
              }}
            >
              {menu.displayName}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
export default Hamburger;

// <MenuItem onClick={handleClose}>Home</MenuItem>
// <MenuItem onClick={handleClose}>Dashboard</MenuItem>
// <MenuItem onClick={handleClose}>Logout</MenuItem>
