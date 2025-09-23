import React from "react";
import "../Styles/Payment.css";

function Payment() {
  return (
    <div className="payment-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1>Payment</h1>
      <p>Pay for your service securely.</p>
      <button className="btn primary" style={{ minWidth: 160, margin: '1.5rem 0' }} onClick={() => alert('Payment successful!')}>Pay Now</button>
    </div>
  );
}

export default Payment;
