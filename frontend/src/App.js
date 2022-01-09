import { useState, useEffect, useMemo } from "react";
import { Container, Typography, Box } from "@mui/material";
import BooksTable from "./Components/BooksTable";
import { getAllBooks } from "./Components/api";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import LoadingNewData from "./Components/Loading/LoadingNewData";
import ErrorInfo from "./Components/ErrorInfo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ThemeSwitch from "./Components/ThemeSwitch";

function App() {
  // // all books
  // const [books, setBooks] = useState([]);
  // const [error, setError] = useState("");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BooksManager client={queryClient} />
    </QueryClientProvider>
  );
}

function BooksManager({ client }) {
  // for dark/light mode, light by default
  const [mode, setMode] = useState("light");

  // get all books from the API
  const { isLoading, isError, data, error } = useQuery("books", getAllBooks);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // refresh the data when needed
  const handleRefreshOnClick = (e) => {
    // reinvalidate the query
    client.invalidateQueries("books");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <ThemeSwitch theme={theme} setMode={setMode} />
        <Container>
          <Typography variant="h2" component="h2" textAlign="center">
            Book Management System
          </Typography>
          <LoadingNewData isLoading={isLoading} />
          <ErrorInfo
            isError={isError}
            handleRefreshOnClick={handleRefreshOnClick}
          />
          <BooksTable
            books={data ? data.data : null}
            handleRefreshOnClick={handleRefreshOnClick}
            mode={mode}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
