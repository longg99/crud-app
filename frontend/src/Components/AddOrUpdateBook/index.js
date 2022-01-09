import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function AddOrUpdateBook({
  open,
  handleClose,
  handleSubmit,
  selectedBook,
  isEditing,
  mode,
}) {
  // states for info of the book to send to the server
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);
  const [formValid, setFormValid] = useState(true);

  // get the book to be edited if there's any
  useEffect(() => {
    if (selectedBook && isEditing) {
      setBookName(selectedBook.bookName);
      setAuthor(selectedBook.author);
      setDescription(selectedBook.description);
      setGenre(selectedBook.genre);
      setRating(selectedBook.rating);
    } else {
      setBookName("");
      setAuthor("");
      setDescription("");
      setGenre("");
      setRating(1);
    }
  }, [selectedBook, isEditing]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // validate form before submitting
  const validate = () => {
    // validate all fields
    if (
      bookName !== "" &&
      author !== "" &&
      description !== "" &&
      genre !== ""
    ) {
      setFormValid(true);
      return true;
    } else setFormValid(false);
    return false;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            textAlign="center"
            marginBottom={2}
            color={mode === "light" ? "black" : "white"}
          >
            Add/Update a Book
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-bookName"
                label="Book Name"
                variant="outlined"
                inputProps={{ maxLength: 70 }}
                fullWidth
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                error={!formValid && bookName === ""}
                helperText={
                  !formValid && bookName === ""
                    ? "Book name must not be empty!"
                    : " "
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-author"
                label="Author"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                error={!formValid && author === ""}
                helperText={
                  !formValid && author === ""
                    ? "Author name must not be empty!"
                    : " "
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-desc"
                label="Description (100 characters max.)"
                inputProps={{ maxLength: 100 }}
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!formValid && description === ""}
                helperText={
                  !formValid && description === ""
                    ? "Book description must not be empty!"
                    : " "
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-genre"
                label="Genre"
                variant="outlined"
                fullWidth
                value={genre}
                inputProps={{ maxLength: 50 }}
                onChange={(e) => setGenre(e.target.value)}
                error={!formValid && genre === ""}
                helperText={
                  !formValid && genre === ""
                    ? "Book genre must not be empty!"
                    : " "
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                component="legend"
                color={mode === "light" ? "black" : "white"}
              >
                Rating
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newRating) => {
                  setRating(newRating);
                }}
                max={10}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }} textAlign="center">
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
              onClick={() => {
                // validate upon submit
                const valid = validate();
                // if not valid, then do nothing
                if (valid) {
                  // set the book obj to submit
                  handleSubmit(
                    {
                      bookName: bookName,
                      author: author,
                      description: description,
                      genre: genre,
                      rating: rating,
                    },
                    isEditing
                  );
                  // reset all states if not editing
                  if (!isEditing) {
                    setBookName("");
                    setAuthor("");
                    setDescription("");
                    setGenre("");
                    setRating(1);
                  }
                  // close the modal
                  handleClose();
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
