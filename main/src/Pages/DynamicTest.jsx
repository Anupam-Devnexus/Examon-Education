import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizPageComponent from '../Component/Quiz/QuizPageComponent';
import CoursesYouLike from '../Component/CoursesYouLike';

const DynamicTest = () => {
  const { id } = useParams();
  const [quizId, setQuizId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate dynamic loading (replace with API call later)
  useEffect(() => {
    if (id) {
      setQuizId(id);
      setLoading(false);
    } else {
      setError('Quiz ID not found in route.');
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-full mx-auto">
        {loading ? (
          <div className="text-center text-gray-500 text-lg animate-pulse">
            Loading quiz...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">
            {error}
          </div>
        ) : (
          <QuizPageComponent quizId={quizId} />
        )}
      </div>
      <CoursesYouLike title={true}/>
    </div>
  );
};

export default DynamicTest;
