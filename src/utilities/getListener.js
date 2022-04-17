import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMaQvJLBWukmvl7YfXGqPqG7NXEZW0Fe8",
  authDomain: "platos-test-36f87.firebaseapp.com",
  projectId: "platos-test-36f87",
  storageBucket: "platos-test-36f87.appspot.com",
  messagingSenderId: "164347372430",
  appId: "1:164347372430:web:a3fde0009bc35e5003fadf",
};

const firebaseApp = initializeApp(firebaseConfig);

const getDocuments = async (collectionName) => {
  // Initialize Firebase
  const firestore = getFirestore();
  const data = await getDocs(collection(firestore, collectionName));
  data.docChanges((e) => {
    console.log(e);
  });
};

export default getDocuments;
