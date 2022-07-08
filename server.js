import { serve } from "https://deno.land/std@0.138.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts"


serve(async(req) => {
    
    const pathname = new URL(req.url).pathname;
    
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