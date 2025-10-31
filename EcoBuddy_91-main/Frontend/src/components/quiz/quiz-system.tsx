import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  category?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: string;
}

interface User {
  id: string;
  name: string;
  ecoPoints: number;
  token: string;
}

interface QuizSystemProps {
  currentUser: User;
}

export const QuizSystem = ({ currentUser }: QuizSystemProps) => {
  const [questions, setQuestions] = useState<{ Easy: Question[]; Medium: Question[]; Hard: Question[] }>({
    Easy: [],
    Medium: [],
    Hard: [],
  });
  const [activeCategory, setActiveCategory] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0); // Keep accumulated points
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/environment_10000.json");
        const data: Question[] = await res.json();
        const grouped: { [K in "Easy" | "Medium" | "Hard"]: Question[] } = {
          Easy: [],
          Medium: [],
          Hard: [],
        };

        data.forEach((q) => {
          const diff = q.difficulty || "Easy";
          if (grouped[diff]) grouped[diff].push(q);
        });

        // Take 10 random questions per difficulty
        const getRandomTen = (arr: Question[]) => arr.sort(() => 0.5 - Math.random()).slice(0, 10);

        setQuestions({
          Easy: getRandomTen(grouped.Easy),
          Medium: getRandomTen(grouped.Medium),
          Hard: getRandomTen(grouped.Hard),
        });
      } catch (err) {
        console.error("Error loading questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const currentQuestions = questions[activeCategory];
  const currentQuestion = currentQuestions[currentIndex];

  const playSound = (correct: boolean) => {
    const sound = correct ? correctSoundRef.current : wrongSoundRef.current;
    if (!sound) return;
    sound.pause();
    sound.currentTime = 0;
    sound.play().catch((err) => console.error("Sound playback failed:", err));
  };

  const handleAnswer = (option: string) => {
    if (!currentQuestion) return;

    const correct = option === currentQuestion.answer;
    setSelectedOption(option);
    playSound(correct);
    setFeedback(correct ? "correct" : "wrong");

    if (correct) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }

    setStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (!correct ? 1 : 0),
    }));

    // Add points immediately if correct
    if (correct) setEcoPoints((prev) => prev + 1);

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      setCurrentIndex((prev) => prev + 1);
    }, 1000);
  };

  const handleSkip = () => setCurrentIndex((prev) => prev + 1);

  const handleExit = () => {
    setStarted(false);
    setCurrentIndex(0);
    setStats({ correct: 0, wrong: 0 });
    setLoading(true);

    // Reload new random questions
    fetch("/environment_10000.json")
      .then((res) => res.json())
      .then((data: Question[]) => {
        const grouped: { [K in "Easy" | "Medium" | "Hard"]: Question[] } = {
          Easy: [],
          Medium: [],
          Hard: [],
        };
        data.forEach((q) => {
          const diff = q.difficulty || "Easy";
          if (grouped[diff]) grouped[diff].push(q);
        });

        const getRandomTen = (arr: Question[]) => arr.sort(() => 0.5 - Math.random()).slice(0, 10);

        setQuestions({
          Easy: getRandomTen(grouped.Easy),
          Medium: getRandomTen(grouped.Medium),
          Hard: getRandomTen(grouped.Hard),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Reload error:", err);
        setLoading(false);
      });
  };

  // Start screen
  if (!started)
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-6">🌱 Welcome to the Eco Quiz</h1>
        <p className="mb-6 text-lg">Earn EcoPoints by solving questions! 🏆</p>
        <Button variant="default" size="lg" onClick={() => setStarted(true)}>
          Start Quiz
        </Button>
      </div>
    );

  // Quiz completed screen
  if (!currentQuestion) {
    return (
      <div className="text-center mt-20 space-y-4">
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-lg">Correct Answers: {stats.correct}</p>
        <p className="text-lg">Wrong Answers: {stats.wrong}</p>
        <p className="text-lg font-semibold">Total EcoPoints: {ecoPoints}</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={handleExit}>Retry Quiz</Button>
        </div>
      </div>
    );
  }

  // Loading screen
  if (loading) return <div className="text-center mt-20 text-lg">Loading questions...</div>;

  // Quiz interface
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{activeCategory} Quiz</h2>
        <span className="text-lg font-semibold">EcoPoints: {ecoPoints}</span>
      </div>

      <div className="flex gap-2 mb-4 justify-center">
        {(["Easy", "Medium", "Hard"] as const).map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIndex(0);
            }}
          >
            {cat} ({questions[cat].length})
          </Button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center font-bold text-xl ${
              feedback === "correct" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-4 shadow-lg hover:shadow-xl transition-all">
        <CardContent>
          <h3 className="font-semibold text-lg mb-3">{currentQuestion.question}</h3>
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQuestion.answer;
              return (
                <Button
                  key={opt}
                  variant="outline"
                  className={`transition relative ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-200 text-green-900"
                        : "bg-red-200 text-red-900"
                      : "hover:bg-green-100"
                  }`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selectedOption}
                >
                  {opt}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={handleSkip}>
          ⏭️ Skip
        </Button>
        <Button variant="destructive" onClick={handleExit}>
          ❌ Exit
        </Button>
      </div>

      <audio ref={correctSoundRef} src="/sounds/correct.mp3" preload="auto" />
      <audio ref={wrongSoundRef} src="/sounds/wrong.mp3" preload="auto" />
    </div>
  );
};
