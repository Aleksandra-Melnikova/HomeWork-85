import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Grid from "@mui/material/Grid2";
import { Artist} from "../../types";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {fetchAdminArtists} from "./AdminArtistsThunk.ts";
import {selectAdminArtists} from "./AdminArtistSlice.ts";


const AdminArtistList = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchAdminArtists());
    },[dispatch]);


    const artists = useAppSelector(selectAdminArtists);
    const columns: GridColDef<Artist>[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'name',
            width: 150,
            editable:false,
        },
        {
            field: 'isPublished',
            headerName: 'Published',
            type: 'boolean',
            width: 130,
            sortable:false,
            editable:false,
            filterable:false,
            renderCell: ({ row }) => (
                row.isPublished ? <Button  variant={"contained"}>Publish</Button> : <span>Already published</span>
            )
        },
        {
            field: 'Actions',
            headerName: '',
            type: 'number',
            width: 100,
            sortable:false,
            editable:false,
            filterable:false,
            renderCell:()=>(
                <><IconButton><ClearIcon/></IconButton></>
            )
        }

    ];
    return (
        <Grid>

            {artists ? (  <DataGrid
                    getRowId={(row)=> row._id}
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
            ):null}

        </Grid>
    );
};

export default AdminArtistList;
