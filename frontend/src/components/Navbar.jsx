import { useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  MenuItem,
  Button,
  Typography,
  Box,
  Avatar
} from "@mui/material";
import { lowerCase } from "lodash";
import { useContext } from "react";
import { UserContext } from "../context";

function LogoutButton({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch("/auth/logout")
      .catch((err) => console.error(err))
      .finally(() => {
        navigate("/");
        setUser(undefined);
      });
  };

  return (
    <Button variant="text" sx={{ color: "white" }} onClick={handleLogout}>
      Logout
    </Button>
  );
}

function Navbar({ setUser }) {
  const pages = ["Watchlist", "Portfolio", "Search", "Indeces"];
  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(UserContext);
  return (
    <AppBar position="static" style={{ marginBottom: "10px" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "space-between"
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" }
          }}
        >
          {pages.map((page) => {
            const isCurrentPage = location.pathname.includes(page);
            const backgroundColor = isCurrentPage ? "darkBlue" : undefined;
            return (
              <MenuItem
                key={page}
                onClick={() => navigate(`/${lowerCase(page)}`)}
                style={{ backgroundColor }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            );
          })}
        </Box>
        <Box sx={{ display: "flex" }} marginRight={4}>
          <Avatar alt="User img" src={user.image} />
          <LogoutButton setUser={setUser} />
        </Box>
      </Box>
    </AppBar>
  );
}

export default Navbar;
