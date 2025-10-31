import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

// ✅ Define types for props
interface EcoStats {
  points?: number;
  challengesCompleted?: number;
  badges?: number;
}

interface User {
  name?: string;
}

interface HomeSectionProps {
  user?: User;
  ecoStats?: EcoStats;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ user, ecoStats = {} }) => {
  const navigate = useNavigate();
  const [news, setNews] = useState<any[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [points, setPoints] = useState<number>(ecoStats.points || 0);

  const ecoTips = [
    "💡 Planting one tree absorbs up to 48 lbs of CO₂ per year!",
    "💡 Turn off unused lights to save energy.",
    "💡 Recycle plastic, paper & glass to reduce waste.",
    "💡 Use public transport or cycle to cut emissions.",
    "💡 Save water – every drop counts!",
  ];

  // Tip rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % ecoTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Fetch news
  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  //       if (!apiKey) return;

  //       const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=environment&country=cn,in,ru,us&category=environment`;
  //       const response = await axios.get(apiUrl);

  //       if (response.data && response.data.results) {
  //         setNews(response.data.results);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     }
  //   };
  //   fetchNews();
  // }, []);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  // ✅ Stats safely typed and defaulted
  const statsData = [
    { label: "Eco Points", value: ecoStats.points ?? 0, icon: "💚" },
    { label: "Challenges Done", value: ecoStats.challengesCompleted ?? 0, icon: "🎯" },
    { label: "Badges Earned", value: ecoStats.badges ?? 0, icon: "🏅" },
  ];

  // Smooth points animation
  useEffect(() => {
    let interval: any;
    if (ecoStats.points && ecoStats.points !== points) {
      interval = setInterval(() => {
        setPoints((prev) => {
          if (prev < ecoStats.points!) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [ecoStats.points]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden px-4 md:px-12 bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 40 },
            move: { enable: true, speed: 1.2, direction: "top-right" },
            shape: {
              type: "image",
              image: [{ src: "https://img.icons8.com/emoji/48/leaf-fluttering-in-wind.png", width: 32, height: 32 }],
            },
            opacity: { value: 0.6 },
            size: { value: 24 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Floating Mascot Tips */}
      <motion.div
        className="absolute bottom-10 left-6 text-5xl z-20 cursor-pointer"
        animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🌳
        <motion.div
          key={currentTipIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="absolute left-14 bottom-2 bg-white/90 rounded-xl shadow-xl px-4 py-2 text-sm text-gray-700 w-60"
        >
          {ecoTips[currentTipIndex]}
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center mt-12 md:mt-20 space-y-8">
        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-400 to-green-600 drop-shadow-lg"
        >
          👋 Welcome Back, {user?.name || "Eco Hero"}!
        </motion.h1>

        {/* Typing Subtitle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg md:text-2xl text-gray-700 font-semibold">
          <TypeAnimation
            sequence={[
              "🌱 Learn. Play. Save the Planet.",
              2000,
              "🚀 Track your eco progress & earn badges.",
              2000,
              "🌍 Stay updated with latest eco news.",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            wrapper="span"
          />
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 w-full">
          {[
            { title: "Quizzes", icon: "🧠", desc: "Test your eco knowledge", link: "/quiz" },
            { title: "Challenges", icon: "🎯", desc: "Complete fun eco tasks", link: "/challenges" },
            { title: "Leaderboard", icon: "🏆", desc: "Compete with friends", link: "/leaderboard" },
          ].map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0px 20px 50px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(f.link)}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200 cursor-pointer transition relative overflow-hidden"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-2xl font-bold text-green-800">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Eco Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
          {statsData.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * idx, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl flex flex-col items-center"
            >
              <div className="text-5xl mb-2">{s.icon}</div>
              <motion.div className="text-3xl font-bold text-green-700" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                {s.value}
              </motion.div>
              <div className="text-gray-600 mt-1 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* News Ticker */}
      {news.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="bg-white/70 backdrop-blur-lg border border-green-200 rounded-lg shadow-xl py-4 px-6 overflow-hidden mt-12 w-full"
        >
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {news.map((article, i) => (
              <a
                key={i}
                href={article.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-6 text-green-800 font-medium hover:text-green-600 hover:underline transition"
              >
                🌍 {article.title}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      <style>
        {`
          @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
          .animate-marquee { display: inline-flex; animation: marquee 50s linear infinite; }
        `}
      </style>
    </section>
  );
};
