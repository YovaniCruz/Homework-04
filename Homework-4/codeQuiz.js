var currentQuestionIndex = -1
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        correctAnswer: "alerts",
        userAnswer: null
    },
    {
        question: "The condition if / else statement enclosed with ______?",
        answers: [
            "quotes",
            "curley brackets",
            "parenthasis",
            "square brackets"
        ],
        correctAnswer: "parenthasis",
        userAnswer: null
    },
    {
        question: "Arrays in JavaScript can be used to store______?",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correctAnswer: "all of the above",
        userAnswer: null
    },
    {
        question: "String values must be enclosed with _____ when being assigned to variables.",
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis"
        ],
        correctAnswer: "parenthesis",
        userAnswer: null
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is_______.",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console log"
        ],
        correctAnswer: "console log",
        userAnswer: null
    }]

nextQuestion()
function nextQuestion() {
    currentQuestionIndex++
    displayQuestion(questions[currentQuestionIndex])
}

function displayQuestion(q) {
    var template = `<h1>${q.question}</h1>
    <p class="answer"> ${q.answers[0]}</p>
    <p class="answer"> ${q.answers[1]}</p>
    <p class="answer"> ${q.answers[2]}</p>
    <p class="answer"> ${q.answers[3]}</p>`
    console.log(template)
    quiz.innerHTML = template
}

document.addEventListener("click", function (event) {
    console.log(event.target)
    if (event.target.classList.contains("answer")) {
        console.log(event.target.innerHTML)
        var a = event.target.innerHTML
        questions[currentQuestionIndex].userAnswer = a
        nextQuestion()
    }
})

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

(function () {
    function buildQuiz() {
        // variable to store the HTML output
        var output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        var answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {

        // ...add an HTML radio button
        answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
             ${letter} :
             ${currentQuestion.answers[letter]}
            </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

        // combine output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

        function showResults(){

        // gather answer containers from quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    // Pagination
    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Kick things off
    buildQuiz();
    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;
        if(currentSlide === 0){
          previousButton.style.display = "none";
        }
        else{
          previousButton.style.display = "inline-block";
        }
        if(currentSlide === slides.length-1){
          nextButton.style.display = "none";
          submitButton.style.display = "inline-block";
        }
        else{
          nextButton.style.display = "inline-block";
          submitButton.style.display = "none";
        }
        function showNextSlide() {
            showSlide(currentSlide + 1);
          }
          
          function showPreviousSlide() {
            showSlide(currentSlide - 1);
          }
        // Event listeners
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
        submitButton.addEventListener("click", showResults);
      }
      
})();
