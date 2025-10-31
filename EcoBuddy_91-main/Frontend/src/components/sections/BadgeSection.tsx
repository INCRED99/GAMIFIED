import React from "react";

const badges = [
  { id: 1, name: "Beginner", icon: "🌱", desc: "Getting started strong!" },
  { id: 2, name: "Problem Solver", icon: "🧩", desc: "Cracking challenges daily" },
  { id: 3, name: "Algorithm Ace", icon: "⚡", desc: "Fast & efficient thinker" },
];

 export const BadgesSection: React.FC = () => {
  return (
    <section className="w-full py-12 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-inner">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🏆 Your Badges
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 w-48"
          >
            <span className="text-5xl">{badge.icon}</span>
            <p className="mt-3 text-lg font-semibold text-gray-700">
              {badge.name}
            </p>
            <p className="mt-1 text-sm text-gray-500 text-center">
              {badge.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};


