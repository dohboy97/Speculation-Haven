import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import IndecesPage from "./pages/IndecesPage/IndecesPage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect, useState } from "react";
import { UserContext } from "./context";
import { Typography } from "@mui/material";
function App() {
  const navigate = useNavigate();
  // fetch User context
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch("/auth/status").then((res) => {
      res.json().then((jsonData) => {
        if (jsonData.success) {
          setUser(jsonData.user);
        } else {
          navigate("/");
        }
      });
    });
  }, [navigate]);

  if (user)
    return (
      <>
        <UserContext.Provider value={user}>
          <Header />
          <Navbar setUser={setUser} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/watchlist" element={<WatchListPage />} />
            <Route path="/search/*" element={<SearchPage />} />
            <Route path="/indeces" element={<IndecesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route
              path="*"
              element={<Typography variant="h4">Page not found</Typography>}
            />
          </Routes>
        </UserContext.Provider>
      </>
    );

  return <LoginPage />;
}

export default App;
