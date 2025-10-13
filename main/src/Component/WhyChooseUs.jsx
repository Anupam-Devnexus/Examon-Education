import React from "react";

const WhyChooseUs = () => {
    const data = [
        { id: "/01.svg", title: "Exam-Specific Content", description: "Study materials, lectures, & tests that are customized for a particular exam" },
        { id: "/02.svg", title: "Rapid Doubt Support", description: "Dedicated feature designed to help students resolve their queries instantly." },
        { id: "/03.svg", title: "Mock Analytics", description: "Accuracy, time, weak-area heatmaps." },
        { id: "/04.svg", title: "Transparent Results", description: "Clear deliverables, fair pricing, verified selections." },
        { id: "/05.svg", title: "4-Step System", description: "Learn → Practice → Analyze → Improve." },
        { id: "/06.svg", title: "Bilingual & Accessible", description: "Hindi + English · App & Web · recordings" },
        { id: "/07.svg", title: "Structured Study Plans", description: "Weekly roadmaps, streaks, accountability." },
        { id: "/08.svg", title: "Audio Notes", description: "On-the-go micro-revision with spaced cues" },
    ];

    const Card = ({ id, title, desc }) => (
        <div className="flex flex-col items-start gap-1  ">
            <div className="flex items-center gap-2 mb-1">
                <img src={id} alt="" />
                <span className="font-semibold text-3xl md:text-base text-[var(--primary-color)]">{title}</span>
            </div>
            <p className="text-[var(--text-color)] text-xs md:text-sm">{desc}</p>
        </div>
    );

    const SpecialCard = () => (
        <div className="flex items-center justify-center bg-gradient-to-r from-[#003E68] to-[#98BCD3] text-white font-bold text-lg md:text-3xl rounded-lg p-6 md:p-10 shadow-lg text-center">
            Why Choose Us
        </div>
    );

    return (
        <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-10 bg-gray-50">
            {/* Top Row: Cards 1-3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.slice(0, 3).map((item) => (
                    <Card key={item.id} id={item.id} title={item.title} desc={item.description} />
                ))}
            </div>

            {/* Middle Row: Card 4, SpecialCard, Card 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-[#EEF6FC] rounded-lg">
                <Card id={data[3].id} title={data[3].title} desc={data[3].description} />
                <SpecialCard />
                <Card id={data[4].id} title={data[4].title} desc={data[4].description} />
            </div>

            {/* Bottom Row: Cards 6-8 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.slice(5, 8).map((item) => (
                    <Card key={item.id} id={item.id} title={item.title} desc={item.description} />
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
