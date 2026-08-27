import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './services/firebase';
import { mockUsers, mockResources, mockTransactions } from './data/mockData';

export const seedDatabase = async () => {
  try {
    const usersSnap = await getDocs(collection(db, 'users'));
    if (!usersSnap.empty) {
      console.log('Database already seeded.');
      return;
    }

    console.log('Seeding users...');
    for (const user of mockUsers) {
      await setDoc(doc(db, 'users', user.id), user);
    }

    console.log('Seeding resources...');
    for (const resource of mockResources) {
      await setDoc(doc(db, 'resources', resource.id), resource);
    }

    console.log('Seeding transactions...');
    for (const tx of mockTransactions) {
      await setDoc(doc(db, 'transactions', tx.id), tx);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
