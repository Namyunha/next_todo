// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDERID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));

  if (querySnapshot.empty) {
    return [];
  }

  // 모든 할 일 가져오기
  const fetchedTodos = [] as any;

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    const aTodo = {
      id: doc.id,
      title: doc.data()["title"],
      is_done: doc.data()["is_done"],
      created_at: doc.data()["created_at"].toDate().toLocaleTimeString("ko"),
    };
    fetchedTodos.push(aTodo);
  });
  return fetchedTodos;
}

export async function addTodos({ title }: { title: string }) {
  // Add a new document with a generated id
  const newTodoRef = doc(collection(db, "todos"));

  const createdAtTimestamp = Timestamp.fromDate(new Date());

  const newTodoData = {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    creataed_at: createdAtTimestamp,
  };
  // later...
  await setDoc(newTodoRef, newTodoData);

  return newTodoData;
}
