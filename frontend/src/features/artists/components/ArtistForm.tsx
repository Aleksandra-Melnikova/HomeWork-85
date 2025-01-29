import React, {ChangeEvent, FormEvent, useState} from 'react';
import Grid from '@mui/material/Grid2';
import {ArtistMutation} from "../../../types";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {toast} from "react-toastify";


interface Props {
  onSubmit: (artist: ArtistMutation) => void;
}

const initialState = {
 name:'',
  image: null,
  description:'',
  isPublished: false,

};

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ArtistMutation>(initialState);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
      if(form.name.trim().length === 0) {
          toast.error("Name is required");
      }
      else{
          onSubmit({ ...form });
      }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
      <Container component="main" maxWidth="xs">
          <Box
              sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
              }}
          >
      <Box
          component="form"
          onSubmit={submitFormHandler}
          sx={{ mt: 3 }}
      >
      <Typography my={3} component="h1" variant="h5">
        Add new artist
      </Typography>
      <Grid container direction={"column"} size={8} spacing={2}>
        <Grid  size={12}>
          <TextField
              fullWidth={true}
            id="name"
            name="name"
            label="Name"
            // required
            value={form.name}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={12}>
          <TextField
              fullWidth={true}
            multiline
            id="description"
            name="description"
            label="Description"
            value={form.description}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={12}>
          <FileInput
            name="image"
            label="Image"
            onGetFile={fileEventChangeHandler}
          />
        </Grid>

        <Grid>
          <Button type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Grid>
      </Grid>
      </Box>
          </Box>
          </Container>
  );
};

export default ArtistForm;
