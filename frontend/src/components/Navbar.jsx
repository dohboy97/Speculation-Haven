import { useLocation, useNavigate } from "react-router-dom";

import { AppBar, MenuItem, Typography, Box } from "@mui/material";
import { lowerCase } from "lodash";

function Navbar() {
  const pages = ["Watchlist", "Portfolio", "Search", "Indeces"];
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AppBar position="static" style={{ marginBottom: "10px" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page) => {
          const isCurrentPage = location.pathname.includes(page);
          const backgroundColor = isCurrentPage ? "darkBlue" : undefined;
          return (
            <MenuItem
              key={page}
              onClick={() => navigate(`/${lowerCase(page)}`)}
              style={{ backgroundColor: backgroundColor }}
            >
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          );
        })}
      </Box>
    </AppBar>
  );
}

export default Navbar;
