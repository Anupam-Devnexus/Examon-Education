import React, { useState, useEffect } from 'react';
import Data from '../../DataStore/quizzes.json'; // Replace with API call later

const QuizPageComponent = ({ quizId = 'upsc_gs_2025_01' }) => {
  const quiz = Data.quizzes.find((q) => q.id === quizId);
  const { questions, title, totalMarks, duration } = quiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showReview) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showReview]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} min`;
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowReview(true);
    }
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const calculateScore = () => {
    return questions.reduce((score, q) => {
      const userAnswer = answers[q.id];
      return userAnswer === q.correctAnswerIndex ? score + q.marks : score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = ((score / totalMarks) * 100).toFixed(2);
  const qualified = percentage >= 40;

  const currentQuestion = questions[currentIndex];

  const passedExam = () =>{
    return(
      <div className='relative flex flex-col'>

      </div>
    )
  }

  const renderQuestion = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Question {currentIndex + 1}</h3>
      <p className="text-gray-700">{currentQuestion.question}</p>
      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => {
          const isSelected = answers[currentQuestion.id] === index;
          return (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, index)}
              className={`w-full text-left px-4 py-2 rounded border ${isSelected
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:bg-gray-100'
                }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-gray-200 text-white rounded hover:bg-yellow-600"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[var(--primary-color)] cursor-pointer text-white rounded hover:bg-blue-700"
        >
          Submit & Next
        </button>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Review Answers</h3>
      <div className="text-lg font-medium text-gray-800 space-y-1">
        <p>Score: <span className="text-blue-600">{score} / {totalMarks}</span></p>
        <p>Percentage: <span className="text-blue-600">{percentage}%</span></p>
        <p>Status: <span className={qualified ? 'text-green-600' : 'text-red-600'}>
          {qualified ? 'Qualified' : 'Not Qualified'}
        </span></p>
        <p>Attempted: {Object.keys(answers).length} / {questions.length}</p>
        <p>Correct: {questions.filter(q => answers[q.id] === q.correctAnswerIndex).length}</p>
        <p>Skipped: {questions.filter(q => answers[q.id] === undefined).length}</p>
      </div>

      {questions.map((q, index) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correctAnswerIndex;
        const isSkipped = userAnswer === undefined;

        return (
          <div key={q.id} className="border rounded p-4 space-y-2 bg-white shadow-sm">
            <p className="font-medium text-gray-800">
              {index + 1}. {q.question}
            </p>
            <div className="space-y-1">
              {q.options.map((option, i) => {
                const isUserSelected = userAnswer === i;
                const isCorrectAnswer = q.correctAnswerIndex === i;

                let bgColor = 'bg-white';
                let borderColor = 'border-gray-300';
                let icon = '';

                if (isSkipped && isCorrectAnswer) {
                  bgColor = 'bg-yellow-100';
                  borderColor = 'border-yellow-600';
                  icon = '⭐';
                } else if (isCorrectAnswer) {
                  bgColor = 'bg-green-100';
                  borderColor = 'border-green-600';
                  icon = '✅';
                } else if (isUserSelected && !isCorrectAnswer) {
                  bgColor = 'bg-red-100';
                  borderColor = 'border-red-600';
                  icon = '❌';
                }

                return (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded border ${bgColor} ${borderColor} flex justify-between items-center`}
                  >
                    <span>{option}</span>
                    {icon && <span>{icon}</span>}
                  </div>
                );
              })}
            </div>
            {isSkipped && (
              <p className="text-sm text-yellow-700 italic">You skipped this question.</p>
            )}
          </div>
        );
      })}

      <div className="pt-6">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col-reverse w-full justify-between">
      {!showReview ? renderQuestion() : renderReview()}
      <div className="max-w-full p-2 space-y-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-medium">Progress:</span>
          <span>{Math.floor((currentIndex / questions.length) * 100)}%</span>
          <span className="ml-4 font-medium">Time:</span>
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizPageComponent;
