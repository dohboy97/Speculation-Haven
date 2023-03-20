import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import IndecesPage from "./pages/IndecesPage/IndecesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage/LoginPage";
function App() {
  return (
    <>
      <Header />
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
        <Route path="/" element={<LoginPage />} />
        <Route path="/search/*" element={<SearchPage />} />
        <Route path="/indeces" element={<IndecesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<h1>Page Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
