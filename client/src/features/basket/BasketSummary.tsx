import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import { formatCurrency } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
    const { basket } = useAppSelector( state => state.basket);

    const subtotal =
        basket?.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ) || 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <>
            <TableContainer component={Paper} variant={"outlined"}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">
                                {formatCurrency(subtotal)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">
                                {formatCurrency(deliveryFee)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">
                                {formatCurrency(subtotal + deliveryFee)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: "italic" }}>
                                    *Orders over $100 qualify for free delivery
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
