import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import {AlbumMutation} from "../../../types";
import AlbumForm from "../components/AlbumForm.tsx";
import {selectCreateAlbumLoading} from "../albumSlice.ts";
import {createAlbum} from "../albumsThunk.ts";


const NewArtist = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateAlbumLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (album: AlbumMutation) => {
    try {
      await dispatch(createAlbum(album)).unwrap();
      toast.success("Album was successfully created!");
      navigate("/artists");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isCreateLoading ? (
        <CircularProgress />
      ) : (
        <AlbumForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewArtist;
