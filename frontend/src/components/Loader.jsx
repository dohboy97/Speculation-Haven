import { Skeleton, Box } from "@mui/material";

export default function Loader({ number }) {
  const quantity = [...Array(number)];
  return (
    <Box>
      {quantity.map((el, index) => {
        return (
          <Skeleton
            key={index}
            sx={{ marginBottom: 2 }}
            width="100%"
          ></Skeleton>
        );
      })}
    </Box>
  );
}
