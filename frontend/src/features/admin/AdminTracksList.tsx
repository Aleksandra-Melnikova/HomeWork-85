import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Grid from "@mui/material/Grid2";
import { TrackAdmin} from "../../types";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {fetchAdminTracks} from "./AdminTracksThunk.ts";
import {selectAdminTracks} from "./AdminTrackSlice.ts";


const AdminTracksList = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchAdminTracks());
    },[dispatch]);


    const tracks = useAppSelector(selectAdminTracks);
    const columns: GridColDef<TrackAdmin>[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'album',
            headerName: 'album',
            width: 150,
            editable:false,
            valueGetter: (_value:string, row: TrackAdmin) => row.album.title ,
        },
        {
            field: 'name',
            headerName: 'name',
            width: 150,
            editable:false,
        },
        {
            field: 'time',
            headerName: 'time',
            width: 110,
            sortable:true,
            editable:false,
        },
        {
            field: 'trackNumber',
            headerName: 'trackNumber',
            type: 'number',
            width: 110,
            sortable:true,
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

            {tracks ? (  <DataGrid
                    getRowId={(row)=> row._id}
                    rows={tracks}
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

export default AdminTracksList ;