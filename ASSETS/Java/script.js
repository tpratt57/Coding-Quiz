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

//function that calls back to showQuestions to prompt questions 
function showQuestions (currentQuestionIndex){
    titleTag.textContent = question.questions[currentQuestionIndex];
    createAnswersElement(currentQuestionIndex);

    return;
}

//creates a new answer element in the answer list element & clears out previous answer 
function createAnswersElement(currentQuestionIndex){
    answerButtonList.innerHTML = '';

    for(let answersIndex = 0; answersIndex < question.answers[currentQuestionIndex].length; answersIndex++){
        var currentAnswerListItem = document.createElement('li');
        var tempStr = (question.answers[currentQuestionIndex][answersIndex].includes('correct:'));

        if(question.answers[currentQuestionIndex][answersIndex].includes('correct')){
            tempStr = question.answers[currentQuestionIndex][answersIndex].substring(8, question.answers[currentQuestionIndex][answersIndex].length);
            currentAnswerListItem.id = 'correct';
        }

        currentAnswerListItem.textContent = tempStr;
        answerButtonList.appendChild(currentAnswerListItem);
    }
    return;
}

//function to switch to next question and show question content 

function nextQuestion(){
    questionsIndexNumber++;
    if(questionsIndexNumber >= question.questions.length){
        endGame();
    }
    else{
        showQuestions(questionsIndexNumber);
    }

    return;
}

//function to end the question "game"

function endQuiz(){
    gameEnded = true;
    score = timeLeft;

    //hiding elements
    timerP.style.display = 'none';
    titleTag.style.display = 'none';
    answerButtonList.innerHTML = '';

    //show endscreen score and form to enter name for highscore
    document.querySelector('#scoreSpan').textContent = score;
    document.querySelector('#submit-highscore-div').style.display = 'block';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function quizStart(){
    startQuiz.addEventListener('click', startGame);
    answerButtonList.addEventListener('click', checkAnswer);
    viewHighscores.addEventListener('click', showHighscores);
    submitHighscore.addEventListener('click', storeScoreAndName);
    clearHighscores.addEventListener('click', clearHighscores);
    returnMainPage.addEventListener('click', setUpGame);

    setUpGame();

    return;
}

quizStart();