import React from "react";
import Stats from "./Stats";

const LeftComp = () => (
    <div className="flex flex-col py-4 w-[40vw] items-start gap-4 px-8 md:px-16">
        <img src="/double.svg" alt="quote" className="w-8 h-8 mb-2" />
        <p className="text-gray-800 text-md leading-relaxed max-w-full">
            We help serious aspirants turn disciplined preparation into consistent
            results.
        </p>
    </div>
);

const RightComp = ({ data }) => (
    <div className="flex flex-col  items-start justify-center gap-6 px-8 md:px-16">
        <p className="text-black text-sm md:text-base leading-relaxed max-w-6xl">
            We offer bilingual learning in Hindi and English, accessible on app and
            web platforms, with transparent, affordable plans. Start your journey with{" "}
            
                Examon Education
           
            today!
        </p>

        {/* Dynamic Stats Section */}
        <Stats data={data} />
    </div>
);

const AboutNumber = () => {
    const data = [
        { num: "5", unit: "M+", title: "Students" },
        { num: "50", unit: "+", title: "Courses" },
        { num: "20", unit: "%", title: "Instructors" },
        { num: "10", unit: "K+", title: "Alumni" },
    ];

    return (
        <section className="bg-[var(--tertiary-color)] min-h-[60vh] flex ">
            <LeftComp />
            <RightComp data={data} />
        </section>
    );
};

export default AboutNumber;
