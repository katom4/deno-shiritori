import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

import { sendEmailVerification,getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {FIREBASE_CONFIG} from "./config.js";

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();
var uid ="";
window.onload = async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          uid = user.uid;
          document.querySelector("#all").style.display = "none";
          document.querySelector("#isLoginSen").innerText = "ログインしています。";
        } else {
          document.querySelector("#all").style.display = "block";
        }
      });
}

const url = window.location.href+"?id=2";

const actionCodeSettings = {
    url: url,
    handleCodeInApp: true,
  };  
document.querySelector("#register").onclick = 
async(event) => {
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;
    const u = await createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        sendEmailVerification(auth.currentUser)
        .then(() => {
          window.location.href = "/"
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/email-already-in-use"){
            document.querySelector("#warning").style.display = "block";
            document.querySelector("#warning").innerText= "既に使われてるメールアドレスです。\nメール認証が済んでいない場合は、ログインしてからマイページで確認メールを再送信してください。";
        }
        else{
          document.querySelector("#warning").style.display = "block";
          document.querySelector("#warning").innerText= "登録できませんでした。入力内容を確認してください。";
        }
    });

    
}