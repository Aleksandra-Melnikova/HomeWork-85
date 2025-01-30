import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import ArtistForm from "../components/ArtistForm.tsx";
import { selectCreateLoading } from "../artistSlice.ts";
import { ArtistMutation } from "../../../types";
import { createArtist } from "../artistsThunk.ts";

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (artist: ArtistMutation) => {
    try {
      await dispatch(createArtist(artist)).unwrap();
      toast.success("Artist was successfully created!");
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
        <ArtistForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewArtist;
