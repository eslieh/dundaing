'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSmartphone, FiCreditCard, FiCheck, FiArrowLeft } from 'react-icons/fi';

export default function PaymentPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Retrieve order details from session
    const details = JSON.parse(sessionStorage.getItem('orderDetails'));
    if (!details) {
      router.push('/order/details');
      return;
    }
    setOrderDetails(details);
  }, [router]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      // In a real app, you would call your payment API here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save successful payment
      sessionStorage.setItem('paymentSuccess', 'true');
      router.push('/order/success');
    } catch (error) {
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!orderDetails) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-orange-500 mb-6"
      >
        <FiArrowLeft className="mr-1" /> Back to details
      </button>

      <h1 className="text-2xl font-bold mb-8 text-center">Payment Method</h1>
      
      <div className="space-y-6">
        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="font-medium">Choose Payment Method</h2>
          
          {/* M-Pesa Option */}
          <div 
            onClick={() => setSelectedMethod('mpesa')}
            className={`p-4 border rounded-lg cursor-pointer ${selectedMethod === 'mpesa' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <FiSmartphone className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">M-Pesa</h3>
                  <p className="text-sm text-gray-500">Pay via Safaricom M-Pesa</p>
                </div>
              </div>
              {selectedMethod === 'mpesa' && <FiCheck className="text-orange-500" />}
            </div>
            
            {selectedMethod === 'mpesa' && (
              <div className="mt-4 pl-12">
                <label className="block text-sm font-medium mb-1">M-Pesa Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    +254
                  </span>
                  <input
                    type="tel"
                    placeholder={orderDetails.phone}
                    value={orderDetails.phone}
                    readOnly
                    className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 bg-gray-100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">You'll receive an STK push</p>
              </div>
            )}
          </div>

          {/* Card Option */}
          <div 
            onClick={() => setSelectedMethod('card')}
            className={`p-4 border rounded-lg cursor-pointer ${selectedMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <FiCreditCard className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                </div>
              </div>
              {selectedMethod === 'card' && <FiCheck className="text-orange-500" />}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6">
          <h2 className="font-medium mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tickets (x{orderDetails.tickets})</span>
              <span>KES {1500 * orderDetails.tickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span>KES 200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>KES {(1500 * orderDetails.tickets * 0.16).toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-3 mt-3">
              <span>Total</span>
              <span className="text-orange-600">
                KES {(1500 * orderDetails.tickets + 200 + (1500 * orderDetails.tickets * 0.16)).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${
            isProcessing ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
          } text-white`}
        >
          {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
        </button>
      </div>
    </div>
  );
}