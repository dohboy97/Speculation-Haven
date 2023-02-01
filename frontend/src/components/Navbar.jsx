import { useLocation, useNavigate } from "react-router-dom";

import { AppBar, MenuItem, Typography, Box } from "@mui/material";
import { style } from "@mui/system";

function Navbar() {
  const pages = ["watchlist", "portfolio", "search", "gainers"];
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
              onClick={() => navigate(`/${page}`)}
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
