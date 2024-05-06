// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
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

// 모든 할 일 가져오기

export async function fetchTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));

  if (querySnapshot.empty) {
    return [];
  }

  // 모든 할 일 가져오기
  const fetchedTodos = [];

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

// 할 일 추가

export async function addTodos({ title }) {
  // Add a new document with a generated id
  const newTodoRef = doc(collection(db, "todos"));

  const createdAtTimestamp = Timestamp.fromDate(new Date());

  const newTodoData = {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    created_at: createdAtTimestamp,
  };

  await setDoc(newTodoRef, newTodoData);

  return {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    creataed_at: createdAtTimestamp.toDate(),
  };
}

export async function fetchATodo(id) {
  if (!id) return null;
  const todoDocRef = doc(db, "todos", id);
  const todoDocSnap = await getDoc(todoDocRef);
  if (todoDocSnap.exists()) {
    const fetchedATodo = {
      id: todoDocSnap.id,
      title: todoDocSnap.data()["title"],
      is_done: todoDocSnap.data()["is_done"],
      creataed_at: todoDocSnap.data()["created_at"].toDate(),
    };
    return fetchedATodo;
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function deleteTodo(id) {
  const searchedTodo = await fetchATodo(id);
  if (!searchedTodo) {
    return null;
  } else {
    await deleteDoc(doc(db, "todos", id));
    return searchedTodo;
  }
}

export async function updateTodo(editedTodo) {
  const searchedTodo = await fetchATodo(editedTodo.id);
  if (!searchedTodo) return null;
  const washingtonRef = doc(db, "todos", editedTodo.id);
  await updateDoc(washingtonRef, {
    title: editedTodo.title,
    is_done: editedTodo.is_done,
  });

  return editedTodo;
}
