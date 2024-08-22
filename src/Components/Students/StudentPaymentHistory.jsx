import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const id = localStorage.getItem('user');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${baseUrl}student/paymenthistory/${id}`);
        console.log(response.data);
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment history:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-base-content">Payment History</h1>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            {
                    payments.length===0 && <h1 className="text-3xl font-bold text-gray-800 mb-6">No Payments</h1>
                }
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>${payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        payment.status === 'Success' ? 'badge-success' : 'badge-error'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
