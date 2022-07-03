

document.querySelector("#login").onclick = 
async(event) => {
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;

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
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
    });
}