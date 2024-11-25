import { useEffect, useState } from 'react';
import { Product } from './product';

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
        <div>
            <h1>Football</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
            <button onClick={addProduct}>Add Product</button>
        </div>
    );
}

export default App;
