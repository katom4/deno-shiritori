

document.querySelector("#firebasetest").onclick = 
  async(event) => {
    /*try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }*/
  };
window.onload = async(event) =>{
    const response = await fetch("/shiritori");
    const responseText = await response.text();
    var previousWords = responseText.split(",");
    
    const para = document.querySelector("#previousWord");
    para.innerText = `前の単語：${previousWords[previousWords.length-1]}`;

    const score = document.querySelector("#score");
    score.innerText = `スコア：${previousWords.length-1}`;

    var st1 = "#pre";
      var j = 1;
      console.log(previousWords.length);
      for(let i= previousWords.length-1;
        i>previousWords.length-11 && previousWords[i] != null; i--){
          const id = st1 + String(j);
          j++;
          console.log(id);
          document.querySelector(id).innerText = previousWords[i];
      }
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
      const nextWord = 
      document.querySelector("#nextWordInput").value;
      if(nextWord ==""){
          return;
      }
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
      var previousWords = responseText.split(",");
      

      document.querySelector("#nextWordInput").value = "";
      const para = document.querySelector("#previousWord");
      para.innerText = `前の単語：${previousWords[previousWords.length-1]}`;

      const score = document.querySelector("#score");
      score.innerText = `スコア：${previousWords.length-1}`;

      var st1 = "#pre";
      var j = 1;
      for(let i= previousWords.length-1;
        i>previousWords.length-11 && previousWords[i] != null; i--){
          const id = st1 + String(j);
          j++;
          document.querySelector(id).innerText = previousWords[i];
      }
      var connection = new WebSocket("ws://localhost:8000/ws/");
      connection.onmessage = function(e) {
 
        console.log(e.data);
     
    };
  };
