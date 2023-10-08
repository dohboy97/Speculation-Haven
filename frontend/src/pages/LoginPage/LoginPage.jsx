import { Button, Box, Typography } from "@mui/material";

export default function LoginPage() {
  const login = () => {
    window.open("http://localhost:3000/auth/google");
    window.close();
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2">Speculation Station</Typography>
        <Typography variant="h6">Learn to trade via paper trading!</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Please login to continue</Typography>
        <Button onClick={login}>Login</Button>
      </Box>
    </Box>
  );
}
