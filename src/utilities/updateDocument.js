import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMaQvJLBWukmvl7YfXGqPqG7NXEZW0Fe8",
  authDomain: "platos-test-36f87.firebaseapp.com",
  projectId: "platos-test-36f87",
  storageBucket: "platos-test-36f87.appspot.com",
  messagingSenderId: "164347372430",
  appId: "1:164347372430:web:a3fde0009bc35e5003fadf",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore();

const updateDocument = async (collectionName, documentId, newData) => {
  // Initialize Firebase
  const path = collectionName + "/" + documentId;
  console.log("path: ", path);
  await updateDoc(doc(firestore, path), newData);
};

export default updateDocument;
