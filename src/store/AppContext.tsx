import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Resource, Transaction } from '../types';
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
  addResource: (resource: Omit<Resource, 'id'>) => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_STATE = {
  users: mockUsers,
  resources: mockResources,
  transactions: mockTransactions,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('campusCircularStateV4');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      ...INITIAL_STATE,
      currentUser: mockUsers.find(u => u.id === 'u3') || null,
    };
  });

  useEffect(() => {
    localStorage.setItem('campusCircularStateV4', JSON.stringify(state));
  }, [state]);

  const addRequest = (transactionData: Omit<Transaction, 'id' | 'status'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `t_${Date.now()}`,
      status: 'Requested',
    };
    setState(prev => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction],
    }));
  };

  const updateTransactionStatus = (id: string, status: Transaction['status']) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => 
        t.id === id ? { ...t, status } : t
      ),
    }));
  };

  const processSettlement = (id: string, damageDeduction: number, isDispute: boolean = false) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => {
        if (t.id === id) {
          const totalRefund = t.securityDeposit - damageDeduction;
          return {
            ...t,
            status: isDispute ? 'Disputed' : 'Settlement',
            damageDeduction,
            totalRefund: totalRefund > 0 ? totalRefund : 0,
          } as Transaction;
        }
        return t;
      }),
    }));
  };

  const submitRating = (id: string, rating: number) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => 
        t.id === id ? { ...t, status: 'Rated' } : t
      ),
    }));
  };

  const addResource = (resourceData: Omit<Resource, 'id'>) => {
    const newResource: Resource = {
      ...resourceData,
      id: `r_${Date.now()}`,
    };
    setState(prev => ({
      ...prev,
      resources: [...prev.resources, newResource],
    }));
  };

  const resetDemo = () => {
    setState({
      ...INITIAL_STATE,
      currentUser: mockUsers.find(u => u.id === 'u3') || null,
    });
    localStorage.removeItem('campusCircularStateV4');
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addRequest,
      updateTransactionStatus,
      processSettlement,
      submitRating,
      addResource,
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
