import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
    addBasketItemAsync,
    removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const { basket, status } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();

    const product = useAppSelector((state) =>
        productSelectors.selectById(state, parseInt(id!))
    );
    const { status: productStatus } = useAppSelector((state) => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find((i) => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);

        if (!product) {
            dispatch(fetchProductAsync(parseInt(id!)));
        }
    }, [id, item, dispatch, product]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0)
            setQuantity(parseInt(event.currentTarget.value));
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            if (product) {
                dispatch(
                    addBasketItemAsync({
                        productId: product.id,
                        quantity: updateQuantity,
                    })
                );
            }
        } else {
            const updateQuantity = item.quantity - quantity;
            if (product) {
                dispatch(
                    removeBasketItemAsync({
                        productId: product.id,
                        quantity: updateQuantity,
                    })
                );
            }
        }
    }

    if (productStatus.includes("pending")) return <h3>Loading...</h3>;

    if (!product) return <h3>Product not found</h3>;

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img
                    src={product.pictureUrl}
                    alt={product.name}
                    style={{ width: "100%" }}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={
                                item?.quantity === quantity ||
                                (!item && quantity === 0)
                            }
                            loading={status.includes(
                                "pending"
                            )}
                            onClick={handleUpdateCart}
                            sx={{ height: "55px" }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? "Update Quantity" : "Add to cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
