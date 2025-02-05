import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  deleteAdminAlbums,
  fetchAdminAllAlbums,
  publishAdminAlbums,
} from "./AdminAlbumsThunk.ts";
import { selectAllAdminAlbums } from "./AdminAlbumSlice.ts";
import Grid from "@mui/material/Grid2";
import { Album } from "../../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";

const AdminAlbumsList = () => {
  const dispatch = useAppDispatch();

  const fetchAllAlbums = useCallback(() => {
    dispatch(fetchAdminAllAlbums());
  }, [dispatch]);

  useEffect(() => {
    void fetchAllAlbums();
  }, [dispatch, fetchAllAlbums]);

  useEffect(() => {
    void fetchAllAlbums();
  }, [dispatch, fetchAllAlbums]);
  const deleteAlbum = async (id: string) => {
    await dispatch(deleteAdminAlbums(id));
    void fetchAllAlbums();
  };
  const publishAlbum = async (id: string) => {
    await dispatch(publishAdminAlbums(id));
    void fetchAllAlbums();
  };

  const albums = useAppSelector(selectAllAdminAlbums);
  const columns: GridColDef<Album>[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "Artist",
      headerName: "Artist",
      width: 150,
      editable: false,
      valueGetter: (_value: string, row: Album) => row.artist.name,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: false,
    },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 110,
      sortable: true,
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
              publishAlbum(row._id);
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
              deleteAlbum(row._id);
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
        <Button variant={"contained"} component={NavLink} to={"/albums/new"}>
          Add New Album
        </Button>
      </Box>

      {albums ? (
        <DataGrid
          getRowId={(row) => row._id}
          rows={albums}
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

export default AdminAlbumsList;
