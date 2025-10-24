const questions = [

{
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    answer: 1
},
{
    question: "What is the capital of India?",
    options: ["London", "Paris", "Delhi"],
    answer: 2
},
{
    question:"Who is the father of java?",
    options:["pitter","jemi","Gossling"],
    answer: 2
},
{
    question:"Who is the father of Nation?",
    options: ["Gandhi", "Neharu", "Bhagat"],
    answer: 0
},

];

let shuffledQuestions = [];

let currentQuestionIndex = 0;

let score = 0;

let timeLeft = 10;

let timerId;

function shuffleArray(array) {

for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
}

function startQuiz() {

shuffleArray(questions);
shuffledQuestions = [...questions];
currentQuestionIndex = 0;
score = 0;
showQuestion();
}

function showQuestion() {

const question = shuffledQuestions[currentQuestionIndex];
document.getElementById('question').textContent = question.question;
const optionsDiv = document.getElementById('options');
optionsDiv.innerHTML = '';
question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(index));
    optionsDiv.appendChild(button);
});
document.getElementById('feedback').textContent = '';
document.getElementById('nextBtn').style.display = 'none';
startTimer();
}

function startTimer() {

timeLeft = 10;
document.getElementById('time').textContent = timeLeft;
timerId = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerId);
        checkAnswer(-1);  // Incorrect
    }
}, 1000);
}

function checkAnswer(selectedIndex) {

clearInterval(timerId);
const question = shuffledQuestions[currentQuestionIndex];
if (selectedIndex === question.answer) {
    score++;
    document.getElementById('feedback').textContent = 'Correct!';
} else {
    document.getElementById('feedback').textContent = 'Incorrect!';
}
currentQuestionIndex++;
if (currentQuestionIndex < shuffledQuestions.length) {
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('nextBtn').onclick = showQuestion;
} else {
    endQuiz();
}
}

function endQuiz() {

document.getElementById('quizContainer').style.display = 'none';
document.getElementById('scoreContainer').style.display = 'block';
document.getElementById('score').textContent = score;
}

// Start the quiz when the page loads

document.addEventListener('DOMContentLoaded', startQuiz);