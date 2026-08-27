export interface User {
  id: string;
  name: string;
  avatar?: string;
  trustScore: number;
  isVerified: boolean;
  successfulExchanges: number;
  onTimeReturns: number;
  rating: number;
  disputes: number;
}

export interface Resource {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  category: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  images: string[];
  borrowingCharge: number;
  securityDeposit: number;
  isAvailable: boolean;
  availabilityDate: string;
  distance: number;
  rating: number;
  includedAccessories: string[];
  borrowingRules: string;
  location: string;
}

export type TransactionStatus =
  | 'Available'
  | 'Requested'
  | 'Accepted'
  | 'Handover'
  | 'Borrowed'
  | 'Return Due'
  | 'Returned'
  | 'Inspection'
  | 'Settlement'
  | 'Rated'
  | 'Disputed';

export interface Transaction {
  id: string;
  resourceId: string;
  borrowerId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  status: TransactionStatus;
  borrowingCharge: number;
  platformFee: number;
  securityDeposit: number;
  lateFee: number;
  damageDeduction: number;
  totalRefund: number;
  message?: string;
}
