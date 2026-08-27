import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Resource, Transaction } from '../types';
import { db } from '../services/firebase';
import { collection, doc, setDoc, onSnapshot, updateDoc, query } from 'firebase/firestore';
import { mockUsers, mockResources, mockTransactions } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  users: User[];
  resources: Resource[];
  transactions: Transaction[];
}

interface AppContextType extends AppState {
  addRequest: (transaction: Omit<Transaction, 'id' | 'status'>) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
  processSettlement: (id: string, damageDeduction: number, isDispute?: boolean) => void;
  submitRating: (id: string, rating: number) => void;
  addResource: (resource: Omit<Resource, 'id'>) => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentUser: mockUsers.find(u => u.id === 'u3') || null,
    users: [],
    resources: [],
    transactions: [],
  });
  
  const [loading, setLoading] = useState(true);

  // Seed DB if empty and Setup Listeners
  useEffect(() => {
    const seedIfEmpty = async () => {
      // We rely on the snapshot listener to determine if it's empty, but to avoid race conditions,
      // we'll just let the user see what's in Firebase. 
      // If they want to seed, they can call a specific function.
      // But for hackathon realistic purposes, we'll auto-seed if we get 0 resources.
    };

    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      if (snap.empty) {
        // Auto seed
        mockUsers.forEach(u => setDoc(doc(db, 'users', u.id), u));
      } else {
        const users = snap.docs.map(d => d.data() as User);
        setState(prev => ({ ...prev, users, currentUser: users.find(u => u.id === prev.currentUser?.id) || prev.currentUser }));
      }
    });

    const unsubResources = onSnapshot(collection(db, 'resources'), (snap) => {
      if (snap.empty) {
        // Auto seed
        mockResources.forEach(r => setDoc(doc(db, 'resources', r.id), r));
      } else {
        setState(prev => ({ ...prev, resources: snap.docs.map(d => d.data() as Resource) }));
      }
    });

    const unsubTransactions = onSnapshot(collection(db, 'transactions'), (snap) => {
      if (snap.empty) {
        // Auto seed
        mockTransactions.forEach(t => setDoc(doc(db, 'transactions', t.id), t));
      } else {
        setState(prev => ({ ...prev, transactions: snap.docs.map(d => d.data() as Transaction) }));
      }
    });

    setLoading(false);

    return () => {
      unsubUsers();
      unsubResources();
      unsubTransactions();
    };
  }, []);

  const addRequest = async (transactionData: Omit<Transaction, 'id' | 'status'>) => {
    const id = `t_${Date.now()}`;
    const newTransaction: Transaction = {
      ...transactionData,
      id,
      status: 'Requested',
    };
    await setDoc(doc(db, 'transactions', id), newTransaction);
  };

  const updateTransactionStatus = async (id: string, status: Transaction['status']) => {
    await updateDoc(doc(db, 'transactions', id), { status });
  };

  const processSettlement = async (id: string, damageDeduction: number, isDispute?: boolean) => {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;
    
    await updateDoc(doc(db, 'transactions', id), {
      status: isDispute ? 'Disputed' : 'Settlement',
      damageDeduction,
      totalRefund: tx.securityDeposit - tx.borrowingCharge - tx.platformFee - tx.lateFee - damageDeduction
    });
  };

  const submitRating = async (id: string, rating: number) => {
    await updateDoc(doc(db, 'transactions', id), { status: 'Rated' });
  };

  const addResource = async (resourceData: Omit<Resource, 'id'>) => {
    const id = `r_${Date.now()}`;
    const newResource: Resource = {
      ...resourceData,
      id,
    };
    await setDoc(doc(db, 'resources', id), newResource);
  };
  
  const updateUser = async (id: string, data: Partial<User>) => {
    await updateDoc(doc(db, 'users', id), data);
  };

  const resetDemo = () => {
    // Left empty for now, can implement a full collection wipe if needed
  };

  if (loading) return null;

  return (
    <AppContext.Provider value={{
      ...state,
      addRequest,
      updateTransactionStatus,
      processSettlement,
      submitRating,
      addResource,
      updateUser,
      resetDemo
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
