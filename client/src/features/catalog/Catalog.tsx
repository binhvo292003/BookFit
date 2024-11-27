import { Product } from "../../app/model/product";

interface Props{
    products: Product[];
    addProduct: () => void;
}

export default function Catalog(props: Props) {
    return (
        <>
            <h1>Catalog</h1>
            <ul>
                {props.products.map((product: Product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
            <button onClick={props.addProduct}>Add Product</button>
        </>
    );
}