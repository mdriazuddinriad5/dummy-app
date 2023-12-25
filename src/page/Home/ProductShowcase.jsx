const ProductShowcase = ({ product }) => {
    const { title, description, thumbnail, price, discountPercentage, rating, stock, brand, category, images } = product;

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <figure className="mb-4">
                <img className="h-48 rounded-md" src={thumbnail} alt={title} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-primary">Price: ${price}</p>
                {discountPercentage && <p className="text-accent">Discount: {discountPercentage}% off</p>}
                <p className="text-yellow-400">Rating: {rating}/5</p>
                <p>Stock: {stock}</p>
                <p>Brand: {brand}</p>
                <p>Category: {category}</p>
                {images && images.length > 0 && (
                    <div className="mt-4">
                        <p className="mb-2 text-gray-700">Additional Images:</p>
                        <div className="flex space-x-2">
                            {images.map((image, index) => (
                                <img key={index} src={image} alt={`Image ${index + 1}`} className="w-16 h-16 rounded-md" />
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
