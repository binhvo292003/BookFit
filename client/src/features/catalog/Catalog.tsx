import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!productsLoaded){
            dispatch(fetchProductsAsync());
        }
    }, [productsLoaded, dispatch]);

    if (status.includes('pending')) return <LoadingComponent message="Loading Products" />;

    return (
        <>
            <ProductList products={products} />
        </>
    );
}
