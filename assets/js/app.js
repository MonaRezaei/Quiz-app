import myQuestions from "./question.js";

const startButton = document.querySelector(".startBtn");
const welcomeScreen = document.querySelector(".welcomeScreen");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".next");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const timerDisplay = document.querySelector(".timer");


startButton.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 10;
let timerID = null


function startGame() {
    welcomeScreen.style.transform = 'scale(0)';
    timerDisplay.style.display = "flex";
    nextBtn.style.display = "block";
    randomQuestion();
}

const displayQuestion = () => {
    timeLeft = 10;
    alert.style.display = "flex";
    const questionDetails = myQuestions[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if (currentQuestionIndex < myQuestions.length) {
        startTimer();
    }

}

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === myQuestions[currentQuestionIndex].answer) {
        alert.classList.add('correctAnswer');
        displayAlert("Ok");
        score++;
    }
    else {
        alert.classList.add('wrongAnswer');
        displayAlert("No");
    }

    timeLeft = 10;
    currentQuestionIndex++;
    if (currentQuestionIndex < myQuestions.length) {
        displayQuestion();
    } else {
        showScore();
        stopTimer();
    }
}

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.innerHTML = `Your Score ${score}/${myQuestions.length}`;
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timerDisplay.style.display = "none";
    alert.style.display = "none";
}

const displayAlert = (msg) => {
    alert.textContent = msg;
    setTimeout(() => {
        alert.classList.remove('correctAnswer');
        alert.classList.remove('wrongAnswer');
        alert.textContent = "";
    }, 1000)
}
const startTimer = () => {
    clearInterval(timerID);
    timerDisplay.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("time up!!  do  you  want to continue?");
            if (confirmUser) {
                timeLeft = 10;
                currentQuestionIndex++;
                startQuiz();
            } else {
                welcomeScreen.style.transform = 'scale(1)';
                timerDisplay.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

const stopTimer = () => clearInterval(timerID);


const randomQuestion = () => {
    for (let i = myQuestions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [myQuestions[i], myQuestions[j]] = [myQuestions[j], myQuestions[i]];
    }
    currentQuestionIndex = 0;
    displayQuestion();
}

const startQuiz = () => {
    timeLeft = 10;
    timerDisplay.style.display = "flex";
    randomQuestion();
}
function nextQuestion() {
    const selectedChoice = document.querySelector(`.choice.selected`);
    if (!selectedChoice && nextBtn.textContent === "Next") {

        return;
    } else if (quizOver) {

        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        score = 0;
        startQuiz();
        quizOver = false;

    } else {

        checkAnswer();
    }

}







