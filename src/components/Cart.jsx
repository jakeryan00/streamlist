import { Link } from "react-router-dom";

function Cart({ cart = [], increaseQuantity, decreaseQuantity, removeFromCart }) {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <main className="page">
        <section className="movie-card">
          <h1>Shopping Cart</h1>
          <p>Your cart is currently empty.</p>

          <Link to="/subscriptions">
            <button type="button">View Subscriptions</button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Shopping Cart</h1>

      <section className="cart-list" aria-label="Shopping cart items">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>
              <strong>Price:</strong> ${item.price.toFixed(2)}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>

            <div className="cart-actions">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                -
              </button>

              <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="movie-card cart-summary">
        <h2>Cart Total</h2>
        <p>
          <strong>${total.toFixed(2)}</strong>
        </p>

        <Link to="/credit-card">
          <button type="button">Proceed to Checkout</button>
        </Link>
      </section>
    </main>
  );
}

export default Cart;