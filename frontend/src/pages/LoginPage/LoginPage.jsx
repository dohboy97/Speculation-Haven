import { Button, Box, Typography } from "@mui/material";

export default function LoginPage() {
  const login = () => {
    window.open("http://localhost:3000/auth/google");
    window.close();
  };

  return (
    <Box>
      <Typography>Please login to continue</Typography>
      <Button onClick={login}>Login</Button>
    </Box>
  );
}
