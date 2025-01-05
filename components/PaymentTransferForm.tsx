'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";
import { transferFunds, fetchUser } from '@/lib/actions/user.actions'; // Adjust path if necessary
import { useAuth } from '@/contexts/AuthContext'; 
import { Button } from "./ui/button";

export default function PaymentTransferForm() {
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Ensure this is defined 
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<"success" | "error" | "">(""); 
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
    setIsLoading(true);

    try {
      const result = await transferFunds(
        senderAccountNumber,
        recipientAccountNumber,
        parseFloat(amount),
        description
      );

      setMessage(result.message);  // Success message
      setMessageType("success");
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setMessageType("error")
    } finally {
      setIsLoading(false); // Reset loading state after process completes
    }
  };

  return (
    <form onSubmit={handleTransfer} className='flex flex-col'>
      {/* Display sender's account number */}
      <div className="border-t border-gray-200">
        <div className="payment-transfer_form-item pb-6 pt-5">
          <div className="payment-transfer_form-content">
            <label className="text-14 font-medium text-gray-700">
              Sender Account Number
            </label>
            <input
              type="text"
              value={senderAccountNumber || 'Loading...'}
              className="input-class"
              readOnly  // Make this field read-only
            />
          </div>
        </div>

      </div>

      <div className="payment-transfer_form-details">
        <h2 className="text-18 font-semibold text-gray-900">
          Bank account details
        </h2>
        <p className="text-16 font-normal text-gray-600">
          Enter the bank account number of the recipient
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="payment-transfer_form-item pb-5 pt-6">
          <label className="text-14 w-full max-w-[280px] font-medium text-gray-700">
            Receiver&apos;s Account Number
          </label>
          <div className="flex w-full flex-col">
            <input
              type="text"
              placeholder="Recipient Account Number"
              value={recipientAccountNumber}
              className="input-class"
              onChange={(e) => setRecipientAccountNumber(e.target.value)}
              required
            />
          </div>
        </div>
      </div>


      <div className="border-y border-gray-200">
        <div className="payment-transfer_form-item py-5">
          <label className="text-14 w-full max-w-[280px] font-medium text-gray-700">
            Amount
          </label>
          <div className="flex w-full flex-col">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-class"
              required
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="payment-transfer_form-item pb-6 pt-5">
          <div className="payment-transfer_form-content">
            <label className="text-14 font-medium text-gray-700">
              Transfer Note (Optional)
            </label>
            <p className="text-12 font-normal text-gray-600">
              Please provide any additional information or instructions
              related to the transfer
            </p>
          </div>
          <div className="flex w-full flex-col">
            <textarea
              placeholder="Description (optional)"
              value={description}
               className="input-class"
              onChange={(e) => setDescription(e.target.value)}
            />

           
          </div>

        </div>
      </div>
      <div className="payment-transfer_btn-box">
      <Button type="submit" className="payment-transfer_btn">
      {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
      </Button>
    </div>
      {message && <p className={`text-12 ${
            messageType === "success" ? "text-green-500" : "text-red-500"
          }`}>{message}</p>}
    </form>
  );
}
