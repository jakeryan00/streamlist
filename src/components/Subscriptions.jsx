import products from "../Data";

function Subscriptions({ addToCart, warning }) {
  return (
    <main className="page">
      <h1>Subscriptions & Accessories</h1>

      {warning && <p className="warning">{warning}</p>}

      <section className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>

            <p>
              {product.type === "subscription"
                ? "Subscription Plan"
                : "EZTech Accessory"}
            </p>

            <p>${product.price.toFixed(2)}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Subscriptions;