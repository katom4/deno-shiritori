import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
getDocs,
getFirestore,
collection, query,where,orderBy,limit,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { getAuth, sendEmailVerification, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {FIREBASE_CONFIG} from "./config.js";

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();
const db = getFirestore(app);

window.addEventListener("load",async(event) =>{
    await onAuthStateChanged(auth, async(user) => {
        if (user) {
            if(user.emailVerified == false){
                document.querySelector("#isVerified").style.display = "block";
            }
            var uid = user.uid;
            const wordsRef = collection(db,"words");
            var posted = false;
            await getDocs(query(wordsRef, where("uid","==",uid),orderBy("createAt","desc"),limit(1))).then(snapshot => {
            snapshot.forEach(doc => {
                const lastDate =doc.data()["createAt"].toDate();
                const lastDateDiv = document.querySelector("#lastDate");
                const year = lastDate.getFullYear();
                const month = lastDate.getMonth() + 1;
                const date = lastDate.getDate();
                const text = `最後に投稿した日付は${year}年${month}月${date}日です`;
                lastDateDiv.innerText = text;
                posted = true;
            })
            if(!posted){
                document.querySelector("#lastDate").innerText = "まだ投稿していません";
            }
            else{
                
            }
            const subtext1 = "登録されているメールアドレスは "
            const subtext2 =" です。"
            document.querySelector("#myEmail").innerText = subtext1 + user.email + subtext2;
        })
        
        } else {
            document.querySelector("#isLoginSen").innerText = "ログインしてください!";
            document.querySelector("#logout").style.display = "none";
        }
      });
});


document.querySelector("#logout").onclick = 
async(event) => {
    await signOut(auth).then(() => {
        window.location.href = '/';
      }).catch((error) => {
        window.location.href = '/';
    });
}

document.querySelector("#resend").onclick =
async(event) => {
    await sendEmailVerification(auth.currentUser)
        .then(() => {
            document.querySelector("#warning").style.display = "none";
            document.querySelector("#info").style.display = "block";
            document.querySelector("#info").innerText = "認証メールを再送信しました。";
         }).catch((error) => {
            document.querySelector("#info").style.display = "none";
            document.querySelector("#warning").style.display = "block";
            document.querySelector("#warning").innerText = "送信エラーが発生しました。";
        });
}