import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useExamStore } from "../Zustand/GetAllExams";
import ContactSection from "../Component/ContactSection";
import DOMPurify from "dompurify";

/**
 * DynamicExam Page
 * ----------------------------
 * - Fetches a single exam from Zustand store
 * - Displays complete exam details (Dates, Fees, Eligibility, Overview)
 * - Safely renders HTML content from text editor response
 * - Fully responsive and production-ready
 */
const DynamicExam = () => {
  const { id } = useParams();
  const { exams, loading, error, fetchAllExams } = useExamStore();

  /** Fetch data only if not already loaded */
  useEffect(() => {
    if (!exams || exams.length === 0) fetchAllExams();
  }, [exams?.length, fetchAllExams]);
  // console.log("All Exams:", exams);

  /** Find specific exam by ID */
  const exam = useMemo(
    () => exams?.find((e) => String(e.id || e.id) === String(id)),
    [exams, id]
  );
  // console.log("Selected Exam:", exam);
  const Content = exam?.Content;
  // console.log("Exam Content:", Content);

  /** Loading & error states */
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading exam details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Error loading exam data: {error}
      </div>
    );

  if (!exam)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Exam not found.
      </div>
    );

  return (
    <div


      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-12">

      {/* =============== HEADER SECTION =============== */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src={exam.logo || "/ssc.svg"}
            alt={`${exam.name} Logo`}
            className="h-12 md:h-16 w-auto"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)]">
            {exam.name || "Exam"} — Dates, Fees, Eligibility & Pattern
          </h1>
          {exam.year && (
            <p className="text-gray-600 text-sm md:text-base">
              Exam Year: {exam.year}
            </p>
          )}
        </div>
      </section>

      {/* =============== OVERVIEW SECTION =============== */}
      {exam.Content && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Overview</h2>
          <div
            className="prose prose-lg max-w-none bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(exam.Content),
            }}
          />
        </section>
      )}

      {/* =============== IMPORTANT DATES =============== */}
      {Array.isArray(exam.important_dates) && exam.important_dates.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Dates</h2>
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-300 shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-800">
                <tr
                  dangerouslySetInnerHTML={{
                    __html: Content
                  }}
                >
                  <th className="px-4 py-3 font-semibold border-b">Description</th>
                  <th className="px-4 py-3 font-semibold border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {exam.important_dates.map((item, idx) => (
                  <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-3 border-b">{item.description}</td>
                    <td className="px-4 py-3 border-b">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =============== APPLICATION FEE =============== */}
      {Array.isArray(exam.application_fee) && exam.application_fee.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Fee</h2>
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-300 shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b">Category</th>
                  <th className="px-4 py-3 font-semibold border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {exam.application_fee.map((fee, idx) => (
                  <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-3 border-b">{fee.category}</td>
                    <td className="px-4 py-3 border-b">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =============== ELIGIBILITY =============== */}
      {exam.eligibility && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 text-gray-700">
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

      {/* =============== CONTACT SECTION =============== */}
      <section className="pt-10 border-t border-gray-200">
        <ContactSection />
      </section>
    </div>
  );
};

export default DynamicExam;
