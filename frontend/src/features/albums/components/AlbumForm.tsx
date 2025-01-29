import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import {AlbumMutation} from '../../../types';
import InputLabel from '@mui/material/InputLabel';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {selectArtists} from "../../artists/artistSlice.ts";
import {fetchArtists} from "../../artists/artistsThunk.ts";
import {toast} from "react-toastify";



interface Props {
  onSubmit: (album: AlbumMutation) => void;
}

const initialState = {
  artist: "",
  title: "",
  year: 0,
 isPublished: false,
  image: null,
};

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<AlbumMutation>(initialState);
  const dispatch = useAppDispatch();

  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    if(form.artist.trim().length === 0 || form.title.trim().length === 0 ) {
      toast.error("Artist and title is required");}
      else if(form.year <= 1900 || form.year > new Date().getFullYear()) {
      toast.error("Year cannot be less than 1900 and more than the current year.");
      }
    else{
      onSubmit({ ...form });
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

    // const onInputSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     console.log(e.target);
    //     let artistID: string;
    //     artists.map((a) => {
    //         if (a.name === value) artistID = a._id;
    //     });
    //     setForm((prevState: AlbumMutation) => ({
    //         ...prevState,
    //         [name]: artistID,
    //     }));
    // };

    const selectChangeHandler = (e: SelectChangeEvent) => {
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
              Add new album
            </Typography>
            <Grid container direction={"column"} size={8} spacing={2}>
                <Grid container direction="column" spacing={2}>
                    {artists.length === 0 ? null : (
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel id="artist">Artist</InputLabel>
                                <Select
                                    value={form.artist}
                                    id="artist"
                                    name="artist"
                                    required
                                    label="Artist"
                                    onChange={selectChangeHandler}
                                >
                                    <MenuItem value="" disabled>
                                        Select category
                                    </MenuItem>
                                    {artists.map((a) => (
                                        <MenuItem key={a._id} value={a._id}>
                                            {a.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                    )}
                </Grid>
        <Grid size={ 12 }>
          <TextField
              fullWidth
            id="title"
            name="title"
            label="Title"
            required
            value={form.title}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={12}>
            <TextField
                fullWidth
                type="number"
                id="year"
                name="year"
                label="Year"
                value={form.year}
                onChange={inputChangeHandler}
                slotProps={{
                    htmlInput: {
                        min: 1900,
                        max: new Date().getFullYear(),
                    },
                }}
            />
        </Grid>

        <Grid size={ 12 }>
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
