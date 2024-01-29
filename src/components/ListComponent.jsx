import { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { AppContext } from '../root/AppContext';
import RowComponent from "./RowComponent";
import { TotalComponent } from './TotalComponent';

function ListComponent() {
    const {
        list,
        handleCheck,
        handleRemove,
        handleSaveList,
    } = useContext(AppContext);


    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item, index) => {
                            return (
                                <RowComponent key={item.id}
                                            item={item}
                                            index={index}
                                            handleCheck={handleCheck}
                                            handleRemove={handleRemove} />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TotalComponent />
            <Button variant='contained' onClick={handleSaveList}>Save</Button>
        </Box>
    );
}

export default ListComponent;