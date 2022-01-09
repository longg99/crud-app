import { Button, Alert } from "@mui/material";

export default function ErrorInfo({ isError, handleRefreshOnClick }) {
  // return nothing if no errors
  if (!isError) return null;
  return (
    <div>
      <Alert
        severity="error"
        variant="outlined"
        action={
          <Button size="small" onClick={handleRefreshOnClick}>
            Try again
          </Button>
        }
      >
        An error has occurred. Please try again later.
      </Alert>
    </div>
  );
}
