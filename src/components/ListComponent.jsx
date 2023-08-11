import { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AppContext } from '../root/AppContext';
import RowComponent from "./RowComponent";
import { TotalComponent } from './TotalComponent';

function ListComponent() {
    const {
        list,
        handleCheck,
        handleRemove
    } = useContext(AppContext);


    return (
        <>
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
        </>
    );
}

export default ListComponent;