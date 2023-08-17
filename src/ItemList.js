import { useContext, useState } from "react";
import { ItemContext } from './ItemContext';
import { GridActionsCellItem, GridRowModes} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { StripedDataGrid } from './StripedDataGrid';

export default function ItemList() {

    const { itemList } = useContext(ItemContext);

    const [rowModesModel, setRowModesModel] = useState({});
    
    // Handles the event when the encounter row editing has started
    const handleRowEditStart = (params,event) => {
        event.defaultMuiPrevented = true;
    };

    // Handles the event when the encounter row editing has stopped
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    // Handles the event when the encounter row edit icon has been clicked
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    // Handles the event when the encounter row save icon has been clicked
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    // Handles the event when the encounter row cancel icon has been clicked
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    // Handles the event when the clinic row delete icon has been clicked
    const handleDeleteClick = (row) => () => {
        if (!window.confirm(`Are you sure you want to delete the item - ${row.item}?`)) {
            return;
        }
        console.log('deleting the item:', row.item);
    };
    
    // Handles the event when the encounter row needs to be updated
    const processRowUpdate = (newRow) => {
        console.log('processRowUpdate', newRow);
        //onUpdate(newRow);
        const updatedRow = { ...newRow, isNew: false };
        return updatedRow;
    };

    // Defines the columns for the data grid
    const columns= [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            headerClassName: 'MuiTableCell-head',
            width: 70,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
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
                        onClick={handleDeleteClick(row)}
                        color="error"
                    />
                ];
            },
        },        
        { field: 'item', headerName: 'Item', editable: true, width: 125, headerClassName: 'MuiTableCell-head', headerAlign: 'center', cellClassName: 'MuiTableCell-row' },
        { field: 'quantity', headerName: 'Quantity', editable: true, width: 250, headerClassName: 'MuiTableCell-head', headerAlign: 'center', cellClassName: 'MuiTableCell-row' },
    ];

    return (
        <Box
            sx={{
                bgcolor: '#fff',
                border: "2px solid #bbb",
                boxShadow: 1,
                borderRadius: '16px',
                m: 3,
                p: 1,
                minWidth: 200,
                height: 300
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
                getRowClassName={ (params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
                pageSize={10}
            />
        </Box>
    );

}
