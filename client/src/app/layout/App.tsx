import { useEffect, useState } from 'react';
import { Product } from '../model/product';
import Catalog from '../../features/catalog/Catalog';
import { Container, CssBaseline } from '@mui/material';
import Header from './Header';
function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    function addProduct() {
        setProducts((prevState) => [
            ...prevState,
            {
                id: prevState.length + 101,
                name: 'product' + (prevState.length + 1),
                price: 1000 + prevState.length,
                brand: 'brand a',
                description: 'description a',
                pictureUrl: 'https://via.placeholder.com/150',
            },
        ]);
    }

    return (
        <>
            <CssBaseline />
            <Header />
            <Container>
                <Catalog products={products} addProduct={addProduct} />
            </Container>
        </>
    );
}

export default App;
