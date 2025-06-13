import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

// Generic function to add a document to a collection
export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

// Generic function to get all documents from a collection
export async function getDocuments<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T & { id: string }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}

// Generic function to get a single document
export async function getDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<(T & { id: string }) | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

// Generic function to update a document
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data as DocumentData);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

// Generic function to delete a document
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Helper function to create a query with multiple constraints
export function createQuery(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  return query(collection(db, collectionName), ...constraints);
}

// Example usage of the utility functions:
/*
// Add a document
const newHabit = {
  name: "Exercise",
  frequency: "daily",
  createdAt: new Date()
};
const habitId = await addDocument("habits", newHabit);

// Get all habits
const habits = await getDocuments("habits", [
  where("frequency", "==", "daily"),
  orderBy("createdAt", "desc"),
  limit(10)
]);

// Get a single habit
const habit = await getDocument("habits", habitId);

// Update a habit
await updateDocument("habits", habitId, {
  name: "Daily Exercise"
});

// Delete a habit
await deleteDocument("habits", habitId);
*/ 