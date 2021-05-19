//alert('yo');
function ageInDays() {
  var birthYear=prompt("What year were you born..?");
  var ageInDayss=(2020-birthYear)*365;
  h1=document.createElement('h1');
  var textAnswer=document.createTextNode('You are '+ageInDayss+' days old.');
  h1.setAttribute('id','ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

//Challenge 2
function imageGen(){
  var image=document.createElement('img');
  var div=document.getElementById('cat-Generator');
  image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

//Challenge 3
function rpsGame(yourChoice){
  var humanChoice,botchoice;

  botchoice=numToChoice(Math.floor(Math.random() * 3));
  humanChoice=yourChoice.id;
  results= decideWinner(humanChoice,botchoice);
  message=finalMessage(results);
  rpsFrontend(humanChoice,botchoice,message);
}


function numToChoice(number){
  return ['rock','paper','scissor'][number];
}

function decideWinner(humanChoice,botchoice) {
    var rpsDatabase={
      'rock':{'rock':0.5,'paper':0,'scissor':1},
      'paper':{'rock':1,'paper':0.5,'scissor':0},
      'scissor':{'rock':0,'paper':1,'scissor':0.5},
    };

    var yourScore=rpsDatabase[humanChoice][botchoice];
    var botScore=rpsDatabase[botchoice][humanChoice];

    return yourScore;
}

function finalMessage(yourScore){

  if(yourScore === 0.5 ){
    return{'message':'Tie','color':'yellow'};
  }
    else if (yourScore === 1) {
      return{'message':'You won!','color':'green'};
    }
    else{
      return{'message':'You lost!','color':'red'};
    }
}


function rpsFrontend(humanImageChoice,botImageChoice,message){
  var imageDatabase={
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissor':document.getElementById('scissor').src
  }

  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissor').remove();

  var humandiv=document.createElement('div');
  var botdiv=document.createElement('div');
  var messagediv=document.createElement('div');

  humandiv.innerHTML="<img src='"+imageDatabase[humanImageChoice]+"'  style='width:290px;height:290px; box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
  messagediv.innerHTML="<h1 style='color:"+message['color']+"; font-size:60px; padding:30px; '>" + message['message'] + "</h1>"
  botdiv.innerHTML="<img src='"+imageDatabase[botImageChoice]+"'  style='width:290px;height:290px; box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humandiv);
  document.getElementById('flex-box-rps-div').appendChild(messagediv);
  document.getElementById('flex-box-rps-div').appendChild(botdiv);
}


//challenge 4
var allButtons=document.getElementsByTagName('button');

var copybuttons=[];
for(let i=0;i<allButtons.length;i++){
  copybuttons.push(allButtons[i].classList[1]);
}

function buttoncolorchange(buttonchoice) {
  if(buttonchoice.value === "red"){
    redButton();
  }
  else if (buttonchoice.value === "green") {
    greenButton();
  }
  else if (buttonchoice.value === "yellow") {
    yellowButton();
  }
  else if (buttonchoice.value === "blue") {
    blueButton();
  }
  else if (buttonchoice.value === "reset") {
    resetButton();
  }
  else if (buttonchoice.value === "random") {
    randomButton();
  }
}


function redButton(){
  for(let i=0;i<allButtons.length;i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-danger');
    }
  }

function greenButton(){
  for(let i=0;i<allButtons.length;i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-success');
      }
    }

function blueButton(){
  for(let i=0;i<allButtons.length;i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-primary');
  }
  }

function yellowButton(){
  for(let i=0;i<allButtons.length;i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-warning');
    }
}

function randomButton(){
  var copy=['btn-primary','btn-success','btn-warning','btn-danger'];
  for(let i=0;i<allButtons.length;i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(copy[Math.floor(Math.random()*4)]);
    }

}

function resetButton() {
  for(let i=0;i<allButtons.length;i++){
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(copybuttons[i]);
    }
  }


//challenge 4
let blackjackGame={
  'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
  'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
  'cards':['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'isStand':false,
  'turnOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];
const hitSound=new Audio('sounds/swish.m4a');
const winSound=new Audio('sounds/cash.mp3');
const lossSound=new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
  if(blackjackGame['isStand']===false){
    let card=randomCard();
      show(card,YOU);
      updateScore(card,YOU);
      showScore(YOU);

  }
}

function randomCard(){
  let randomIndex=Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}


function show(card,activePlayer){
  if(activePlayer['score']<=21){
    let cardImage= document.createElement('img');
    cardImage.src=`Images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();

  }
}

function blackjackDeal(){
  if(blackjackGame['turnOver']===true){
    blackjackGame['isStand']=false;
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

      for(let i=0;i<yourImages.length;i++){
        yourImages[i].remove();
      }

      for(let i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
      }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color="#ffffff";
    document.querySelector('#dealer-blackjack-result').style.color="#ffffff";

    document.querySelector('#blackjack-result').textContent="Let's Play";
    document.querySelector('#blackjack-result').style.color="black";

    blackjackGame['turnOver']=false;
  }
}


function updateScore(card,activePlayer){
  if(card === 'A'){
    if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
      activePlayer['score']+=blackjackGame['cardsMap'][card][1];
    }
    else {
      activePlayer['score']+=blackjackGame['cardsMap'][card][0];
    }
}
else{
    activePlayer['score']+=blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer){
  if(activePlayer['score']>21){
    document.querySelector(activePlayer['scorespan']).textContent='BUST!';
    document.querySelector(activePlayer['scorespan']).style.color='red';
  }
  else{
  document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];
  }
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

async function dealerLogic(){
  blackjackGame['isStand']=true;
  while(DEALER['score']<16 && blackjackGame['isStand']===true){
    let card=randomCard();
    show(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
    blackjackGame['turnOver']=true;
    showResult(computeWinner());

}


function computeWinner() {
  let winner;
  if(YOU['score']<=21){
    if(YOU['score']>DEALER['score'] || DEALER['score']>21){
      console.log('You won');
      blackjackGame['wins']++;
      winner=YOU;
    }
    else if(YOU['score']<DEALER['score']){
      console.log('You lost');
      blackjackGame['losses']++;
      winner=DEALER;
    }
    else if(YOU['score'] === DEALER['score']){
      blackjackGame['draws']++;
      console.log('You drew');
    }
  }
  else if(YOU['score']>21 && DEALER['score']<=21){
    console.log('You lost');
    blackjackGame['losses']++;
    winner = DEALER;
  }
  else if(YOU['score']>21 && DEALER['score']>21){
    console.log('You drew');
    blackjackGame['draws']++;
  }

  console.log('winner is',winner);
  return winner;
}


function showResult(winner){
  let message,messageColor;
  if(blackjackGame['turnOver']===true){
    if(winner===YOU){
      winSound.play();
      document.querySelector('#wins').textContent=blackjackGame['wins'];
      message="You Won";
      messageColor="green";
    }
    else if (winner===DEALER) {
      lossSound.play();
      document.querySelector('#losses').textContent=blackjackGame['losses'];
      message="You Lost";
      messageColor="red";

    }
    else{
      message="You Drew";
      document.querySelector('#draws').textContent=blackjackGame['draws'];
      messageColor="black";
    }
    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
  }
}
