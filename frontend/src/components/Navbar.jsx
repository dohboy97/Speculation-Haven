import { Link, useNavigate } from "react-router-dom";

import { AppBar, MenuItem, Typography, Box } from "@mui/material";

function Navbar() {
  const pages = ["watchlist", "portfolio", "search", "gainers"];
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <MenuItem key={page} onClick={() => navigate(`/${page}`)}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Box>
    </AppBar>
  );
}

export default Navbar;
