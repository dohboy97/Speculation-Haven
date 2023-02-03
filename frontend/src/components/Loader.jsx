import { Skeleton, Box } from "@mui/material";

export default function Loader({ number }) {
  const quantity = [...Array(number)];
  return (
    <Box>
      {quantity.map((el) => {
        return <Skeleton width="40%"></Skeleton>;
      })}
    </Box>
  );
}
