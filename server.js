import { serve } from "https://deno.land/std@0.138.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {
doc,
getDoc,
getFirestore,
collection, addDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore-lite.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
let previousWord = "しりとり";
let previousWords = new Array("しりとり") ;
console.log("Listening on http://localhost:8000");

serve(async(req) => {
    
    const pathname = new URL(req.url).pathname;
    console.log(pathname);
    
    if(req.method === "GET" && pathname === "/shiritori"){
        return new Response(previousWords);
    }
    if(req.method === "POST" && pathname === "/shiritori"){
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        if(
            nextWord.length > 0 &&
            previousWord.charAt(previousWord.length -1) !== nextWord.charAt(0)
        ){
            return new Response("前の単語に続いていません",{
                status:400
            });
        }
        previousWord = nextWord;
        return new Response(previousWord)
    }
    if(req.method === "GET" && pathname === "/endless"){
        return new Response(await Deno.readTextFile("./public/endless.html"), {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }
    if(req.method === "POST" && pathname === "/endless/shiritori"){
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        const judge = judgeWord(nextWord);

        if(judge == "please word"){
            return new Response("単語を入力してください",{
                status:400
            });
        }
        else if(judge == "not hiragana"){
            return new Response("ひらがなを入力してください",{
                status:400
            });
        }
        else if(judge == "not word"){
            return new Response("名詞ではありません",{
                status:400
            });
        }
        
        return new Response(judge)
    }
    if(req.method === "GET" && pathname === "/login"){
        return new Response(await Deno.readTextFile("./public/login.html"), {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }
    if(req.method === "POST" && pathname === "/login"){
        const FIREBASE_CONFIG = {
            apiKey: "AIzaSyDKPEjJwGuNmgOiMpMHnTNVSg3Fkk5WQpc",
            authDomain: "deno-test-d6346.firebaseapp.com",
            projectId: "deno-test-d6346",
            storageBucket: "deno-test-d6346.appspot.com",
            messagingSenderId: "759903992449",
            appId: "1:759903992449:web:d70fb81433a6041af72b80",
            measurementId: "G-5BLVH4KVM5"
            }
        const requestJson = await req.json();
        var jsonObject = JSON.parse(requestJson);
        const email = jsonObject.email;
        const pass = jsonObject.pass;
        const app = initializeApp(FIREBASE_CONFIG);
        const auth = getAuth();
        console.log("aaa");
        console.log(requestJson);
        console.log(email);
        console.log(pass);
        var errorMessage = "";
        
        console.log(a);
        return new Response(uid);
    }
    /*if(req.method === "GET" && pathname === "/dbtest"){
        const users = ["a", "b", "c"];
        const db = new DB("/wnjpn.db");
        const k = "課金"
        for (const user of db.query(`SELECT wordid FROM word where lemma = '${k}'`,)) {
            console.log(user);
        }
        const a = db.query(`SELECT wordid FROM word where lemma = '${k}'`);
        const b = a.pop().pop()
        console.log(b == 216405);
        db.close();
        return new Response(b);
    }*/
    return serveDir(req,{
        fsRoot:"public",
        urlRoot:"",
        showDirListing:true,
        enableCors:true,
    })
});

function judgeWord(word){
    const isNone = word!=""
    const isHiragana = word.match(/^[ぁ-んー　]*$/);
    const isWord = true;

    if(!isNone)return "please word";
    if(!isHiragana)return "not hiragana";
    if(!isWord)return "not word";

    return "correct";
}