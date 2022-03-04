// Welcome Page Elements//
const welcomeEl = document.querySelector("#welcome");

// Quiz Questions//

const quizContentEl = document.querySelector("#quiz-questions");

var initials;

// Start button is assigned tp the startButton id//
const startButtonEl = document.querySelector("#startButton");

//Quiz questions//
let currentQuestion = 0;

let questions = [
  {
    question: "Commonly used data types DO NOT include?",
    answers: {
      a: "Strings",
      b: "Booleans",
      c: "Alerts",
      d: "Numbers",
    },
    correctAnswer: "Alerts",
  },

  {
    question: "What does API stand for?",
    answers: {
      a: "Application Programming Instance",
      b: "Application Program Instance",
      c: "Application Programming Interface",
      d: "None of the above",
    },
    correctAnswer: "Application Programming Interface",
  },
  {
    question:
      "What is the observation of a user behavior, such as a click, called?",
    answers: {
      a: "Event Listener",
      b: "Event Attribute",
      c: "Event ",
      d: "None of the Above",
    },
    correctAnswer: "Event Listener",
  },
  {
    question: "What is a callback function?",
    answers: {
      a: "A function inside of an object",
      b: "A function inside of a stylesheet",
      c: "A function inside of a function",
      d: "A function inside of the DOM",
    },
    correctAnswer: "A function inside of a function",
  },
];

//Universal//
const timerEl = document.querySelector("#timer");

var interval;
var time = null;
var count = 90;

let scores = JSON.parse(localStorage.getItem("user")) || [];

//timer functionality//

function startTimer() {
    time = setInterval(updateTimer, 1000);
  }