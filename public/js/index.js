import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

import {getAuth ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {FIREBASE_CONFIG} from "./config.js";

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();
window.onload = async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
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