// 게임시작을 누르면 30초간 임의의 문자가 출력된다.
// 출력된 문자와 동일하게 입력시 점수가 1점 올라간다.
// 시간이 종료되면 최종기록을 로컬스토리지에 저장해서 점수 오름차순으로 볼수있게
// 순위 리셋버튼도 만들기
// 9AC5AAE6F6D7FE572EBA982C17430EC4
const GAME_TIME = 5;
let gameTime = GAME_TIME;
let gameScore = 0;
let statusDisplay = document.querySelector(".gameStatus");
let inputWord = document.querySelector("#inputWord");
let timeInterval;
let turn = true;
let words=[];


const wordDisplay = document.querySelector(".wordDisplay");
const timeDisplay = document.querySelector(".timerDisplay");
const scoreDisplay = document.querySelector(".scoreDisplay");

init();
function init(){
    statusDisplay.classList.remove("playing");
    statusDisplay.classList.add("gameStatus");
    timeDisplay.innerText = `${gameTime}초`
    scoreDisplay.innerText = `${gameScore}점`
    turn = true;
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
            gameTime = GAME_TIME;
            clearTimer();
            timeDisplay.innerText = `${gameTime}초`
            buttonChange("게임시작");
            gameScore = 0 ;
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
    }
    })
