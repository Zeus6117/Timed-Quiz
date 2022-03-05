const welcomeEl = document.querySelector("#container");

const startButton = document.getElementById('start-btn')

const questionContainerElement = document.getElementById
('questions-container')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

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
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    startTimer()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
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
        } else {
            count -=10
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
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

const questions = [
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
      getNextQuestion();
    });
  }