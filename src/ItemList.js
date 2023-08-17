import { useContext, useState } from "react";
import { ItemContext } from './ItemContext';
import { GridActionsCellItem, GridRowModes} from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { StripedDataGrid } from './StripedDataGrid';
import { muiTheme } from './CreateTheme';
import './TrackerTable.css'

export default function ItemList() {

    const { itemList, setItemList } = useContext(ItemContext);

    const [rowModesModel, setRowModesModel] = useState({});
    
    // Handles the event when the row editing has started
    const handleRowEditStart = (params,event) => {
        event.defaultMuiPrevented = true;
    };

    // Handles the event when the row editing has stopped
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    // Handles the event when the row edit icon has been clicked
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    // Handles the event when the row save icon has been clicked
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    // Handles the event when the row cancel icon has been clicked
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    // Handles the event when the row delete icon has been clicked
    const handleDeleteClick = (id) => () => {
        setItemList(itemList.filter((row) => row.id !== id));
    };
    
    // Handles the event when the row needs to be updated
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setItemList(itemList.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    // Defines the columns for the data grid
    const columns= [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            headerClassName: 'MuiTableCell-head',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="error"
                    />
                ];
            },
        },        
        { field: 'item', headerName: 'Item', editable: true, width: 300, headerClassName: 'MuiTableCell-head', headerAlign: 'center', cellClassName: 'MuiTableCell-row' },
        { field: 'quantity', headerName: 'Quantity', editable: true, width: 200, headerClassName: 'MuiTableCell-head', headerAlign: 'center', cellClassName: 'MuiTableCell-row' },
    ];

    return (
        <><Typography
            style={{ background: muiTheme.palette.primary.mainGradient }}
            sx={{ p: 1 }}
            variant="h5"
            align='center'
            color='white'
        >
            Shopping List Items
        </Typography>
        <Box
            sx={{
                bgcolor: '#fff',
                border: "2px solid #bbb",
                boxShadow: 1,
                borderRadius: '16px',
                m: 1,
                p: 1,
                minWidth: 200,
                height: 500
            }}
        >
            <StripedDataGrid
                autoPageSize
                density='compact'
                disableColumnFilter={true}
                editMode="row"
                experimentalFeatures={{ newEditingApi: true }}
                rows={itemList}
                columns={columns}
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
                pageSize={10} 
            />
        </Box></>
    );

}
