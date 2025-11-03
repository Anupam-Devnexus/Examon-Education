import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useExamStore } from "../Zustand/GetAllExams";
import ContactSection from "../Component/ContactSection";

const DynamicExam = () => {
  const { id } = useParams();
  const { exams, loading, error, fetchAllExams } = useExamStore();

  // 🔹 Fetch all exams only once if not already loaded
  useEffect(() => {
    if (exams.length === 0) {
      fetchAllExams();
    }
  }, [fetchAllExams, exams.length]);

  // 🔹 Memoize exam lookup for performance
  const exam = useMemo(() => exams.find((e) => String(e.id) === String(id)), [exams, id]);

  // 🔹 Handle loading, error, and not found states gracefully
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading exam details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Error loading exam data: {error}
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Exam not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 py-6 bg-gray-50">
      {/* 🔹 Header */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <img src={exam.logo || "/ssc.svg"} alt="Exam Logo" className="h-12 md:h-16 w-auto" />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] text-center">
            {exam.name} — Dates, Fees, Eligibility & Pattern
          </h1>
          {exam.year && <p className="text-gray-600 text-sm">Exam Year: {exam.year}</p>}
        </div>
      </div>

      <div className="space-y-10">
        {/* 🔹 Important Dates */}
        {exam.important_dates?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-b border-gray-300">Description</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.important_dates.map((item, idx) => (
                    <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100">
                      <td className="px-4 py-3 border-b border-gray-200">{item.description}</td>
                      <td className="px-4 py-3 border-b border-gray-200">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 🔹 Application Fee */}
        {exam.application_fee?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Fee</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-b border-gray-300">Category</th>
                    <th className="px-4 py-3 font-semibold border-b border-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.application_fee.map((fee, idx) => (
                    <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100">
                      <td className="px-4 py-3 border-b border-gray-200">{fee.category}</td>
                      <td className="px-4 py-3 border-b border-gray-200">{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 🔹 Eligibility */}
        {exam.eligibility && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 text-gray-700">
              {exam.eligibility.qualification && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Qualification:</span>
                  <span>{exam.eligibility.qualification}</span>
                </div>
              )}
              {exam.eligibility.age_limit && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Age Limit:</span>
                  <span>{exam.eligibility.age_limit}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 🔹 Exam Pattern */}
        {exam.exam_pattern && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Pattern</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4 text-gray-700">
              {exam.exam_pattern.stages?.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Stages:</span>
                  <span>{exam.exam_pattern.stages.join(", ")}</span>
                </div>
              )}

              {exam.exam_pattern.sections?.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Sections:</span>
                  <span>{exam.exam_pattern.sections.join(", ")}</span>
                </div>
              )}

              {exam.exam_pattern.papers?.length > 0 && (
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Papers:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {exam.exam_pattern.papers.map((p, idx) => (
                      <li key={idx}>
                        <span className="font-medium text-gray-800">{p.name}</span> —{" "}
                        <span className="text-gray-600">{p.course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exam.exam_pattern.structure && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Structure:</span>
                  <span>{exam.exam_pattern.structure}</span>
                </div>
              )}

              {exam.exam_pattern.mode && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="font-medium text-gray-800">Mode:</span>
                  <span>{exam.exam_pattern.mode}</span>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* 🔹 Contact Section */}
      <div className="w-full py-8">
        <ContactSection />
      </div>
    </div>
  );
};

export default DynamicExam;
