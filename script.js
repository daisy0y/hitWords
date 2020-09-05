// 게임시작을 누르면 30초간 임의의 문자가 출력된다.
// 출력된 문자와 동일하게 입력시 점수가 1점 올라간다.
// 시간이 종료되면 최종기록을 로컬스토리지에 저장해서 점수 오름차순으로 볼수있게
// 순위 리셋버튼도 만들기

const GAME_TIME = 30;
let gameTime = GAME_TIME;
let gameScore = 0;
let statusDisplay = document.querySelector(".gameStatus");
let inputWord = document.querySelector("#inputWord");
let timeInterval;
let turn = true;
let words=[];
let lastScore= 0;
let highScore= parseInt(localStorage.getItem('highScore'));

const wordDisplay = document.querySelector(".wordDisplay");
const timeDisplay = document.querySelector(".timerDisplay");
const scoreDisplay = document.querySelector(".scoreDisplay");

const rankScore = document.querySelector("#rankScore");

// 로컬스토리지 최고 점수 저장
function checkHigh(){
if(lastScore > highScore){
    highScore = lastScore;
    localStorage.setItem("highScore",highScore);
    inputHighScore();

}
}

function inputHighScore(){
    rankScore.innerText=`최고점수 : ${localStorage.getItem('highScore')}점`;
}


init();
function init(){
    statusDisplay.classList.remove("playing");
    statusDisplay.classList.add("gameStatus");
    timeDisplay.innerText = `${gameTime}초`
    scoreDisplay.innerText = `${gameScore}점`
    turn = true;
    getWords();
    checkHigh();
    inputHighScore();

}


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

