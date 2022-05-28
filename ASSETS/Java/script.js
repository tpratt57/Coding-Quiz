var timer = document.querySelector("#timer");
var timerP = document.querySelector('header');
var submitHighscore = document.querySelector("#submit-highscore");
var viewHighscores = document.querySelector("#view-highscore");
var clearHighscores = document.querySelector("#clearHighscores");
var answerButtonList = document.body.querySelector('ul');
var returnMainPage = document.querySelector("#return-main-page");
var startQuiz = document.querySelector('#start-quiz');
var titleTag = document.querySelector('#title');
var globalTimer = 90;
var questionsIndexNumber = 0;
var timeRemaining = globalTimer;
var score = 0;
var gameEnd = true;


//question and answer objects with arrays 
var question = {
    questions: [],
    answers: []
}

//initial setup after clicking start quiz from main-menu
function startGame() {
    gameEnd = false;
    questionsIndexNumber = 0;

    //when game starts, clear main div
    viewHighscores.style.display = 'none';
    startQuiz.style.display = 'none';
    document.querySelector('#instructions').style.display = 'none';
    timerP.style.display = 'block';

    //function that displays hidden questions 
    showQuestions(questionsIndexNumber);
    startTimer();

    return;
}

//timer function that runs while user takes quiz
function startTimer() {
    var timeInterval = setInterval(function() {
        if (gameEnd === true) {
            clearInterval(timeInterval);
            return;
        }

        if (timeRemaining < 1) {
            clearInterval(timeInterval);
            endGame();
        }

        timer.textContent = timeLeft;
        timeLeft--;
    }, 1000);
}



