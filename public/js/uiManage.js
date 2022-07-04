import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {
doc,
getDoc,
getDocs,
getFirestore,
collection, addDoc,query,where,orderBy,limit,Timestamp
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
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
const db = getFirestore(app);
var uid ="";

window.onload = async(event) =>{
    
}
window.addEventListener("load",async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          uid = user.uid;
          console.log(document.querySelector("#navbarLogin").innerText);
          const a = document.querySelector("#navbarLogin");
          a.innerText = "マイページ";
          var b = document.querySelector("#navbarLogin");
          const c = b.href.replace("login","mypage");
          b.href = c;
        } else {
            if(window.location.pathname == "/mypage"){
                window.location.href = "/";
            }
        }
    })
});