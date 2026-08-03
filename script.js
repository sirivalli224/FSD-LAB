const quiz = [
{
    question: "HTML stands for __________",
    options: [
        "HyperText Markup Language",
        "HyperText Machine Language",
        "HyperText Marking Language",
        "HighText Marking Language"
    ],
    answer: "HyperText Markup Language"
},
{
    question: "What is DOM in HTML?",
    options: [
        "Language dependent application programming",
        "Hierarchy of objects in ASP.NET",
        "Application programming interface",
        "Convention for representing and interacting with objects in HTML documents"
    ],
    answer: "Convention for representing and interacting with objects in HTML documents"
},
{
    question: "In which part of the HTML metadata is contained?",
    options: [
        "head tag",
        "title tag",
        "html tag",
        "body tag"
    ],
    answer: "head tag"
}
];

let index = 0;
let score = 0;
let timer = 30;
let timerInterval;

const question = document.getElementById("question");
const options = document.getElementById("options");
const result = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

function loadQuestion() {

    // Reset timer for every question
    clearInterval(timerInterval);
    timer = 30;
    timerDisplay.innerHTML = "Time: " + timer;

    question.innerHTML = quiz[index].question;
    options.innerHTML = "";

    quiz[index].options.forEach(option => {
        options.innerHTML += `
            <label>
                <input type="radio" name="ans" value="${option}">
                ${option}
            </label><br>
        `;
    });

    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timer--;
        timerDisplay.innerHTML = "Time: " + timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {

    clearInterval(timerInterval);

    const selected = document.querySelector('input[name="ans"]:checked');

    if (selected && selected.value === quiz[index].answer) {
        score++;
    }

    index++;

    if (index < quiz.length) {
        loadQuestion();
    } else {
        question.innerHTML = "";
        options.innerHTML = "";
        timerDisplay.innerHTML = "Quiz Finished!";
        result.innerHTML = `Your Score: ${score}/${quiz.length}`;
    }
}

loadQuestion();