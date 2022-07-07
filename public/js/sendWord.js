import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// @deno-types="https://cdn.esm.sh/v58/firebase@9.4.1/firestore/dist/firestore/index.d.ts"
import {
doc,
getDoc,
getDocs,
getFirestore,
collection, addDoc,query,where,orderBy,limit,Timestamp,serverTimestamp
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
var isVerified = false;
window.onload = async(event) =>{
  var isLogin = false;
  await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        uid = user.uid;
        isLogin = true;
        isVerified = user.emailVerified;
        if(!isVerified){
          document.querySelector("#warning").style.display = "block";
          document.querySelector("#warning").innerText = "メール認証が完了していないため、投稿できません。\n認証を行うかマイページからメールの再送信を行ってください。";
        }
      } else {
        document.querySelector("#warning").style.display = "block";
        document.querySelector("#warning").innerText = "ログインしていません。\nログインするか、アカウントをお持ちでない場合は新規作成を行ってください。";
      }
    })
  const wordsRef = collection(db,"words");
  var previousWords = new Array();
  await getDocs(query(wordsRef, orderBy("createAt","desc"))).then(snapshot => {
    snapshot.forEach(doc => {
      const preWord =doc.data()["word"];
      previousWords.push(preWord);
      console.log(preWord);
    })
  })
  console.log(previousWords);
  const para = document.querySelector("#previousWord");
  para.innerText = `前の単語：${previousWords[0]}`;
    console.log(previousWords.length);
    previousWords.forEach((elem,index)=>{
      console.log(elem);
      var posts = document.querySelector("#preWords");
      var border = document.createElement("div");
      border.setAttribute("class","border-top pb-2");
      var post = document.createElement("p");
      post.class = "h6";
      post.innerText = elem;
      post.setAttribute("class","h6")
      posts.appendChild(post);
      posts.appendChild(border);
    });
}

/* document.querySelector("#nextWordSendButton").onclick = 
async(event) => {
    const nextWord = 
    document.querySelector("#nextWordInput").value;
    const response = await fetch("/shiritori",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nextWord:nextWord})
    });
    if (response.status / 100 !== 2) {
          alert(await response.text());
          document.querySelector("#nextWordInput").value = "";
          return;
      }
    const previousWord = await response.text();
    document.querySelector("#nextWordInput").value = "";
    const para = document.querySelector("#previousWord");
    para.innerText = `前の単語：${previousWord}`;
};*/

document.querySelector("#nextWordSendButtonEndless").onclick = 
async(event) => {
  if(uid == ""){
    alert("ログインしてください!");
    document.querySelector("#nextWordInput").value = "";
    return;
  }
  if(!isVerified){
    alert("メール認証が完了していません");
    document.querySelector("#nextWordInput").value = "";
    return;
  }
    const nextWord = 
    document.querySelector("#nextWordInput").value;
    const response = await fetch("/endless/shiritori",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nextWord:nextWord})
    });
    if (response.status / 100 !== 2) {
          alert(await response.text());
          document.querySelector("#nextWordInput").value = "";
          return;
      }
    const responseText = await response.text();
    console.log(responseText);
    if(responseText=="correct"){
      //既に使われている単語か判定
      var isOver = false;
      const wordsRef = collection(db,"words");
      await getDocs(query(wordsRef, where("word", "==", nextWord))).then(snapshot => {
        snapshot.forEach(doc => {
          alert(nextWord+"はすでに使われている単語です");
          document.querySelector("#nextWordInput").value = "";
          isOver = true;
          return;
        })
      })
      if(isOver) return;
      var preWord = "";
      //最後の文字に続いているか判定
      await getDocs(query(wordsRef, orderBy("createAt","desc"),limit(1))).then(snapshot => {
        snapshot.forEach(doc => {
          preWord =doc.data()["word"];
        })
      })
      console.log("word:",preWord);
      if(preWord.charAt(preWord.length -1) !== nextWord.charAt(0)){
        alert("最後の文字に続いていません");
        document.querySelector("#nextWordInput").value = "";
      return;
      }
      //1日1回を超えていないか判定
      await getDocs(query(wordsRef, orderBy("createAt","desc"),where("uid" ,"==", uid),limit(1))).then(snapshot => {
        snapshot.forEach(doc => {
          
          const preDate =doc.data()["createAt"].toDate();
          var now = Timestamp.now().toDate();
          const year = now.getFullYear();
          const month = now.getMonth();
          const date = now.getDate();
          const shapedNow = new Date(year,month,date);
          console.log(preDate);
          console.log(shapedNow);
          console.log(shapedNow.getTime() > preDate.getTime());
          if(shapedNow.getTime() <= preDate.getTime()){
              alert("投稿できる上限に達しています");
              document.querySelector("#nextWordInput").value = "";
              isOver = true;
          }
        })
      })
      if(isOver) return;
      try {
        const docRef = await addDoc(collection(db, "words"), {
          word: nextWord,
          uid: uid,
          createAt:serverTimestamp(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("送信エラーが発生しました");
        return;
      }
    }
    window.location.href = "endless"
};
