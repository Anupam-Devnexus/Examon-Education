import React from "react";
import { useParams } from "react-router-dom";
import Data from "../DataStore/exams.json";

const DynamicExam = () => {
  const { id } = useParams();
  const exam = Data.exams.find((e) => e.id === id);

  if (!exam) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Exam not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mb-24 mx-auto p-6 mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Title */}
      <h1 className="text-sm md:text-2xl flex-col gap-4 md:gap-6 md:flex items-center justify-around font-bold text-[var(--primary-color)] mb-2">
       <img src="/ssc.svg" alt="" className="h-6 md:h-12 w-auto"/> {exam.name} — dates, fees, eligibility, pattern
       <p className="text-gray-600 text-sm">Exam Year: {exam.year}</p>
      </h1>
     

      <hr className="my-4 border-gray-300" />

  {/* Important Dates */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
     Important Dates
  </h2>

{/* Important Dates Section */}
<section className="mb-10">
  

  <div className="relative overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
    {/* Optional scroll hint for mobile */}
    <div className="absolute top-2 right-4 text-xs text-gray-400 hidden sm:block">
      Swipe → to view
    </div>

    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-gray-800">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 font-semibold border-b border-gray-300 whitespace-nowrap"
          >
            Description
          </th>
          <th
            scope="col"
            className="px-4 py-3 font-semibold border-b border-gray-300 whitespace-nowrap"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {exam.important_dates.map((item, idx) => (
          <tr
            key={idx}
            className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
              {item.description}
            </td>
            <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
              {item.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

</section>


{/* Application Fee Section */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Application Fee
  </h2>

  <div className="relative overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
    <table className="min-w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-gray-800">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 font-semibold border-b border-gray-300 whitespace-nowrap"
          >
            Category
          </th>
          <th
            scope="col"
            className="px-4 py-3 font-semibold border-b border-gray-300 whitespace-nowrap"
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {exam.application_fee.map((fee, idx) => (
          <tr
            key={idx}
            className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
              {fee.category}
            </td>
            <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
              {fee.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


   {/*  Eligibility */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 text-gray-700">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium text-gray-800">Qualification:</span>
      <span>{exam.eligibility.qualification}</span>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium text-gray-800">Age Limit:</span>
      <span>{exam.eligibility.age_limit}</span>
    </div>
  </div>
</section>

{/*  Exam Pattern */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-gray-900 mb-4"> Exam Pattern</h2>
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4 text-gray-700">
    {exam.exam_pattern.stages && (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium text-gray-800">Stages:</span>
        <span>{exam.exam_pattern.stages.join(", ")}</span>
      </div>
    )}

    {exam.exam_pattern.sections && (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium text-gray-800">Sections:</span>
        <span>{exam.exam_pattern.sections.join(", ")}</span>
      </div>
    )}

    {exam.exam_pattern.papers && (
      <div>
        <p className="font-semibold text-gray-800 mb-2">Papers:</p>
        <ul className="list-disc pl-6 space-y-1">
          {exam.exam_pattern.papers.map((p, idx) => (
            <li key={idx}>
              <span className="text-gray-800 font-medium">{p.name}</span> —{" "}
              <span className="text-gray-600">{p.course}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {exam.exam_pattern.structure && (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium text-gray-800">Structure:</span>
        <span>{exam.exam_pattern.structure}</span>
      </div>
    )}

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium text-gray-800">Mode:</span>
      <span>{exam.exam_pattern.mode}</span>
    </div>
  </div>
</section>


    </div>
  );
};

export default DynamicExam;
