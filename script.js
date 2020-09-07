const GAME_TIME = 5;
let gameTime = GAME_TIME;
let gameScore = 0;
let statusDisplay = document.querySelector(".gameStatus");
let inputWord = document.querySelector("#inputWord");
let timeInterval;
let turn = true;
let words=[];
let lastScore= 0;
let highScore= 0;
const wordDisplay = document.querySelector(".wordDisplay");
const timeDisplay = document.querySelector(".timerDisplay");
const scoreDisplay = document.querySelector(".scoreDisplay");

const rankDisplay = document.querySelector("#rankScore");
const rankResetVar = document.querySelector("#resetRank");


init();

function init(){
    getWords();
    statusDisplay.classList.remove("playing");
    statusDisplay.classList.add("gameStatus");
    timeDisplay.innerText = `${gameTime}초`
    scoreDisplay.innerText = `${gameScore}점`
    turn = true;
    inputHighScore();


}
// 로컬스토리지 최고 점수 저장
function checkHigh(){
if(lastScore > highScore){
    highScore = lastScore;
    localStorage.setItem("highScore",highScore);
    inputHighScore();

}
}

function inputHighScore(){
    if(localStorage.getItem("highScore")){
        rankDisplay.innerText=`최고점수 : ${localStorage.getItem('highScore')}점`;
        }else{
            rankDisplay.innerText=`기록이 존재하지 않습니다.`
        }
}
// 로컬스토리지 삭제

rankResetVar.addEventListener("click",()=>{
    localStorage.clear();
    rankDisplay.innerText=`기록이 존재하지 않습니다.`}
)


// 타이머기능
function timer(){
    timeInterval = setInterval(countTime,1000)
}

function countTime(){
    if(gameTime > 0){
        gameTime--
        timeDisplay.innerText = `${gameTime}초`
         }else if(gameTime === 0 ){
            lastScore = gameScore;
             lastScore = gameScore;
             checkHigh()
            gameTime = GAME_TIME;
            clearTimer();
            gameScore = 0 ;
            timeDisplay.innerText = `${gameTime}초`
            scoreDisplay.innerText = `${gameScore}점`
            buttonChange("게임시작");
            turn = true;
            alert('게임이 종료되었습니다!');
        }
}

function clearTimer(){
    clearInterval(timeInterval)
}

// 점수출력

inputWord.addEventListener("input",correct);

function correct(){
    if(wordDisplay.innerText === inputWord.value && !turn){
        gameScore++
        scoreDisplay.innerText = `${gameScore}점`
        inputWord.value = "";
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText=words[randomIndex];
    }
}


// 게임상태 택스트
function buttonChange(text){
    statusDisplay.innerText=text
    if(text === '게임시작'){
        statusDisplay.classList.remove("playing");
        statusDisplay.classList.add("gameStatus");
        }else{
            statusDisplay.classList.add("playing");
            statusDisplay.classList.remove("gameStatus");
        }
}

// 시작버튼클릭


    statusDisplay.addEventListener("click",function(){
        if(turn){
        buttonChange("게임중입니다");
        timer();
        turn = false;
        inputWord.focus();
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText=words[randomIndex];

    }
    })


// 단어 생성
function getWords(){
 
    axios.get('https://random-word-api.herokuapp.com/word?number=300')
      .then(function (response) {
          response.data.forEach((word)=>{
            if(word.length < 8 )
            words.push(word)
          })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    }

