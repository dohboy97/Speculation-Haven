import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function Header() {
  return (
    <Box>
      <Typography marginBottom={4} marginTop={4} variant="h2">
        Speculation Station
      </Typography>
      <Navbar />
    </Box>
  );
}

export default Header;
