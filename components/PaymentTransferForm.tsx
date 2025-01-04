'use client';
import { useState, useEffect } from 'react';
import { transferFunds, fetchUser } from '@/lib/actions/user.actions'; // Adjust path if necessary
import { useAuth } from '@/contexts/AuthContext'; // Assuming you have an authentication hook to get logged-in user

export default function PaymentTransferForm() {
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [senderAccountNumber, setSenderAccountNumber] = useState(''); // To hold sender's account number
  
  // Fetch the logged-in user's UID from the authentication context or service
  const { user } = useAuth(); // This hook should return the current user object with UID

  // Fetch sender's account number after component mount and once user is available
  useEffect(() => {
    if (user) {
      const fetchAccountNumber = async () => {
        try {
          // Use the current user's UID to fetch the user data
          const userData = await fetchUser(user.uid);  // Fetch data using the user's UID
          setSenderAccountNumber(userData.accountNumber);  // Set the account number from user data
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchAccountNumber();
    }
  }, [user]); // Re-run when the user changes (logged in/out)

  const handleTransfer = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
          const result = await transferFunds(
              senderAccountNumber, 
              recipientAccountNumber, 
              parseFloat(amount), 
              description
          );

          setMessage(result.message);  // Success message
      } catch (error) {
          setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
  };

  return (
      <form onSubmit={handleTransfer}>
          {/* Display sender's account number */}
          <div>
              <label>Sender Account Number</label>
              <input
                  type="text"
                  value={senderAccountNumber || 'Loading...'}
                  readOnly  // Make this field read-only
              />
          </div>
          
          <input
              type="text"
              placeholder="Recipient Account Number"
              value={recipientAccountNumber}
              onChange={(e) => setRecipientAccountNumber(e.target.value)}
              required
          />
          <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
          />
          <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Transfer</button>
          {message && <p>{message}</p>}
      </form>
  );
}
