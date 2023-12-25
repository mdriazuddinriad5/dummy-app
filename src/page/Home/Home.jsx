import { useEffect, useState } from "react";
import ProductShowcase from "./ProductShowcase";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, [])
    return (
        <div>
            <div>
                <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" />
                <button className="btn">Search</button>
            </div>
            <div className="grid grid-cols-3 gap-8 mx-auto">
                {
                    products.map(product => (
                        <ProductShowcase key={product.id} product={product}></ProductShowcase>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;