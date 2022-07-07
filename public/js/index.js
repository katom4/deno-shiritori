import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {
doc,
getDoc,
getFirestore,
collection, addDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore-lite.js";
import { sendEmailVerification,getAuth, isSignInWithEmailLink,signInWithEmailLink,createUserWithEmailAndPassword,sendSignInLinkToEmail,signInWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDKPEjJwGuNmgOiMpMHnTNVSg3Fkk5WQpc",
    authDomain: "deno-test-d6346.firebaseapp.com",
    projectId: "deno-test-d6346",
    storageBucket: "deno-test-d6346.appspot.com",
    messagingSenderId: "759903992449",
    appId: "1:759903992449:web:d70fb81433a6041af72b80",
    measurementId: "G-5BLVH4KVM5"
    }
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();
var uid ="";
window.onload = async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // ...
          if(user.emailVerified == false){
            const warning = document.querySelector("#warning");
            warning.style.display = "block";
            warning.innerText = "メール認証が完了していません。\nメール認証を行うか、マイページから認証メールの再送信を行ってください";
          }
        } else {
          document.querySelector("#loginLinks").style.display = "block";
        }
      });
}