import { Stack, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingNewData({ isLoading }) {
  if (!isLoading) return null;
  return (
    <Stack sx={{ marginTop: "2vh" }}>
      <Typography variant="h6" component="p">
        Please wait, data is loading...
      </Typography>
      <LinearProgress />
    </Stack>
  );
}
