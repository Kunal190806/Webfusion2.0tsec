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
    const saved = localStorage.getItem('campusCircularState');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      ...INITIAL_STATE,
      currentUser: mockUsers.find(u => u.id === 'u3') || null,
    };
  });

  useEffect(() => {
    localStorage.setItem('campusCircularState', JSON.stringify(state));
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
    localStorage.removeItem('campusCircularState');
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addRequest,
      updateTransactionStatus,
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
