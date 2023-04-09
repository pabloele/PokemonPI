// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const env = process.env;
const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);

export const uploadFile = async (file) => {
  const storageRef = ref(storage, v4());
  return await uploadBytes(storageRef, file);
};
