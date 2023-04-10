import { Button, Box } from "@mui/material";

export default function LoginPage() {
  const login = () => {
    window.open("http://localhost:3000/auth/google");
  };

  return (
    <Box>
      <Button onClick={login}>Login</Button>
    </Box>
  );
}
