import { Skeleton, Box } from "@mui/material";

export default function Loader({ number, width }) {
  const quantity = [...Array(number)];
  return (
    <Box width={width}>
      {quantity.map((el, index) => {
        const keyString = index.toString();
        return <Skeleton key={keyString} sx={{ marginBottom: 2 }} />;
      })}
    </Box>
  );
}
