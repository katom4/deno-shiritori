import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {
doc,
getDoc,
getFirestore,
collection, addDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore-lite.js";
import { getAuth, sendEmailVerification ,signInWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
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
          uid = user.uid;
          document.querySelector("#all").style.display="none";
          document.querySelector("#isLoginSen").innerText = "ログインしています!";
        } else {
          // User is signed out
          // ...
          console.log("not");
          var a = document.querySelector("#check");
          a.innerText = "not login";
        }
      });
}




document.querySelector("#login").onclick = 
async(event) => {
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;
    await signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            window.location.href = "/";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.querySelector("#warning").style.display = "block";
            document.querySelector("#warning").innerText= "ログインできませんでした。入力内容を確認してください。";
        });
    
    
}