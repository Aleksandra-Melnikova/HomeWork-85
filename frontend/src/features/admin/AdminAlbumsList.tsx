import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAdminAllAlbums} from "./AdminAlbumsThunk.ts";
import {selectAllAdminAlbums} from "./AdminAlbumSlice.ts";
import Grid from "@mui/material/Grid2";
import {Album} from "../../types";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';


const AdminAlbumsList = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchAdminAllAlbums());
    },[dispatch]);


    const albums = useAppSelector(selectAllAdminAlbums);
    const columns: GridColDef<Album>[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'Artist',
            headerName: 'Artist',
            width: 150,
            editable:false,
            valueGetter: (_value:string, row: Album) => row.artist.name ,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable:false,
        },
        {
            field: 'year',
            headerName: 'Year',
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

            {albums ? (  <DataGrid
                    getRowId={(row)=> row._id}
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
            ):null}

        </Grid>
    );
};

export default AdminAlbumsList;