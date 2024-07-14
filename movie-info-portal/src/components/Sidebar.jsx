import React, { useEffect, useState } from "react";
import Logo from "../assets/images/web.jpg";
import HomeIcon from "@mui/icons-material/Home";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import StarIcon from "@mui/icons-material/Star";
import { useLocation, useNavigate } from "react-router-dom";
const Menu = [
  {
    id: 1,
    name: "home",
    link: "/",
    logo: HomeIcon,
    displayName: "Home",
    subMenu: [],
  },
  {
    id: 2,
    name: "dashboard",
    link: "/dashboard",
    logo: DashboardCustomizeIcon,
    displayName: "Dashboard",
    subMenu: [],
  },
  {
    id: 3,
    name: "favorite",
    link: "/favorites",
    logo: StarIcon,
    displayName: "Favorites",
    subMenu: [],
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    navigate(menu.link);
    return menu;
  };
  const highlightSelectedMenu = (pathname) => {
    let moduleName = pathname.split("/")[1];
    let currentMenu = Menu.find((menu) => menu.name === moduleName);
    setSelectedMenu((prev) => currentMenu);
  };

  useEffect(() => {
    highlightSelectedMenu(location.pathname);
  }, [location.pathname]);

  return (
    <div className="w-[14vw] h-[100vh] p-5 border border-r-slate-200">
      <div className="grid grid-rows-5">
        <div className="flex gap-2 row-span-2 pb-2 py-1 ">
          <img src={Logo} alt="logo" className="w-8 h-8 mb-4"></img>
          <span className="pt-1 ">Movie Info</span>
        </div>
        {Menu.map((menu) => (
          <div
            key={menu.id}
            className="w-full text-[13px] flex row-span-1 gap-4 pb-2  text-slate-400 hover:cursor-pointer"
          >
            <div
              onClick={() => handleMenuItemClick(menu)}
              className={
                selectedMenu?.name === menu.name
                  ? "w-full flex gap-2 bg-slate-200 rounded-md  px-3 py-1 text-blue-800"
                  : "fw-full flex gap-2 px-3 py-1"
              }
            >
              {menu.logo && (
                <span>
                  <menu.logo sx={{ fontSize: "18px" }} />
                </span>
              )}
              <span>{menu.displayName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
