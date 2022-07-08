import { serve } from "https://deno.land/std@0.138.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts"

console.log("Listening on http://localhost:8000");

serve(async(req) => {
    
    const pathname = new URL(req.url).pathname;
    console.log(pathname);
    
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
        else if(judge == "not shiritori"){
            return new Response("終わってはいけない文字で終わっています",{
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
    if(req.method === "GET" && pathname === "/mypage"){
        return new Response(await Deno.readTextFile("./public/mypage.html"), {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }
    if(req.method === "GET" && pathname === "/register"){
        return new Response(await Deno.readTextFile("./public/register.html"), {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }
    if(req.method === "GET" && pathname === "/endless"){
        return new Response(await Deno.readTextFile("./public/endless.html"), {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }
    if(req.method === "POST" && pathname === "/endless/shiritori"){
        var connection = new WebSocket("ws://localhost:8000/ws/");
        connection.send("aaa");
        console.log("aaa")
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;
        const preWord = previousWords[previousWords.length-1];
        
        if(preWord.charAt(preWord.length -1) !== nextWord.charAt(0)){
            return new Response("前の単語に続いていません",{
                status:400
            });
        }
        else if(previousWords.indexOf(nextWord) != -1){
            return new Response("既に使われた単語です！",{
                status:400
            });
        }
        
        previousWords[previousWords.length] = nextWord;
        return new Response(previousWords)
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
    const ngWords = ["ん","ぁ","ぃ","ぅ","ぇ","ぉ","ゃ","ゅ","ょ","っ","ぢ"];
    const isShiritori = !ngWords.includes(word.charAt(word.length-1));

    if(!isNone)return "please word";
    if(!isHiragana)return "not hiragana";
    if(!isWord)return "not word";
    if(!isShiritori)return "not shiritori";

    return "correct";
}