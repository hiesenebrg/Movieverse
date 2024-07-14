import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Rating from "./pages/Rating";
import Dashboard from "./pages/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";

// const PrivateRoute = () => {
//   return isAuthenticated ? <Outlet/> : <App />;
// };
function App() {
  const { isAuthenticated } = useAuth0();

  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col justify-start">
          <div className="">
            <Navbar />
          </div>
          <div className="p-4">
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
      </div>
    </>
  );
}

export default App;
