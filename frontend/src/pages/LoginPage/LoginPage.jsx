import { Button, Box } from "@mui/material";

export default function LoginPage() {
  const login = () => {
    window.open("http://localhost:3000/auth/google");
  };

  const ping = () => {
    fetch("http://localhost:3000/auth/status").then((res) => console.log(res));
  };

  return (
    <Box>
      <Button onClick={login}>Login</Button>
      <Button onClick={ping}>Ping</Button>
    </Box>
  );
}
