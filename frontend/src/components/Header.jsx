import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function Header() {
  return (
    <header>
      <Typography marginBottom={4} marginTop={4} variant="h2">
        Speculation Station
      </Typography>
      <Navbar />
    </header>
  );
}

export default Header;
