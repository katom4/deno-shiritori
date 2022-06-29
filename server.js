import { serve } from "https://deno.land/std@0.138.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts"
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("wnjpn.db");
let previousWord = "しりとり";
let previousWords = new Array() ["しりとり"];
console.log("Listening on http://localhost:8000");

serve(async(req) => {
    const pathname = new URL(req.url).pathname;
    console.log(pathname);

    if(req.method === "GET" && pathname === "/shiritori"){
        return new Response(previousWord);
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
        preWord = previousWords[previousWords.length-1];
        if(
            nextWord.length > 0 &&
            preWord.charAt(preWord.length -1) !== nextWord.charAt(0)
        ){
            return new Response("前の単語に続いていません",{
                status:400
            });
        }
        previousWords[previousWords.length] = nextWord;
        return new Response(previousWords)
    }
    /*if(req.method === "GET" && pathname === "/dbtest"){
        const users = ["a", "b", "c"];
        const db = new DB("wnjpn.db");
        const k = "課金"
        for (const user of db.query(`SELECT wordid FROM word where lemma = '${k}'`,)) {
            console.log(user);
        }
        const a = db.query(`SELECT wordid FROM word where lemma = '${k}'`);
        const b = a.pop().pop()
        console.log(b == 216405);
        db.close();
        return new Response(previousWord);
    }*/
    return serveDir(req,{
        fsRoot:"public",
        urlRoot:"",
        showDirListing:true,
        enableCors:true,
    })
});