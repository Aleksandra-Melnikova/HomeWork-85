import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
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
} from "@mui/material";
import { TrackInterfaceWithoutID } from "../../../types";
import InputLabel from "@mui/material/InputLabel";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";

import { toast } from "react-toastify";
import { fetchAllAlbums } from "../../albums/albumsThunk.ts";
import { selectAllAlbums } from "../../albums/albumSlice.ts";

interface Props {
  onSubmit: (track: TrackInterfaceWithoutID) => void;
}

const initialState = {
  album: "",
  name: "",
  time: "",
  trackNumber: 0,
  isPublished: false,
  linkYouTube: "",
};

const TrackForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<TrackInterfaceWithoutID>(initialState);
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAllAlbums);

  useEffect(() => {
    dispatch(fetchAllAlbums());
  }, [dispatch]);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      form.album.trim().length === 0 ||
      form.name.trim().length === 0 ||
      form.time.trim().length === 0
    ) {
      toast.error("Album, title, time is required");
    } else if (form.trackNumber <= 0) {
      toast.error("TrackNumber cannot be less than 0.");
    } else {
      onSubmit({ ...form });
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const selectAlbumChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
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
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Typography my={3} component="h1" variant="h5">
            Add new track
          </Typography>
          <Grid container direction={"column"} size={8} spacing={2}>
            <Grid container direction="column" spacing={2}>
              {albums?.length === 0 ? null : (
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel id="artist">Album</InputLabel>
                    <Select
                      value={form.album}
                      id="album"
                      name="album"
                      required
                      label="album"
                      onChange={selectAlbumChangeHandler}
                    >
                      <MenuItem value="" disabled>
                        Select album
                      </MenuItem>
                      {albums?.map((a) => (
                        <MenuItem key={a._id} value={a._id}>
                          {a.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="name"
                  required
                  value={form.name}
                  onChange={inputChangeHandler}
                />
              </FormControl>
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="time"
                  name="time"
                  label="time"
                  required
                  value={form.time}
                  onChange={inputChangeHandler}
                />
              </FormControl>
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="number"
                  id="trackNumber"
                  name="trackNumber"
                  label="TrackNumber"
                  value={form.trackNumber}
                  onChange={inputChangeHandler}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id="linkYouTube"
                  name="linkYouTube"
                  label="linkYouTube"
                  value={form.linkYouTube}
                  onChange={inputChangeHandler}
                />
              </FormControl>
            </Grid>

            <Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default TrackForm;
