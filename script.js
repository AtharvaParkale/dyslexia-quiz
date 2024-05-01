const quizQuestions = [
  {
    question: "Check whether these two alphabets are same or not?",
    image: "assets/f.png",
    options: ["Yes", "No"],
    correctAnswer: "No",
    audio: "",
    score: 0,
  },
  {
    question: "Guess the fruit in the picture below.",
    image: "assets/apple.png",
    options: ["Apple", "Orange", "Banana", "Mango"],
    correctAnswer: "Apple",
    audio: "",
    score: 0,
  },
  {
    question: "Check whether these two alphabets are same or not?",
    image: "assets/v.png",
    options: ["Yes", "No"],
    correctAnswer: "No",
    audio: "",
    score: 0,
  },
  {
    question: "Which letter is Q?",
    image: "assets/q.png",
    options: ["First", "Second"],
    correctAnswer: "Second",
    audio: "",
    score: 0,
  },
  {
    question: "Which letter COW starts with?",
    image: "assets/cow.png",
    options: ["K", "S", "C"],
    correctAnswer: "C",
    audio: "",
    score: 0,
  },
  {
    question: "What is the smaller version of this letter?",
    image: "assets/s.png",
    options: ["T", "s"],
    correctAnswer: "s",
    audio: "",
    score: 0,
  },
  {
    question: "What do you hear?",
    image: "",
    options: ["P", "R"],
    correctAnswer: "R",
    audio: "assets/R.mp3",
    score: 0,
  },
  {
    question: "What do you see in the picture?",
    image: "assets/chocolate.png",
    options: ["Chocolate", "Medicine"],
    correctAnswer: "Chocolate",
    audio: "",
    score: 0,
  },
  {
    question: "Which hand is left and which hand is right?",
    image: "assets/hand.png",
    options: [
      "First one is right and next one is left",
      "First one is left and next one is right",
    ],
    correctAnswer: "First one is left and next one is right",
    audio: "",
    score: 0,
  },
  {
    question: "What do you hear?",
    image: "",
    options: ["Good Night", "Good Morning"],
    correctAnswer: "Good Morning",
    audio: "assets/GoodMorning.mp3",
    score: 0,
  },
];

function displayAudioUI() {
  var audioElement = document.getElementById("question-audio");

  // Check if src attribute is not specified
  if (!audioElement.src) {
    // If src is not specified, set display to "none"
    audioElement.style.display = "none";
  }
}
displayAudioUI();

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Function to start the quiz
function startQuiz() {
  // Hide the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const questionImage = document.getElementById("question-image");
  const questionAudio = document.getElementById("question-audio");

  questionText.innerHTML = "";
  answerButtons.innerHTML = "";
  questionImage.src = "";
  questionAudio.src = "";

  questionText.innerHTML = currentQuestion.question;

  if (currentQuestion.image !== "") {
    questionImage.src = currentQuestion.image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }
  // print(`currentQuestion.audio ${currentQuestion.audio}`);

  if (currentQuestion.audio !== "") {
    questionAudio.src = currentQuestion.audio;
    questionAudio.style.display = "block";
  } else {
    questionAudio.style.display = "none";
  }

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    button.addEventListener("click", function () {
      checkAnswer(option);
    });
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    currentQuestion.score = currentQuestion.score + 4;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;

    // // Update the timer text
    // document.getElementById("timer").textContent = timeLeft;

    // // End the quiz if time runs out
    // if (timeLeft <= 0) {
    //   endQuiz();
    // }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Calculate the score percentage
  const scorePercentage = (score / quizQuestions.length) * 100;

  var languageVocabScore = 0;
  var memoryScore = 0;
  var visualDiscriminationScore = 0;
  var audioDiscriminationScore = 0;

  for (var i = 0; i < quizQuestions.length; i++) {
    if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 7) {
      languageVocabScore = languageVocabScore + quizQuestions[i].score;
    }
    if (i == 1 || i == 8) {
      memoryScore = memoryScore + quizQuestions[i].score;
    }
    if (i == 0 || i == 2 || i == 3 || i == 5) {
      visualDiscriminationScore =
        visualDiscriminationScore + quizQuestions[i].score;
    }
    if (i == 6 || i == 9) {
      audioDiscriminationScore =
        audioDiscriminationScore + quizQuestions[i].score;
    }
  }
  languageVocabScore = languageVocabScore / 28;
  memoryScore = memoryScore / 8;
  visualDiscriminationScore = visualDiscriminationScore / 16;
  audioDiscriminationScore = audioDiscriminationScore / 8;

  // Display the final score
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Language Vocabulary Score: ${languageVocabScore.toFixed(2)}</p>
    <p>Memory Score: ${memoryScore.toFixed(2)}</p>
    <p>Visual Discrimination Score: ${visualDiscriminationScore.toFixed(2)}</p>
    <p>Audio Discrimination Score: ${audioDiscriminationScore.toFixed(2)}</p>
  `;
}

// Add event listener to start the quiz when the start button is clicked
document.getElementById("start-button").addEventListener("click", startQuiz);
