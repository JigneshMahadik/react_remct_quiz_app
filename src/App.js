import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    getData();
  }, []);

  // Fetched data from API
  async function getData(){
    const data = await axios.get("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple");
    console.log(data.data.results);
    
    // Shuffle questions
    const shuffledQuestions = shuffleArray([...data.data.results]);

    // Shuffle options within each question
    const shuffledQuestionsWithOptions = shuffledQuestions.map(question => ({
      ...question,
      options: shuffleArray([question.correct_answer, ...question.incorrect_answers])
    }));

    setQuestions(shuffledQuestionsWithOptions);
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  // if(currentQuestionIndex < questions.length){
  //   var isLastQuestion = currentQuestionIndex > questions.length - 1;
  // }
  var count = 0;
  // var flag = false;
  return (
    <div className="App">
      <h2>USA Quiz</h2>
      <h3>Current Score : 0</h3>
      <div className="main-cont">
        <div id="quiz-container">
          <h3 id="que-no"> Question 
            { currentQuestionIndex + 1 } out of { questions.length }
          </h3>
          <h3 id="question">{currentQuestion.question}</h3>
          <div id="btns">
            {
              currentQuestion.options.map((option, index) => (
                <button key={index} onClick={()=>
                  { 
                    count++;
                    if(count==5){
                      return;
                    }
                    else{
                      setCurrentQuestionIndex(currentQuestionIndex + 1)
                    }
                  }
              }>{option}</button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
