import { db } from '../firebase';
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export async function addLoadToDatabase() {
  try {
    const docRef = await addDoc(collection(db, "loads"), {
      location: "North Port Florida",
      name: "Nozdrin's church",
      Date: "01/01/2005"
    });
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