import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export async function addLoadToDatabase() {
  console.log(db);

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