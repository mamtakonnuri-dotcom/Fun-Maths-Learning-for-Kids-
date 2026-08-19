let level=1, score=0, q=0, type="", current={};

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function setLevel(n){level=n;show("menu")}
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function range(){return level===1?5:level===2?10:12}
function shuffle(a){return a.sort(()=>Math.random()-.5)}

function startQuiz(t){
  type=t; score=0;q=0;show("game");nextQuiz();
}
function nextQuiz(){
  q++;
  let max=range(), a,b,answer;
  if(type==="mul"){a=rand(1,max);b=rand(1,10);answer=a*b}
  else{
    b=rand(1,Math.min(max,10)); answer=rand(1,max); a=b*answer;
  }
  current.answer=answer;
  let opts=new Set([answer]);
  while(opts.size<4) opts.add(Math.max(0,answer+rand(-5,10)));
  let arr=shuffle([...opts]);
  document.getElementById("gameContent").innerHTML=`
  <div class="gamebox">
    <div class="score">Question ${q} / 10 &nbsp; | &nbsp; Score: ${score}</div>
    <div class="progress"><div class="bar" style="width:${(q-1)*10}%"></div></div>
    <h2>${type==="mul"?"Multiplication ✖️":"Division ➗"}</h2>
    <div class="question">${a} ${type==="mul"?"×":"÷"} ${b} = ?</div>
    <div class="answers">${arr.map(x=>`<button class="answer" onclick="answerQuiz(${x})">${x}</button>`).join("")}</div>
    <div id="feedback" class="feedback"></div>
  </div>`;
}
function answerQuiz(x){
  let f=document.getElementById("feedback");
  if(x===current.answer){
    score++;f.textContent="🎉 Great job!";
    setTimeout(()=>q>=10?finish():nextQuiz(),650);
  }else{f.textContent="💡 Try again! Think carefully."; }
}
function finish(){
 document.getElementById("gameContent").innerHTML=`<div class="gamebox"><h1>🏆 Well Done!</h1><div class="question">${score}/10</div><p>${score>=8?"Amazing work! 🌟":"Good try! Keep practising! 💪"}</p><button onclick="show('menu')">🎮 Play another game</button></div>`;
}

function startGroups(){
 show("game");let groups=rand(2,level===1?4:6), each=rand(2,5), total=groups*each;
 document.getElementById("gameContent").innerHTML=`<div class="gamebox">
 <h2>🍎 Equal Groups</h2><p>There are <b>${groups}</b> groups with <b>${each}</b> apples in each group.</p>
 <div class="objects">${Array.from({length:groups},()=>`<span class="group">${"🍎".repeat(each)}</span>`).join("")}</div>
 <div class="question">${groups} × ${each} = ?</div>
 <div class="answers">${shuffle([total,total+1,total-1,groups+each]).map(x=>`<button class="answer" onclick="groupsCheck(${x},${total})">${x}</button>`).join("")}</div>
 <div id="feedback" class="feedback"></div></div>`;
}
function groupsCheck(x,a){document.getElementById("feedback").textContent=x===a?"🎉 Perfect!":"💡 Count all the apples again."}

function startShare(){
 show("game");let kids=rand(2,level===1?3:5), each=rand(2,5), total=kids*each;
 document.getElementById("gameContent").innerHTML=`<div class="gamebox">
 <h2>🐰 Fair Sharing</h2><p>Share <b>${total}</b> carrots equally among <b>${kids}</b> rabbits.</p>
 <div class="objects">🐰 &nbsp; 🥕×${total} &nbsp; 🐰</div>
 <div class="question">${total} ÷ ${kids} = ?</div>
 <div class="answers">${shuffle([each,each+1,Math.max(1,each-1),kids+each]).map(x=>`<button class="answer" onclick="groupsCheck(${x},${each})">${x}</button>`).join("")}</div>
 <div id="feedback" class="feedback"></div></div>`;
}

function startRace(){
 score=0;q=0;show("game");raceQuestion();
}
function raceQuestion(){
 q++;let a=rand(1,range()),b=rand(1,8),ans=a*b;current.answer=ans;
 let opts=shuffle([ans,ans+1,Math.max(1,ans-1),ans+2]);
 document.getElementById("gameContent").innerHTML=`<div class="gamebox"><h2>🚗 Multiplication Race</h2><p>Answer correctly to move the car!</p>
 <div class="car-track">🏁 <span id="car">🚗</span> 🏁</div>
 <div class="score">Question ${q}/5 | Score: ${score}</div><div class="question">${a} × ${b} = ?</div>
 <div class="answers">${opts.map(x=>`<button class="answer" onclick="raceCheck(${x})">${x}</button>`).join("")}</div>
 <div id="feedback" class="feedback"></div></div>`;
}
function raceCheck(x){
 let f=document.getElementById("feedback");
 if(x===current.answer){score++;document.getElementById("car").style.transform=`translateX(${Math.min(score*70,350)}px)`;f.textContent="🚗💨 Correct!";setTimeout(()=>q>=5?finish():raceQuestion(),500)}
 else f.textContent="❌ Try again!";
}

function startMissing(){
 show("game");let a=rand(2,range()),b=rand(2,8),ans=a*b;
 let blank=rand(0,1), question=blank?`__ × ${b} = ${ans}`:`${a} × __ = ${ans}`;
 current.answer=blank?a:b;
 let opts=shuffle([current.answer,current.answer+1,Math.max(1,current.answer-1,current.answer+2)]);
 document.getElementById("gameContent").innerHTML=`<div class="gamebox"><h2>🧩 Missing Number</h2>
 <p>Find the number that is missing.</p><div class="question">${question}</div>
 <div class="answers">${opts.map(x=>`<button class="answer" onclick="groupsCheck(${x},${current.answer})">${x}</button>`).join("")}</div>
 <div id="feedback" class="feedback"></div><button onclick="startMissing()">🔄 New Question</button></div>`;
}
