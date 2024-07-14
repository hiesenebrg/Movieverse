import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth0 } from "@auth0/auth0-react";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
console.log('user', user);
  return (
    <div className="flex justify-end items-center py-2 px-6 w-full h-fit border border-b-slate-200">
      
     {isAuthenticated &&  <div className="flex gap-4">
        <div className="rounded-full bg-blue-400 p-2 text-white">{user?.nickname.slice(0, 2).toUpperCase()}</div>
        {user && <p className="flex pr-2 items-center">{ user.nickname}</p>}
       </div>}
      <div>
      {isAuthenticated ? (
        <button
          className="bg-blue-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      ) : (
        <button
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}
      </div>
    </div>
  );
};
export default Navbar;
