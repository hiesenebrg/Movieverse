import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { signIn } from "../api/user";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutAction } from "../redux/userRedux";
import { useSelector } from "react-redux";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
  const dispatch = useDispatch();
  const signInUser = async () => {
    console.log("the sign func called", user);
    let res = await signIn(dispatch, {
      nickname: user?.nickname,
      email: user?.email,
      picture: user?.picture,
    });
    if (res && res.data) {
      console.log("res1234", res);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("token", res.data.token);
    }
  };
  React.useEffect(() => {
    if (isAuthenticated) {
      signInUser();
    }
  }, [isAuthenticated]);

  console.log("user", user);
  return (
    <div className="xs:w-[82vw] md:w-[86vw] flex justify-end items-center py-2 px-6  h-fit border border-b-slate-200 border-l-0 bg-white">
      {isAuthenticated && (
        <div className="flex gap-4 xs:pr-4 md:pr-0">
          <div className="rounded-full bg-blue-400 p-2 text-white">
            {user?.nickname.slice(0, 2).toUpperCase()}
          </div>
          {user && (
            <p className="xs:hidden  md:flex pr-2 items-center">
              {user.nickname}
            </p>
          )}
        </div>
      )}
      <div>
        {isAuthenticated ? (
          <button
            className="bg-blue-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin } });
              localStorage.removeItem("token");
              dispatch(logoutAction());
            }}
          >
            Log Out
          </button>
        ) : (
          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            onClick={async () => {
              loginWithRedirect();
            }}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
