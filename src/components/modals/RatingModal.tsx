import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import type { Transaction, Resource } from '../../types';

interface RatingModalProps {
  transaction: Transaction;
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, rating: number) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ transaction, resource, isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(transaction.id, rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Settlement Complete</h2>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left text-sm border border-gray-100">
           <div className="flex justify-between mb-1">
             <span className="text-gray-500">Security Deposit:</span>
             <span>₹{transaction.securityDeposit}</span>
           </div>
           {transaction.damageDeduction > 0 && (
             <div className="flex justify-between mb-1 text-red-500">
               <span>Damage/Late Deduction:</span>
               <span>- ₹{transaction.damageDeduction}</span>
             </div>
           )}
           <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200">
             <span>Your Total Refund:</span>
             <span className="text-green-600 text-lg">₹{transaction.totalRefund}</span>
           </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-2">Rate your experience</h3>
        <p className="text-xs text-gray-500 mb-4">How was borrowing the <strong>{resource.name}</strong>?</p>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star 
                className={`w-10 h-10 ${
                  star <= (hoverRating || rating) 
                    ? 'fill-[#FFD166] text-[#FFD166]' 
                    : 'text-gray-300'
                }`} 
              />
            </button>
          ))}
        </div>

        <button 
          disabled={rating === 0}
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg font-bold text-white bg-[#16352F] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};
