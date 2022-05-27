const startEl = document.getElementById("start");
const gameEl = document.getElementById("game");
const timeEl = document.getElementById("time");
const timeHeaderEl = document.getElementById("time-header");
const resultHeaderEl = document.getElementById("result-header");
const resultEl = document.getElementById("result");
const gameTimeEl = document.getElementById("game-time");

const imgSrc =[
  "https://i.pinimg.com/474x/9d/72/89/9d728966aa5f3924993ff595e6f8c870.jpg",
  "https://i.ytimg.com/vi/TTskDRvSzGI/maxresdefault.jpg",
  "https://vjoy.cc/wp-content/uploads/2019/06/1-20.jpg",
  "https://klike.net/uploads/posts/2019-08/1567152208_2.jpg",
  "https://bipbap.ru/wp-content/uploads/2017/10/1n1E85xkUnw-640x593.jpg",
];
 let score = 0;

startEl.addEventListener("click", startGame);
gameEl.addEventListener("click", handleBox);
gameTimeEl.addEventListener("input", setGameTime);

let interval=null;

function reverseCounting() {
  let gameTime = +timeEl.innerText;

  if (gameTime <= 0) {
    clearInterval(interval);
    endGame();
  } else {
    timeEl.innerText = (gameTime - 0.1).toFixed(1); //округляет
  }

}

function startGame(params) {
  setGameTime();
  score = 0;

  startEl.classList.toggle("hide");
  gameEl.style.backgroundColor = "green";
  gameTimeEl.setAttribute("disabled", true);

 interval = setInterval(reverseCounting, 100);
  renderBox();
}
function endGame(params) {
  startEl.classList.toggle("hide");
  gameEl.style.backgroundColor = " #ccc";
  gameTimeEl.removeAttribute("disabled");
  gameEl.innerHTML = "";
  resultEl.innerText = score;
  resultHeaderEl.classList.toggle("hide");
  timeHeaderEl.classList.toggle("hide");
}

function renderBox() {
  gameEl.innerHTML = "";

  let box = document.createElement("div");
  let boxSize = getRandom(30, 200);
  let gameZone = gameEl.getBoundingClientRect();
  let maxLeft = gameZone.width - boxSize;
  let maxTop = gameZone.height - boxSize;
  let imgIdx = getRandom(0, imgSrc.length);

  box.style.width = box.style.height = boxSize + "px";
  box.style.background =  `url(${imgSrc[imgIdx]}) center/cover`;
  box.style.cursor = "pointer";
  box.style.position = "absolute";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.top = getRandom(0, maxTop) + "px";
  box.id = "check";
  gameEl.appendChild(box); //вложили в игру
}
function handleBox(event) {
  if (event.target.id === "check") {
    console.log("click");
    score++;
    renderBox();
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setGameTime(){
  let timeGame = +gameTimeEl.value;
timeEl.innerText=timeGame.toFixed(1);
resultHeaderEl.classList.add("hide");
timeHeaderEl.classList.remove("hide");
}
