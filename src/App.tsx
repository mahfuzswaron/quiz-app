import React, {useState} from 'react';
import {fetchQuestions} from "./API";
// types 
import { Difficulty, QusetionState } from './API';
// componencts
import QuestionCard from './components/QuestionCard';

// consts
const TOTAL_Q_NUMBER = 10;

type AswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
const [Loading, setLoading] = useState(false);
const [questions, setQuestions] = useState<QusetionState[]>([]);
const [number, setNumber] = useState(0);
const [userAnswers, setUserAnswers] = useState<AswerObject[]>([]);
const [score, setScore] = useState(0);
const [gameOver, setGameOver] = useState(true);

// console.log(questions);


const startQuiz = async () =>{
setLoading(true);
setGameOver(false);

const newQuestions = await fetchQuestions(TOTAL_Q_NUMBER, Difficulty.EASY);
setQuestions(newQuestions);

setScore(0);
setNumber(0);
setUserAnswers([]);
setLoading(false);
}

const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{

}

const nextQuestion = () => {

}

// console.log(questions);
if(Loading) return <p>Loading...</p>

  return (
    <div>
      <h1> TypScript Quiz </h1>
      {
        gameOver || TOTAL_Q_NUMBER === userAnswers.length ?  
        <button className="start" onClick={startQuiz}>
        Start
      </button>
      : 
      null
      }
     
      <p className="score">Score: {score} </p>
      {
        questions.length ?

        <QuestionCard 
        questionNr={number + 1}
        question={questions[number].question}
        callback={checkAnswer}
        answers={questions[number].answers}
        totalQuestions={TOTAL_Q_NUMBER}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
      />
      : 
      null
      }
      <button className="next" onClick={nextQuestion}>
              Next Question
      </button>
    </div>
  );
}

export default App;
