import { useEffect, useState } from "react";
import ProductShowcase from "./ProductShowcase";
import { CiShoppingCart } from "react-icons/ci";


const Home = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setOriginalProducts(data.products);
                setFilteredProducts(data.products);
            });
    }, []);

    const handleSearch = () => {
        const filtered = originalProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleFilterChange = (e) => {
        setPriceFilter(e.target.value);

        switch (e.target.value) {
            case '1-300':
                filterProductsByPrice(1, 300);
                break;
            case '301-600':
                filterProductsByPrice(301, 600);
                break;
            case '600+':
                filterProductsByPrice(600, Infinity);
                break;
            default:
                setFilteredProducts(originalProducts);
        }
    };

    const filterProductsByPrice = (min, max) => {
        const filtered = originalProducts.filter(product =>
            product.price >= min && product.price <= max
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <div className="flex justify-center items-center space-x-4 my-4">
                <input
                    type="text"
                    placeholder="Search here"
                    className="input input-bordered input-success w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn" onClick={handleSearch}>
                    Search
                </button>
                <select
                    value={priceFilter}
                    onChange={handleFilterChange}
                    className="select select-bordered select-success"
                >
                    <option value="">Filter by Price</option>
                    <option value="1-300">1-300</option>
                    <option value="301-600">301-600</option>
                    <option value="600+">600+</option>
                </select>

                <button className="btn">
                    <CiShoppingCart className="text-2xl text-success"></CiShoppingCart>
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </div>
            <div className="grid grid-cols-3 gap-8 mx-auto">
                {filteredProducts.map(product => (
                    <ProductShowcase key={product.id} product={product} cart={cart} setCart={setCart} />
                ))}
            </div>
        </div>
    );
};

export default Home;
