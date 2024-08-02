import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Rating from "./pages/Rating";
import Dashboard from "./pages/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import Hamburger from "./components/Hamburger";

// const PrivateRoute = () => {
//   return isAuthenticated ? <Outlet/> : <App />;
// };
function App() {
  const { isAuthenticated } = useAuth0();

  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        <div className="xs:hidden md:flex fixed top-0 left-0">
          <Sidebar />
        </div>
        <div className="xs:flex md:hidden fixed top-0 left-0 border border-b-slate-200 z-10">
          <Hamburger />
        </div>
        <div className="flex flex-col justify-start ml-[14vw]">
          <div className="flex fixed top-0 right-0 z-10">
            <Navbar />
          </div>
          <div className="xs:hidden md:flex p-4 mt-[8vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              {isAuthenticated ? (
                <Route path="/favorites" element={<Rating />} />
              ) : (
                <Route path="/favorites" element={<Home />} />
              )}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
        <div className="xs:flex xs:w-full xs:flex-col xs:justify-start md:hidden p-4 mt-[8vh]">
          
          <Routes>
            <Route path="/" element={<Home />} />
            {isAuthenticated ? (
              <Route path="/favorites" element={<Rating />} />
            ) : (
              <Route path="/favorites" element={<Home />} />
            )}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>x
    </>
  );
}

export default App;
