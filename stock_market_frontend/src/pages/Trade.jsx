import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Trade() {
  const [stockName, setStockName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('buy');
  const navigate = useNavigate();

  const logs = [
    { type: 'profit', message: 'Bought 10 shares of AAPL at ₹1500' },
    { type: 'loss', message: 'Sold 5 shares of TSLA at ₹1200 (loss)' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = stockName.trim();
    const qty = parseInt(quantity);

    if (!trimmedName) {
      toast.error('⚠️ Stock name is required');
      return;
    }
    if (isNaN(qty) || qty <= 0) {
      toast.error('⚠️ Quantity must be a positive number');
      return;
    }

    toast.success(`✅ Trade executed: ${action.toUpperCase()} ${qty} shares of ${trimmedName}`);

    setStockName('');
    setQuantity('');
    setAction('buy');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('👋 Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📈 Trade Stocks</h2>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow trade-form"
        style={{ maxWidth: '500px', margin: 'auto' }}
      >
        <div className="mb-3">
          <label htmlFor="stockName" className="form-label">Stock Name</label>
          <input
            type="text"
            id="stockName"
            className="form-control"
            placeholder="e.g. TCS"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="action" className="form-label">Action</label>
          <select
            id="action"
            className="form-select"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <button type="submit" className="btn btn-warning w-100">
          🚀 Execute Trade
        </button>
      </form>
      

      <div className="text-center mt-4">
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          🔒 Logout
        </button>
      </div>

    

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Trade;