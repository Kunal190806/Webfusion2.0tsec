import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Transaction, Resource } from '../../types';

interface SettlementModalProps {
  transaction: Transaction;
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  onSettle: (id: string, deduction: number, isDispute: boolean) => void;
}

export const SettlementModal: React.FC<SettlementModalProps> = ({ transaction, resource, isOpen, onClose, onSettle }) => {
  const [deduction, setDeduction] = useState<string>('0');
  const [isDispute, setIsDispute] = useState(false);

  if (!isOpen) return null;

  const handleSettle = () => {
    const deductAmount = parseFloat(deduction) || 0;
    onSettle(transaction.id, deductAmount, isDispute);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2">Inspect & Settle</h2>
        <p className="text-sm text-gray-500 mb-6">
          You are inspecting <strong>{resource.name}</strong> returned by the borrower.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Security Deposit Held:</span>
            <span className="font-bold">₹{transaction.securityDeposit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Your Earning:</span>
            <span className="font-bold text-green-600">₹{transaction.borrowingCharge}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="condition" 
              checked={!isDispute && deduction === '0'} 
              onChange={() => { setIsDispute(false); setDeduction('0'); }}
              className="mt-1"
            />
            <div>
              <div className="font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500"/> Item is in perfect condition
              </div>
              <div className="text-xs text-gray-500">Return the full ₹{transaction.securityDeposit} deposit to borrower.</div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="condition" 
              checked={!isDispute && deduction !== '0'} 
              onChange={() => { setIsDispute(false); setDeduction('100'); }}
              className="mt-1"
            />
            <div>
              <div className="font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500"/> Minor Damage / Late
              </div>
              <div className="text-xs text-gray-500">Deduct a portion of the deposit for minor issues.</div>
            </div>
          </label>
          
          {!isDispute && deduction !== '0' && (
            <div className="pl-7 pr-4">
              <label className="text-xs font-bold text-gray-700 block mb-1">Deduction Amount (₹)</label>
              <input 
                type="number" 
                min="0" 
                max={transaction.securityDeposit}
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="radio" 
              name="condition" 
              checked={isDispute} 
              onChange={() => { setIsDispute(true); setDeduction(transaction.securityDeposit.toString()); }}
              className="mt-1"
            />
            <div>
              <div className="font-bold text-red-600">Major Damage / Dispute</div>
              <div className="text-xs text-gray-500">Hold the full deposit and escalate to admin resolution.</div>
            </div>
          </label>
        </div>

        <button 
          onClick={handleSettle}
          className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${isDispute ? 'bg-red-600 hover:bg-red-700' : 'bg-[#16352F] hover:bg-black'}`}
        >
          {isDispute ? 'File Dispute' : 'Confirm Settlement'}
        </button>
      </div>
    </div>
  );
};
