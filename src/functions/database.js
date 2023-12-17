import { db } from '../firebase';
import { collection, addDoc, getDocs, query, doc, updateDoc } from "firebase/firestore";

export async function addLoadToDatabase(newLoad) {
  try {
    const docRef = await addDoc(collection(db, "loads"), newLoad);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getLoads() {
  try {
    const querySnapshot = await getDocs(query(collection(db, "loads")));
    let loads = [];
    querySnapshot.forEach((doc) => {
      loads.push({ id: doc.id, ...doc.data() });
    });
    return loads;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return []; // return an empty array in case of error
  }
}

export async function updateLoadStatus(loadId, newStatus) {
  const loadRef = doc(db, "loads", loadId);
  try {
    await updateDoc(loadRef, {
      status: newStatus
    });
  } catch (e) {
    console.error("Error updating load: ", e);
  }
}