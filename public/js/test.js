import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
    // @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
    import {
    doc,
    getDoc,
    getFirestore,
    collection, addDoc,
    } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore-lite.js";
    import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

    import { Env } from "https://deno.land/x/env@v2.2.0/env.js";
    const env = new Env();
    const para = document.querySelector("#pre5");
      para.innerText = `1`;
    const p = document.querySelector("#pre5");
      p.innerText = env.get("TEST");
    console.log(env.get("TEST"));
    console.log(env.get("TEST"));
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const pa = document.querySelector("#pre5");
      pa.innerText = `3`;
    const auth = getAuth(app);
    const email = "kanri@example.com"
    const password = "190829387"
    await signInWithEmailAndPassword(auth, email, password);
    try {
    const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
    
    
    
    // Initialize Firebase