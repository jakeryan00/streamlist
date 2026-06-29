import { useState } from "react";

function CreditCard() {
  const [card, setCard] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("savedCard")) || {
          name: "",
          number: "",
          expiration: "",
          cvv: "",
        }
      );
    } catch {
      localStorage.removeItem("savedCard");
      return {
        name: "",
        number: "",
        expiration: "",
        cvv: "",
      };
    }
  });

  function formatCardNumber(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiration(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setCard((currentCard) => ({
      ...currentCard,
      [name]:
        name === "number"
          ? formatCardNumber(value)
          : name === "expiration"
            ? formatExpiration(value)
            : name === "cvv"
              ? value.replace(/\D/g, "").slice(0, 4)
              : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(card.number)) {
      alert("Card number must follow this format: 1234 5678 9012 3456");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(card.expiration)) {
      alert("Expiration date must follow this format: MM/YY");
      return;
    }

    if (!/^\d{3,4}$/.test(card.cvv)) {
      alert("CVV must be 3 or 4 digits.");
      return;
    }

    localStorage.setItem("savedCard", JSON.stringify(card));
    alert("Credit card saved successfully.");
  }

  return (
    <main className="page">
      <section className="movie-card payment-card">
        <h1>Credit Card Management</h1>

        <p>
          Enter payment information to complete checkout. For this class
          project, card information is saved to localStorage to demonstrate data
          persistence. In a real production system, EZTechMovie should use a
          PCI-compliant payment processor and tokenization instead of storing
          card data in the browser.
        </p>

        <form onSubmit={handleSubmit} className="card-form">
          <label htmlFor="name">
            Name on Card
            <input
              id="name"
              name="name"
              value={card.name}
              onChange={handleChange}
              placeholder="Jacob Ovalle"
              autoComplete="cc-name"
              required
            />
          </label>

          <label htmlFor="number">
            Card Number
            <input
              id="number"
              name="number"
              value={card.number}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              inputMode="numeric"
              autoComplete="cc-number"
              required
            />
          </label>

          <label htmlFor="expiration">
            Expiration Date
            <input
              id="expiration"
              name="expiration"
              value={card.expiration}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              inputMode="numeric"
              autoComplete="cc-exp"
              required
            />
          </label>

          <label htmlFor="cvv">
            CVV
            <input
              id="cvv"
              name="cvv"
              value={card.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength="4"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
            />
          </label>

          <button type="submit">Save Card</button>
        </form>
      </section>
    </main>
  );
}

export default CreditCard;