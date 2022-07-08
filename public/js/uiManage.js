import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {getFirestore,} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {FIREBASE_CONFIG} from "./config.js";

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();
const db = getFirestore(app);
var uid ="";

window.addEventListener("load",async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
          uid = user.uid;
          const a = document.querySelector("#navbarLogin");
          a.innerText = "マイページ";
          var b = document.querySelector("#navbarLogin");
          const c = b.href.replace("login","mypage");
          b.href = c;
        } else {
            
        }
    })
});