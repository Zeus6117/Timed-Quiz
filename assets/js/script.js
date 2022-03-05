const welcomeEl = document.querySelector("#container");

const startButton = document.getElementById('start-btn')

const questionContainerElement = document.getElementById
('questions-container')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

let currentQuestion = 0;

let questions = [
    {
        question: "Commonly used data types DO NOT include?",
        answers: [
          {text: 'Strings', correct: false},
          {text: 'Booleans', correct: false},
          {text: 'Alerts', correct: true},
          {text: 'Numbers', correct: false}
        ]
      },
    
      {
        question: "What does API stand for?",
        answers: [
          {text: "Application Programming Instance", correct: false},
          {text: "Application Program Instance", correct: false},
          {text: "Application Programming Interface", correct: true},
          {text: "None of the above", correct: false}
        ]
      },
      {
        question:
          "What is the observation of a user behavior, such as a click, called?",
        answers: [
          {text: "Event Listener", correct: true},
          {text: "Event Attribute", correct: false},
          {text: "Event ", correct: false},
          {text: "None of the Above", correct:false},
        ]
      },
      {
        question: "What is a callback function?",
        answers: [
          {text: "A function inside of an object", correct: false},
          {text: "A function inside of a stylesheet", correct: false},
          {text: "A function inside of a function", correct: true},
          {text: "A function inside of the DOM", correct: false},
        ]
      },
];

startButton.addEventListener('click', startGame)

//universal//
const timerEl = document.querySelector("#timer");

var interval;
var time = null;
var count = 60;

let scores = JSON.parse(localStorage.getItem("user")) || [];

function startTimer() {
    time = setInterval(updateTimer, 1000);
  }

  //Function to update timer//
  function updateTimer() {
      //add inner HTML to the timer element
      document.getElementById("timer").innerHTML = "<p> Time Left: " + count + "second(s) left</p>";
      //minus time from countdown//
      count--;
      if (count === 0) {
          return restartQuiz();
      }
  }


//start game function//
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
    startTimer()
}

function setNextQuestion() {
    if (!questions[currentQuestion]) {
        return endQuiz();
      }
      // Insert Question Text - Heading 1
      document.getElementById("question").innerHTML =
        "<h1 class='question'> Q:" +
        " " +
        questions[currentQuestion].question +
        "</h1>";
    
      // Insert Options - Choice A
    
      document.getElementById(
        "option-1"
      ).innerHTML = `<button class='opt-1' data-ans="${questions[currentQuestion].answers.a}">${questions[currentQuestion].answers.a}</button>`;
    
      // Event Listener - Choice A
    
      document.querySelector(".opt-1").addEventListener("click", function () {
        var user_ans = this.getAttribute("data-ans");
        checkAnswer(user_ans);
      });
    
      // Insert Options - Choice B
      document.getElementById(
        "option-2"
      ).innerHTML = `<button class='opt-2' data-ans="${questions[currentQuestion].answers.b}">${questions[currentQuestion].answers.b}</button>`;
    
      // Event Listener - Choice B
      document.querySelector(".opt-2").addEventListener("click", function () {
        var user_ans = this.getAttribute("data-ans");
        checkAnswer(user_ans);
      });
    
      // Insert Options - Choice C
      document.getElementById(
        "option-3"
      ).innerHTML = `<button class='opt-3' data-ans="${questions[currentQuestion].answers.c}">${questions[currentQuestion].answers.c}</button>`;
    
      // Event Listener - Choice C
      document.querySelector(".opt-3").addEventListener("click", function () {
        var user_ans = this.getAttribute("data-ans");
        checkAnswer(user_ans);
      });
    
      // Insert Options - Choice D
      document.getElementById(
        "option-4"
      ).innerHTML = `<button class='opt-4' data-ans="${questions[currentQuestion].answers.c}">${questions[currentQuestion].answers.d}</button>`;
    
      // Event Listener - Choice D
      document.querySelector(".opt-4").addEventListener("click", function () {
        var user_ans = this.getAttribute("data-ans");
        checkAnswer(user_ans);
      });
    }


//check answers function//
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

 //function to end quiz//
  
 function endQuiz() {
    initials = prompt("Enter Initials");
  
    //user variables go here//
    var user = {
      userInitials: initials,
  
      scoreInput: count,
    };
  
    scores.push(user);
    localStorage.setItem("user", JSON.stringify(scores));
    alert("Quiz has ended - congrats!");
    return restartQuiz();
  }
  
  function restartQuiz() {
    show(welcomeEl);
    clearInterval(time);
    hide(timerEl);
    hide(quizContentEl);
  }
  // Hides Elements
  function hide(element) {
    element.style.display = "none";
  }
  
  // Displays Element
  
  function show(element) {
    element.style.display = "block";
  }
  
  if (startButton) {
    // When user clicks the start button, run the following functions
    startButton.addEventListener("click", function () {
      hide(welcomeEl);
      startGame();
      setNextQuestion();
    });
  }