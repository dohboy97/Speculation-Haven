import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import IndecesPage from "./pages/IndecesPage/IndecesPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/indeces" element={<IndecesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<h1>Page Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
