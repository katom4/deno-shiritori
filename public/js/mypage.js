import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {
doc,
getDoc,
getDocs,
getFirestore,
collection, addDoc,query,where,orderBy,limit,Timestamp
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { getAuth, sendEmailVerification,signInWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

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

window.addEventListener("load",async(event) =>{
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(!user.emailVerified);
            if(user.emailVerified == false){
                document.querySelector("#isVerified").style.display = "block";
            }
            var uid = user.uid;
            const wordsRef = collection(db,"words");
            const lastDateDiv = document.querySelector("#lastDate").innerText = "まだ投稿していません";
            getDocs(query(wordsRef, where("uid","==",uid),orderBy("createAt","desc"),limit(1))).then(snapshot => {
            snapshot.forEach(doc => {
                const lastDate =doc.data()["createAt"].toDate();
                const lastDateDiv = document.querySelector("#lastDate");
                const year = lastDate.getFullYear();
                const month = lastDate.getMonth() + 1;
                const date = lastDate.getDate();
                const text = `最後に投稿したのは${year}年${month}月${date}日です`;
                lastDateDiv.innerText = text;
            })
        })
        } else {
            console.log(window.location.href);
            if(window.location.href=="/"){

            }
        }
      });
});


document.querySelector("#logout").onclick = 
async(event) => {
    console.log("aa");
    await signOut(auth).then(() => {
        window.location.href = '/';
      }).catch((error) => {
        window.location.href = '/';
    });
}

document.querySelector("#resend").onclick =
async(event) => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            // ...
         });
}