import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBYATYUmmFiCffz3pEob01XtL1_NlqMoBw",
  authDomain: "facebook-login-b8d70.firebaseapp.com",
  projectId: "facebook-login-b8d70",
  storageBucket: "facebook-login-b8d70.appspot.com",
  messagingSenderId: "72957352072",
  appId: "1:72957352072:web:d7cc667f026fc00162e73d",
  measurementId: "G-2JQB9GWD3G"
};
const app = initializeApp(firebaseConfig);

export default app