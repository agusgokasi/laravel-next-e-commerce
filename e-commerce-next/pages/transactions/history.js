import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transaction History</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.product_name} - {transaction.type} - {transaction.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
