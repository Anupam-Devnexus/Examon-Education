import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useExamStore } from "../Zustand/GetAllExams";
import ContactSection from "../Component/ContactSection";
import DOMPurify from "dompurify";
import FAQ from "../Component/Faq/FAQ";

const DynamicExam = () => {
  const { _id: id } = useParams();
  const { exams, loading, error, fetchAllExams } = useExamStore();

  useEffect(() => {
    if (!exams || exams.length === 0) fetchAllExams();
  }, [exams?.length, fetchAllExams]);

  const exam = useMemo(
    () => exams?.find((e) => String(e._id) === String(id)),
    [exams, id]
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg animate-pulse">
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

  /** 🧩 Clean & style tables + enhance typography */
  const styledHTML = useMemo(() => {
    if (!exam.Content) return "";
    const clean = DOMPurify.sanitize(exam.Content);

    return clean
      .replaceAll(
        /<table([^>]*)>/g,
        '<table$1 class="min-w-full text-sm text-left border border-gray-300 rounded-xl overflow-hidden shadow-md my-6">'
      )
      .replaceAll(
        /<thead>/g,
        '<thead class="bg-gray-100 text-gray-800 font-semibold">'
      )
      .replaceAll(
        /<tbody>/g,
        '<tbody class="divide-y divide-gray-200">'
      )
      .replaceAll(
        /<tr>/g,
        '<tr class="hover:bg-gray-50 transition-colors">'
      )
      .replaceAll(
        /<td([^>]*)>/g,
        '<td$1 class="px-4 py-3 border-b border-gray-200 text-gray-700">'
      )
      .replaceAll(
        /<th([^>]*)>/g,
        '<th$1 class="px-4 py-3 border-b border-gray-300 text-gray-900 font-medium bg-gray-50">'
      )
      // Optional: beautify lists and headings
      .replaceAll(
        /<ul>/g,
        '<ul class="list-disc pl-6 space-y-2 text-gray-700">'
      )
      .replaceAll(
        /<ol>/g,
        '<ol class="list-decimal pl-6 space-y-2 text-gray-700">'
      )
      .replaceAll(
        /<p>/g,
        '<p class="text-gray-700 leading-relaxed mb-4">'
      )
      .replaceAll(
        /<h2([^>]*)>/g,
        '<h2$1 class="text-2xl font-semibold text-gray-900 mt-8 mb-4 border-l-4 border-[var(--primary-color)] pl-3">'
      )
      .replaceAll(
        /<a([^>]*)>/g,
        '<a$1 class="text-[var(--primary-color)] font-medium hover:underline">'
      );
  }, [exam.Content]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-12">
      {/* ===== HEADER ===== */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-10 text-center transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <img
            src={exam.logo || "/ssc.svg"}
            alt={`${exam.name} Logo`}
            className="h-12 md:h-16 w-auto object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)]">
            {exam.name || "Exam"} — Dates, Fees, Eligibility & Pattern
          </h1>
          {exam.year && (
            <p className="text-gray-600 text-sm md:text-base">
              Exam Year: <span className="font-medium">{exam.year}</span>
            </p>
          )}
        </div>
      </section>

      {/* ===== DYNAMIC CONTENT ===== */}
      <section>
        <div
          className="prose prose-lg max-w-none bg-white p-8 rounded-2xl border border-gray-200 shadow-sm leading-relaxed text-gray-800 transition-all duration-300 hover:shadow-md"
          dangerouslySetInnerHTML={{ __html: styledHTML }}
        />
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="mt-16">
        <FAQ />
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="pt-10 border-t border-gray-200 mt-10">
        <ContactSection />
      </section>
    </div>
  );
};

export default DynamicExam;
  