const questions = {
    historia: [
        { question: "När började andra världskriget?", options: ["1914", "1939", "1945", "1950"], answer: "1939" },
        { question: "Vem var Gustav Vasa?", options: ["Kung", "Upptäcktsresande", "Vetenskapsman", "Poet"], answer: "Kung" },
        { question: "Vilket år var det stora nordiska kriget?", options: ["1700", "1800", "1900", "2000"], answer: "1700" },
        { question: "Vilket år slutade andra världskriget?", options: ["1914", "1939", "1945", "1950"], answer: "1945" }
    ],
    vetenskap: [
        { question: "Vad är vatten kemiskt?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
        { question: "Vilken planet är störst i solsystemet?", options: ["Jorden", "Mars", "Jupiter", "Venus"], answer: "Jupiter" },
        { question: "Vilket är det minsta elementet?", options: ["Väte", "Syre", "Kväve", "Helium"], answer: "Väte" },
        { question: "Vad är den kemiska beteckningen för guld?", options: ["Au", "Ag", "Cu", "Fe"], answer: "Au" },
        { question: "Vad är den kemiska beteckningen för silver?", options: ["Ag", "Au", "Cu", "Fe"], answer: "Ag" }
    ],
    geografi: [
        { question: "Vilket land är störst till ytan?", options: ["Ryssland", "Kina", "USA", "Kanada"], answer: "Ryssland" },
        { question: "Vilket land är minst till ytan?", options: ["Monaco", "Vatikanstaten", "San Marino", "Nauru"], answer: "Vatikanstaten" },
        { question: "Vilket land är mest tätbefolkat?", options: ["Monaco", "Vatikanstaten", "San Marino", "Nauru"], answer: "Monaco" },
        { question: "Vilket land har flest invånare?", options: ["Kina", "Indien", "USA", "Indonesien"], answer: "Kina" },
        { question: "Vilket land har minst invånare?", options: ["Vatikanstaten", "Tuvalu", "Nauru", "Palau"], answer: "Vatikanstaten" }
    ]
};

let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentCategory][currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.setAttribute("data-id", option);
        button.classList.add("answer-option");
        button.onclick = () => selectAnswer(option, questionData.answer);
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").innerText = `Tid kvar: ${timeLeft} sek`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Tid kvar: ${timeLeft} sek`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer(selected, correct) {
    clearInterval(timer);

    // Mark the selected answer
    const selectedButton = document.querySelector(`[data-id="${selected}"]`);
    if (selectedButton) {
        if (selected === correct) {
            selectedButton.style.backgroundColor = "#4CAF50"; // Green
            selectedButton.style.color = "white";
            score++;
        } else {
            selectedButton.style.backgroundColor = "#F44336"; // Red
            selectedButton.style.color = "white";

            // Highlight correct answer
            const correctButton = document.querySelector(`[data-id="${correct}"]`);
            if (correctButton) {
                correctButton.style.backgroundColor = "#4CAF50"; // Green
                correctButton.style.color = "white";
            }
        }
    }

    // Disable all buttons after selection
    const allButtons = document.querySelectorAll(".answer-option");
    allButtons.forEach(button => {
        button.style.pointerEvents = "none";
    });

    // Wait before moving to next question
    setTimeout(function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions[currentCategory].length) {
            resetButtonStyles();
            showQuestion();
        } else {
            showResults();
        }
    }, 1300);
}

function resetButtonStyles() {
    const allButtons = document.querySelectorAll(".answer-option");
    allButtons.forEach(button => {
        button.style.backgroundColor = "";
        button.style.color = "";
        button.style.pointerEvents = "auto";
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentCategory].length) {
        resetButtonStyles();
        showQuestion();
    } else {
        showResults();
    }
}


function restartQuiz() {
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}

function showResults() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("score").innerText = `Du fick ${score} av ${questions[currentCategory].length} rätt!`;

    // Trigger confetti animation
    triggerConfetti();
}

function triggerConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2-5s
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}
function showRules() {
    document.getElementById("rules-box").classList.remove("hidden");
}

function hideRules() {
    document.getElementById("rules-box").classList.add("hidden");
}