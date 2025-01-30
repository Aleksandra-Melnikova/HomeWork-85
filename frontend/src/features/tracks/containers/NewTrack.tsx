import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { TrackInterfaceWithoutID } from "../../../types";
import AlbumForm from "../components/TrackForm.tsx";

import { createTrack } from "../tracksThunk.ts";
import { selectCreateTrackLoading } from "../trackSlice.ts";

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateTrackLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (track: TrackInterfaceWithoutID) => {
    try {
      await dispatch(createTrack(track)).unwrap();
      toast.success("Track was successfully created!");
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

export default NewTrack;
