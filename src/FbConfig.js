// Import the functions you need from the SDKs you need
import { firebase } from "firebase/app";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FbConfig = {
  apiKey: "AIzaSyDzKSH-fn0XltN1XFdIbFEtaOnN7pWmhgE",
  authDomain: "otp-react-2f584.firebaseapp.com",
  projectId: "otp-react-2f584",
  storageBucket: "otp-react-2f584.appspot.com",
  messagingSenderId: "109030413508",
  appId: "1:109030413508:web:cc25eac173c1a6a0896591"
};
 
// Initialize Firebase
const app = initializeApp(FbConfig);

export default FbConfig;