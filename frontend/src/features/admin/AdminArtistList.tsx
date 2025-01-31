import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Grid from "@mui/material/Grid2";
import { Artist } from "../../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  deleteAdminArtist,
  fetchAdminArtists,
  publishAdminArtist,
} from "./AdminArtistsThunk.ts";
import { selectAdminArtists } from "./AdminArtistSlice.ts";
import { NavLink } from "react-router-dom";

const AdminArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectAdminArtists);
  useEffect(() => {
    dispatch(fetchAdminArtists());
  }, [dispatch]);

  const fetchAllArtist = async () => {
    await dispatch(fetchAdminArtists());
  };

  useEffect(() => {
    void fetchAllArtist();
  }, [dispatch]);

  const deleteArtist = async (id: string) => {
    await dispatch(deleteAdminArtist(id));
    void fetchAllArtist();
  };

  const publishArtist = async (id: string) => {
    await dispatch(publishAdminArtist(id));
    void fetchAllArtist();
  };

  const columns: GridColDef<Artist>[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "name",
      width: 150,
      editable: false,
    },
    {
      field: "isPublished",
      headerName: "Published",
      type: "boolean",
      width: 130,
      sortable: false,
      editable: false,
      filterable: false,
      renderCell: ({ row }) =>
        !row.isPublished ? (
          <Button
            onClick={() => {
              publishArtist(row._id);
            }}
            variant={"contained"}
          >
            Publish
          </Button>
        ) : (
          <span>Already published</span>
        ),
    },
    {
      field: "Actions",
      headerName: "",
      type: "number",
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <>
          <IconButton
            onClick={() => {
              deleteArtist(row._id);
            }}
          >
            <ClearIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Grid marginTop={"20px"}>
      <Box marginBottom={"20px"}>
        <Button variant={"contained"} component={NavLink} to={"/artists/new"}>
          Add New Artist
        </Button>
      </Box>

      {artists ? (
        <DataGrid
          getRowId={(row) => row._id}
          rows={artists}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : null}
    </Grid>
  );
};

export default AdminArtistList;
