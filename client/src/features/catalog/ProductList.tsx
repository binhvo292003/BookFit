import { Product } from '../../app/model/product';
import ProductCard from './ProductCard';
import { Grid } from '@material-ui/core';

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product: Product) => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}
