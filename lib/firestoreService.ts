// lib/firestoreService.ts
// Firestore Database Service

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Obtener un documento por ID
 */
export async function getDocument(collectionName: string, docId: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

/**
 * Obtener todos los documentos de una colección
 */
export async function getAllDocuments(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: DocumentData[] = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}

/**
 * Obtener documentos con query
 */
export async function getDocumentsWithQuery(
  collectionName: string, 
  constraints: QueryConstraint[]
) {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    const documents: DocumentData[] = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
}

/**
 * Agregar un nuevo documento
 */
export async function addDocument(collectionName: string, data: DocumentData) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log('Document written with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

/**
 * Actualizar un documento
 */
export async function updateDocument(
  collectionName: string, 
  docId: string, 
  data: Partial<DocumentData>
) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    
    console.log('Document updated:', docId);
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

/**
 * Eliminar un documento
 */
export async function deleteDocument(collectionName: string, docId: string) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log('Document deleted:', docId);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Exportar funciones de query helpers
export { where, orderBy, limit };
