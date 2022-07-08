import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

import { getAuth,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {FIREBASE_CONFIG} from "./config.js";
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();
var uid ="";
window.onload = async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          uid = user.uid;
          document.querySelector("#all").style.display="none";
          document.querySelector("#isLoginSen").innerText = "ログインしています。";
        } else {
          document.querySelector("#all").style.display = "block";
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