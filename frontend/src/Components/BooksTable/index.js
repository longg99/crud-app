import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import AddOrUpdateBook from "../AddOrUpdateBook";
import { addBook, deleteBook, updateBook } from "../api";
import ErrorInfo from "../ErrorInfo";

export default function BooksTable({ books, handleRefreshOnClick, mode }) {
  // selected row
  const [selected, setSelected] = useState([]);
  // open add form
  const [openAddForm, setOpenAddForm] = useState(false);
  // is editing or not?
  const [isEditing, setIsEditing] = useState(false);

  // get the query client form the context
  const queryClient = useQueryClient();
  // hook to add new book
  const addBookMutation = useMutation((book) => addBook(book), {
    // invalidate the books query on success
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
  // to delete books
  const deleteBooksMutation = useMutation((book) => deleteBook(book), {
    // invalidate the books query on success
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });
  // update the selected book
  const updateBookMutation = useMutation((book) => updateBook(book), {
    // invalidate the books query on success
    onSuccess: () => {
      queryClient.invalidateQueries("books");
    },
  });

  if (!books) return null;

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "bookName",
      headerName: "Book Name",
      width: 250,
    },
    {
      field: "author",
      headerName: "Author",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 150,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 90,
    },
  ];

  const handleCloseAddForm = () => {
    // close the form and set the submitted state
    setOpenAddForm(false);
  };

  // on submitting a new book
  const handleSubmit = (newBook, isEditing) => {
    // send the new book to the server
    // not editing
    if (!isEditing) addBookMutation.mutate(newBook);
    // else update the existing book
    else {
      // the id comes from the selected array
      updateBookMutation.mutate({
        ...newBook,
        id: selected[0].id,
      });
    }
  };

  // on deleting the books
  const handleDelete = () => {
    // delete all the element from the selected
    // pass all the id from the selected array
    selected.forEach((book) => deleteBooksMutation.mutate(book.id));
    // reset selected
    setSelected([]);
  };

  // on updating a book
  const handleUpdate = () => {
    setIsEditing(true);
    // show the form
    setOpenAddForm(true);
  };

  return (
    <div
      sx={{
        display: "flex",
      }}
    >
      {/* if there is an error, return the errorInfo */}
      {addBookMutation.isError ||
      deleteBooksMutation.isError ||
      updateBookMutation.isError ? (
        <ErrorInfo
          isError={true}
          handleRefreshOnClick={() => {
            handleRefreshOnClick();
            // reset mutations
            addBookMutation.reset();
            deleteBooksMutation.reset();
            updateBookMutation.reset();
          }}
        />
      ) : (
        <div>
          <div style={{ height: "45vh", width: "100%", marginTop: "2vh" }}>
            <DataGrid
              rows={books}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection={true}
              loading={
                addBookMutation.isLoading ||
                deleteBooksMutation.isLoading ||
                updateBookMutation.isLoading
              }
              onSelectionModelChange={(ids) => {
                // new set of ids
                const selectedIds = new Set(ids);
                // find the book(s) based on the given id
                const selectedRowData = books.filter((book) =>
                  selectedIds.has(book.id)
                );
                // set the selected
                setSelected(selectedRowData);
              }}
            />
          </div>
          <AddOrUpdateBook
            open={openAddForm}
            handleClose={handleCloseAddForm}
            handleSubmit={handleSubmit}
            setOpenAddForm={setOpenAddForm}
            selectedBook={selected.length === 1 ? selected[0] : null}
            isEditing={isEditing}
            mode={mode}
          />
          <Stack
            sx={{ width: "100%", mt: "2vh" }}
            direction="row"
            alignItems="flex-start"
            columnGap={1}
          >
            <Button
              size="small"
              onClick={() => {
                setOpenAddForm(true);
                setIsEditing(false);
              }}
            >
              Add a new book
            </Button>
            <Button size="small" onClick={handleRefreshOnClick}>
              Refresh Data
            </Button>
            <Button
              size="small"
              onClick={handleUpdate}
              disabled={selected.length !== 1}
            >
              Update selected book
            </Button>
            <Button
              size="small"
              onClick={handleDelete}
              disabled={selected.length < 1}
            >
              Delete selected book(s)
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}
