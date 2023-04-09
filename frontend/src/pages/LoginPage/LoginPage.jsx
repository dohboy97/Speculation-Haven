import { Button, Box } from "@mui/material";

export default function LoginPage() {
  const login = () => {
    window.open("http://localhost:3000/auth/google");
  };

  const ping = async () => {
    const res = await fetch("/auth/status");
    const userData = await res.json();
    console.log(userData);
  };

  return (
    <Box>
      <Button onClick={login}>Login</Button>
      <Button onClick={ping}>Ping</Button>
    </Box>
  );
}
