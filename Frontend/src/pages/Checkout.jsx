

import React from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.title}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
