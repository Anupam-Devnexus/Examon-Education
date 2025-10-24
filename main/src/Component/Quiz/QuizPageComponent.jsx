import React, { useState, useEffect } from 'react';
import Data from '../../DataStore/quizzes.json';

const ResultCard = ({ percentage, qualified }) => {
  const isPassed = qualified;
  return (
    <div className={`relative flex flex-col items-center rounded-lg p-6 shadow-md ${isPassed ? 'bg-[#ECFEE9] text-[#35B324]' : 'bg-[#FFE6E6] text-[#FF1111]'}`}>
      <div className="absolute left-0 top-0">
        <img
          src={isPassed ? '/greenEllipse.svg' : '/redEllipse.svg'}
          alt="decorative"
          className="hidden md:block md:h-68"
        />
      </div>
      <img src={isPassed ? '/happy.svg' : "/sad.svg"} alt="result icon" className="w-24 h-24 mb-6" />
      <h3 className="text-xl font-bold">Your Score: {percentage}%</h3>
      <p className="text-lg font-semibold">
        {isPassed ? 'Well done! You’ve passed the quiz' : 'Better Luck Next Time!'}
      </p>
      <p className="text-center max-w-md mt-2 text-sm">
        {isPassed
          ? 'Continue your learning journey by exploring our advanced courses for further improvement.'
          : 'Strengthen your preparation with our expert-led courses to enhance your performance and achieve success.'}
      </p>
    </div>
  );
};

const QuizPageComponent = ({ quizId = 'upsc_gs_2025_01' }) => {
  const quiz = Data.quizzes.find((q) => q.id === quizId);
  const { questions, title, totalMarks, duration } = quiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

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

  const calculateScore = () =>
    questions.reduce((score, q) => {
      const userAnswer = answers[q.id];
      return userAnswer === q.correctAnswerIndex ? score + q.marks : score;
    }, 0);

  const score = calculateScore();
  const percentage = ((score / totalMarks) * 100).toFixed(2);
  const qualified = percentage >= 40;
  const currentQuestion = questions[currentIndex];

  const renderProgressBar = () => {
   const progress = showReview
  ? 100
  : Math.floor((currentIndex / questions.length) * 100);

    return (
      <div className="w-full flex items-center justify-between gap-4 mt-4">
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-[var(--primary-color)] h-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {progress}% • {formatTime(timeLeft)}
        </div>
      </div>
    );
  };

  const renderQuestion = () => (
    <div className="space-y-4">
      <h3 className="text-lg text-[var(--primary-color)] font-semibold">Question {currentIndex + 1}</h3>
      <p className="text-lg font-bold text-[var(--primary-color)]">{currentQuestion.question}</p>
      <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = answers[currentQuestion.id] === index;
          return (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, index)}
              className={`w-full text-left px-4 py-2 rounded border ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-gray-200 cursor-pointer text-white rounded hover:bg-yellow-600"
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
      <ResultCard percentage={percentage} qualified={qualified} />
      {questions.map((q, index) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correctAnswerIndex;
        const isSkipped = userAnswer === undefined;

        return (
          <div key={q.id} className="border rounded p-4 space-y-2 bg-white shadow-sm">
            <p className="font-medium text-gray-800">
              {index + 1}. {q.question}
            </p>
            <div className="space-y-1 grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <p className="text-sm text-gray-400 italic">You skipped this question.</p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col w-full justify-between">
      <div className="max-w-full p-2 space-y-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {renderProgressBar()}
      </div>
      {!showReview ? renderQuestion() : renderReview()}
    </div>
  );
};

export default QuizPageComponent;
