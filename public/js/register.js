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
          console.log("2");
          uid = user.uid;
          document.querySelector("#all").style.display = "none";
          document.querySelector("#isLoginSen").innerText = "ログインしています!";
          // ...
        } else {
          // User is signed out
          // ...
          console.log("not");
          var a = document.querySelector("#check");
          a.innerText = "not login";
        }
      });
}

const url = window.location.href+"?id=2";

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: url,
    handleCodeInApp: true,
  };  
document.querySelector("#register").onclick = 
async(event) => {
    console.log(auth.currentUser);
    console.log(auth);
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
        console.log(errorCode);
        if(errorCode == "auth/email-already-in-use"){
            document.querySelector("#warning").style.display = "block";
            document.querySelector("#warning").innerText= "既に使われてるメールアドレスです。\nメール認証が済んでいない場合は、ログインしてからマイページで確認メールを再送信してください。";
        }
        else{
          document.querySelector("#warning").style.display = "block";
          document.querySelector("#warning").innerText= "登録できませんでした。入力内容を確認してください。";
        }
        // ..
    });

    /*await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
        console.log("send");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // ...
    });*/
    
    
}