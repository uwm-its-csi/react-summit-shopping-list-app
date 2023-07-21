import { TableCell, TableRow, Button, Checkbox } from "@mui/material";

function RowComponent(props) {

    const itemElement = props.item.checked ? <s>{props.item.name}</s> : props.item.name;

    return(
        <TableRow key={props.item.name}>
            <TableCell>
                <Checkbox id={"chk-" + props.index} onChange={() => props.handleCheck(props.item.id)} checked={props.item.checked} />
            </TableCell>
            <TableCell>
                {itemElement}
            </TableCell>
            <TableCell>
                {props.item.quantity}
            </TableCell>
            <TableCell>
                <Button variant='outlined' id={"rmv-" + props.index} onClick={() => props.handleRemove(props.index)}>Remove</Button>
            </TableCell>
        </TableRow>
    )
}

export default RowComponent;