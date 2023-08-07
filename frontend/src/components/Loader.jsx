import { Skeleton, Box } from "@mui/material";

export default function Loader({ number }) {
  const quantity = [...Array(number)];
  return (
    <Box>
      {quantity.map((el, index) => {
        const keyString = index.toString();
        return (
          <Skeleton key={keyString} sx={{ marginBottom: 2 }} width="100%" />
        );
      })}
    </Box>
  );
}
