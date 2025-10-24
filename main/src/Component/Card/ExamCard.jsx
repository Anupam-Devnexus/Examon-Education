import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamCard = ({ examData }) => {
    const { id, title, exam, duration, totalMarks, tags } = examData;
    const navigate = useNavigate();

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hrs}h ${mins}m`;
    };

    const handleNavigation = () => {
        navigate(`/quiz/${id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-xl flex flex-col justify-between p-6 max-w-md w-full mx-auto hover:shadow-lg transition-shadow duration-300">
            {/* Content */}
            <div>
                <h2 className="text-lg font-bold text-[var(--primary-color)] mb-3">{title}</h2>
                <div className="text-sm grid grid-cols-2 text-gray-600 space-y-1 mb-4">
                    <p><span className="font-medium">Exam:</span> {exam}</p>
                    <p><span className="font-medium">Duration:</span> {formatDuration(duration)}</p>
                    <p><span className="font-medium">Total Marks:</span> {totalMarks}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-100 text-[var(--primary-color)] text-xs font-semibold px-2 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Button */}
            <div className="mt-auto pt-4">
                <button
                    onClick={handleNavigation}
                    className="w-full bg-[var(--primary-color)] cursor-pointer text-white font-medium py-2 rounded-lg transition-colors duration-200"
                >
                    Start Now
                </button>
            </div>
        </div>
    );
};

export default ExamCard;
