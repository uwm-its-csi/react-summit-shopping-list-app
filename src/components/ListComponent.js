import { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import RowComponent from "./RowComponent";

function ListComponent(props) {

    return (
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
                        {props.list.map((item, index) => {
                            return (
                                <RowComponent key={item.id}
                                            item={item}
                                            index={index}
                                            handleCheck={props.handleCheck}
                                            handleRemove={props.handleRemove} />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

    );
}

export default ListComponent;