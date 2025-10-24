import React, { useState } from 'react';
import Data from '../DataStore/quizzes.json';
import ExamCard from '../Component/Card/ExamCard';

const Quiz = () => {
  const { quizzes } = Data;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('All');

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesExam = selectedExam === 'All' || quiz.exam === selectedExam;

    return matchesSearch && matchesExam;
  });

  return (
    <div className="px-4 py-4 mb-14 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start gap-3">
        <h1 className="font-bold text-4xl text-gray-800">Quizzes</h1>
        <p className="text-gray-600">Choose a test to begin your preparation journey.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Filter Panel */}
        <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-1/4 space-y-4">
          <div>
            <label className="text-[var(--primary-color)] font-semibold block mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by title or tag"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full  outline-none border-b border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-[var(--primary-color)] font-semibold block mb-2">Exam Type</label>
            {['All', 'UPSC', 'SSC CGL', 'RRB NTPC'].map((exam) => (
              <label key={exam} className="block text-sm text-gray-700">
                <input
                  type="radio"
                  name="exam"
                  value={exam}
                  checked={selectedExam === exam}
                  onChange={() => setSelectedExam(exam)}
                  className="mr-2"
                />
                {exam}
              </label>
            ))}
          </div>
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 p-4 rounded-xl sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[var(--tertiary-color)] w-full">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => <ExamCard key={quiz.id} examData={quiz} />)
          ) : (
            <p className="text-gray-500 col-span-full">No quizzes match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
