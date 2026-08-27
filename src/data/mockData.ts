import type { Resource, User, Transaction } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Aarav Mehta',
    trustScore: 98,
    isVerified: true,
    successfulExchanges: 28,
    onTimeReturns: 97,
    rating: 4.9,
    disputes: 0,
  },
  {
    id: 'u2',
    name: 'Priya Sharma',
    trustScore: 92,
    isVerified: true,
    successfulExchanges: 15,
    onTimeReturns: 100,
    rating: 4.7,
    disputes: 1,
  },
  {
    id: 'u3',
    name: 'Current User', // The demo user
    trustScore: 96,
    isVerified: true,
    successfulExchanges: 12,
    onTimeReturns: 95,
    rating: 4.8,
    disputes: 0,
  }
];

export const mockResources: Resource[] = [
  {
    id: 'r1',
    ownerId: 'u1',
    name: 'Sony Alpha Camera',
    description: 'Perfect for event photography and videography. Comes with a 50mm lens and a spare battery.',
    category: 'Cameras',
    condition: 'Excellent',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'],
    borrowingCharge: 300,
    securityDeposit: 1000,
    isAvailable: true,
    availabilityDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    distance: 0.8,
    rating: 4.9,
    includedAccessories: ['50mm Lens', 'Spare Battery', 'Carrying Case'],
    borrowingRules: 'Please do not use in the rain. Return with battery fully charged.',
    location: 'Engineering Block',
  },
  {
    id: 'r2',
    ownerId: 'u2',
    name: 'Manfrotto Tripod',
    description: 'Sturdy professional tripod, great for video shoots and low-light photography.',
    category: 'Accessories',
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1587824816024-6ebbd7c02b36?auto=format&fit=crop&q=80&w=800'],
    borrowingCharge: 100,
    securityDeposit: 500,
    isAvailable: true,
    availabilityDate: new Date().toISOString(),
    distance: 1.2,
    rating: 4.5,
    includedAccessories: ['Quick release plate', 'Bag'],
    borrowingRules: 'Ensure legs are cleaned if used outdoors.',
    location: 'Arts Building',
  },
  {
    id: 'r3',
    ownerId: 'u1',
    name: 'Rode Wireless GO II Microphone',
    description: 'Dual channel wireless microphone system for crystal clear audio.',
    category: 'Audio',
    condition: 'Excellent',
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'],
    borrowingCharge: 200,
    securityDeposit: 800,
    isAvailable: true,
    availabilityDate: new Date().toISOString(),
    distance: 0.9,
    rating: 4.8,
    includedAccessories: ['2 Transmitters', '1 Receiver', 'Windshields', 'Cables'],
    borrowingRules: 'Handle with care, return in original box.',
    location: 'Engineering Block',
  }
];

export const mockTransactions: Transaction[] = [];
