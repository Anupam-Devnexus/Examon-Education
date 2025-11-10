import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "📚 What is the duration of the courses offered?",
    answer:
      "The duration of our courses varies depending on the subject and level. Typically, courses range from 4 to 12 weeks.",
  },
  {
    id: 2,
    question: "🧩 Are there any prerequisites for enrolling?",
    answer:
      "Most of our courses are designed for beginners and do not require prior knowledge. Advanced courses may specify prerequisites in their details.",
  },
  {
    id: 3,
    question: "💻 How can I access the course materials?",
    answer:
      "Once enrolled, all course materials will be available in your student dashboard. Log in anytime with your registered email.",
  },
  {
    id: 4,
    question: "🔐 What about Privacy Policy, Terms, and Refunds?",
    answer: (
      <div className="space-y-1">
        <p>
          You can review our legal documents here:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <a href="/privacy-policy" className="text-[var(--primary-color)] hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-[var(--primary-color)] hover:underline">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="/refund-policy" className="text-[var(--primary-color)] hover:underline">
              Refund Policy
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 5,
    question: "📷 Where can I see real student results and feedback?",
    answer:
      "We regularly post student success stories, testimonials, and stats on our blog and social media channels. Check out our Instagram, LinkedIn, and Blog sections for real data.",
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleFAQ = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-full mx-auto p-6 rounded-xl  backdrop-blur">
      <div className="text-center mb-6">
        <motion.h2
          className="text-3xl font-extrabold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Frequently Asked Questions (FAQs)
        </motion.h2>

        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get clear answers to the most common questions about our courses, policies, and student community.
        </motion.p>
        
        <motion.p
          className="bg-[#BFBFBF] h-0.5 w-1/2 mx-auto mt-3 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >

        </motion.p>
      </div>

      <div className="divide-y divide-gray-200">
        {faqData.map((item) => (
          <motion.div
            key={item.id}
            className="py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: item.id * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(item.id)}
              className="flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:text-[var(--primary-color)] transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="text-[var(--primary-color)] font-bold">Q{item.id}.</span>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: activeId === item.id ? 0 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--primary-color)]"
              >
                {activeId === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </motion.span>
            </button>

            <AnimatePresence>
              {activeId === item.id && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-2 text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200 overflow-hidden"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default FAQ;
