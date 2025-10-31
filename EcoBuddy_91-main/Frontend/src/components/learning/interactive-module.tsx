import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Plus, Minus, RefreshCw, Thermometer, Volume2, CheckCircle, XCircle, Sun, Users } from 'lucide-react';

const FeedbackLoopLearning = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [thermostatTemp, setThermostatTemp] = useState(20);
  const [currentTemp, setCurrentTemp] = useState(18);
  const [isHeatingActive, setIsHeatingActive] = useState(false);
  const [bunnyPopulation, setBunnyPopulation] = useState(100);
  const [simulationStep, setSimulationStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [icePercent, setIcePercent] = useState(80);
  const [globalTemp, setGlobalTemp] = useState(15);
  const [isClimateRunning, setIsClimateRunning] = useState(false);
  const [micVolume, setMicVolume] = useState(30);
  const [speakerVolume, setSpeakerVolume] = useState(50);
  const [isFeedbackOccurring, setIsFeedbackOccurring] = useState(false);
  const [rabbits, setRabbits] = useState(100);
  const [foxes, setFoxes] = useState(20);
  const [preyPredatorStep, setPreyPredatorStep] = useState(0);
  const [isPredatorPreyRunning, setIsPredatorPreyRunning] = useState(false);

  const sections = [
    { id: 0, title: "What is a Feedback Loop?" },
    { id: 1, title: "Negative Feedback" },
    { id: 2, title: "Positive Feedback" },
    { id: 3, title: "More Simulations" },
    { id: 4, title: "Test Your Knowledge" }
  ];

  const adjustThermostat = (change) => {
    setThermostatTemp(prev => Math.max(15, Math.min(30, prev + change)));
  };

  const updateHeating = () => {
    if (currentTemp < thermostatTemp) {
      setIsHeatingActive(true);
      setCurrentTemp(prev => Math.min(thermostatTemp, prev + 0.5));
    } else {
      setIsHeatingActive(false);
      setCurrentTemp(prev => Math.max(15, prev - 0.3));
    }
  };

  const runBunnySimulation = () => {
    setSimulationStep(prev => prev + 1);
    setBunnyPopulation(prev => {
      const growth = prev * 0.3;
      return Math.min(1000, Math.round(prev + growth));
    });
  };

  const resetBunnySimulation = () => {
    setBunnyPopulation(100);
    setSimulationStep(0);
  };

  useEffect(() => {
    if (isClimateRunning) {
      const interval = setInterval(() => {
        setGlobalTemp(prev => {
          const newTemp = prev + (100 - icePercent) * 0.005;
          return Math.min(25, newTemp);
        });
        setIcePercent(prev => {
          const meltRate = globalTemp > 15 ? (globalTemp - 15) * 2 : 0;
          return Math.max(0, prev - meltRate);
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isClimateRunning, globalTemp, icePercent]);

  const resetClimateSimulation = () => {
    setIcePercent(80);
    setGlobalTemp(15);
    setIsClimateRunning(false);
  };

  useEffect(() => {
    const combinedVolume = micVolume + speakerVolume;
    if (combinedVolume > 100) {
      setIsFeedbackOccurring(true);
      if (combinedVolume < 200) {
        setMicVolume(prev => Math.min(100, prev + 2));
        setSpeakerVolume(prev => Math.min(100, prev + 2));
      }
    } else {
      setIsFeedbackOccurring(false);
    }
  }, [micVolume, speakerVolume]);

  const resetSoundSimulation = () => {
    setMicVolume(30);
    setSpeakerVolume(50);
    setIsFeedbackOccurring(false);
  };

  useEffect(() => {
    if (isPredatorPreyRunning) {
      const interval = setInterval(() => {
        setPreyPredatorStep(prev => prev + 1);
        setRabbits(prev => {
          const growth = prev * 0.15;
          const predation = foxes * 0.5;
          const newPop = Math.max(10, prev + growth - predation);
          return Math.round(Math.min(300, newPop));
        });
        setFoxes(prev => {
          const foodAvailable = rabbits * 0.05;
          const starvation = prev * 0.1;
          const newPop = Math.max(5, prev + foodAvailable - starvation);
          return Math.round(Math.min(100, newPop));
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isPredatorPreyRunning, rabbits, foxes]);

  const resetPredatorPrey = () => {
    setRabbits(100);
    setFoxes(20);
    setPreyPredatorStep(0);
    setIsPredatorPreyRunning(false);
  };

  useEffect(() => {
    const interval = setInterval(updateHeating, 1000);
    return () => clearInterval(interval);
  }, [currentTemp, thermostatTemp]);

  const quizQuestions = [
    { id: 1, question: "A thermostat is an example of:", options: ["Negative Feedback Loop", "Positive Feedback Loop"], correct: 0 },
    { id: 2, question: "Which loop amplifies changes?", options: ["Negative Feedback Loop", "Positive Feedback Loop"], correct: 1 },
    { id: 3, question: "Ice-albedo effect is:", options: ["Negative Feedback Loop", "Positive Feedback Loop"], correct: 1 },
    { id: 4, question: "Predator-prey is:", options: ["Negative Feedback Loop", "Positive Feedback Loop"], correct: 0 }
  ];

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({...prev, [questionId]: answerIndex}));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {sections.map((section, idx) => (
          <div key={section.id} className={`flex-1 h-2 rounded-full ${idx <= currentSection ? 'bg-emerald-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        {currentSection === 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-700">What is a Feedback Loop?</h2>
            <p className="text-gray-700 text-lg">A feedback loop is a system where output influences input, creating a cycle.</p>
            <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-white px-6 py-4 rounded-lg shadow"><p>Input</p></div>
                <ArrowRight className="w-6 h-6 text-emerald-600" />
                <div className="bg-white px-6 py-4 rounded-lg shadow"><p>Process</p></div>
                <ArrowRight className="w-6 h-6 text-emerald-600" />
                <div className="bg-white px-6 py-4 rounded-lg shadow"><p>Output</p></div>
                <RefreshCw className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Negative Feedback</h4>
                <p className="text-sm">Maintains stability</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Positive Feedback</h4>
                <p className="text-sm">Amplifies changes</p>
              </div>
            </div>
          </div>
        )}

        {currentSection === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Negative Feedback Loop</h2>
            <p className="text-gray-700 text-lg">Maintains equilibrium by counteracting changes.</p>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
              <h3 className="font-semibold text-lg mb-4 text-blue-800 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />Thermostat Demo
              </h3>
              <div className="bg-white rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div><p className="text-sm text-gray-600">Target</p><p className="text-3xl font-bold text-blue-600">{thermostatTemp}°C</p></div>
                  <div><p className="text-sm text-gray-600">Current</p><p className="text-3xl font-bold text-gray-800">{currentTemp.toFixed(1)}°C</p></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <button onClick={() => adjustThermostat(-1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <Minus className="w-4 h-4" /> Lower
                  </button>
                  <button onClick={() => adjustThermostat(1)} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600">
                    <Plus className="w-4 h-4" /> Raise
                  </button>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${isHeatingActive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                    <p className="text-sm font-medium">{isHeatingActive ? '🔥 Heating ON' : '❄️ Heating OFF'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-900"><strong>How it works:</strong> System maintains stable temperature.</p>
              </div>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-700">Positive Feedback Loop</h2>
            <p className="text-gray-700 text-lg">Amplifies changes exponentially.</p>
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-300">
              <h3 className="font-semibold text-lg mb-4 text-orange-800">🐰 Population Growth</h3>
              <div className="bg-white rounded-lg p-6 mb-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Population</p>
                  <p className="text-5xl font-bold text-orange-600">{bunnyPopulation}</p>
                  <p className="text-sm text-gray-500 mt-1">Generation {simulationStep}</p>
                </div>
                <div className="bg-orange-100 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-10 gap-1">
                    {Array.from({length: Math.min(100, bunnyPopulation)}).map((_, i) => (
                      <div key={i} className="text-xl">🐰</div>
                    ))}
                  </div>
                  {bunnyPopulation > 100 && <p className="text-center text-sm text-orange-700 mt-2">...and {bunnyPopulation - 100} more!</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={runBunnySimulation} disabled={bunnyPopulation >= 1000} className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-400">
                    Next Generation (+30%)
                  </button>
                  <button onClick={resetBunnySimulation} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Reset</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-700">More Simulations</h2>
            <div className="bg-cyan-50 rounded-xl p-6 border-2 border-cyan-300">
              <h3 className="font-semibold text-lg mb-4 text-cyan-800 flex items-center gap-2"><Sun className="w-5 h-5" />Ice-Albedo Feedback</h3>
              <div className="bg-white rounded-lg p-6 mb-4">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div><p className="text-sm text-gray-600">❄️ Ice</p><p className="text-2xl font-bold text-cyan-600">{icePercent.toFixed(1)}%</p></div>
                  <div><p className="text-sm text-gray-600">🌍 Land</p><p className="text-2xl font-bold text-amber-600">{(100 - icePercent).toFixed(1)}%</p></div>
                  <div><p className="text-sm text-gray-600">🌡️ Temp</p><p className="text-2xl font-bold text-red-600">{globalTemp.toFixed(1)}°C</p></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  <div className={`p-3 rounded-lg border-2 transition-all ${isClimateRunning && Math.floor(Date.now() / 3000) % 4 === 0 ? 'bg-yellow-100 border-yellow-500 scale-105' : 'bg-white border-gray-300'}`}>
                    <div className="text-2xl text-center mb-1">☀️</div>
                    <p className="text-xs text-center font-bold">Sun Heats</p>
                  </div>
                  <div className={`p-3 rounded-lg border-2 transition-all ${isClimateRunning && Math.floor(Date.now() / 3000) % 4 === 1 ? 'bg-red-100 border-red-500 scale-105' : 'bg-white border-gray-300'}`}>
                    <div className="text-2xl text-center mb-1">🌡️</div>
                    <p className="text-xs text-center font-bold">Temp Rises</p>
                  </div>
                  <div className={`p-3 rounded-lg border-2 transition-all ${isClimateRunning && Math.floor(Date.now() / 3000) % 4 === 2 ? 'bg-blue-100 border-blue-500 scale-105' : 'bg-white border-gray-300'}`}>
                    <div className="text-2xl text-center mb-1">💧</div>
                    <p className="text-xs text-center font-bold">Ice Melts</p>
                  </div>
                  <div className={`p-3 rounded-lg border-2 transition-all ${isClimateRunning && Math.floor(Date.now() / 3000) % 4 === 3 ? 'bg-amber-100 border-amber-500 scale-105' : 'bg-white border-gray-300'}`}>
                    <div className="text-2xl text-center mb-1">🌍</div>
                    <p className="text-xs text-center font-bold">Land Exposed</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsClimateRunning(!isClimateRunning)} disabled={icePercent <= 0} className={`flex-1 ${isClimateRunning ? 'bg-red-500' : 'bg-cyan-500'} text-white px-4 py-3 rounded-lg font-semibold disabled:bg-gray-400`}>
                    {isClimateRunning ? '⏸️ Pause' : '▶️ Start'}
                  </button>
                  <button onClick={resetClimateSimulation} className="bg-gray-500 text-white px-4 py-3 rounded-lg">🔄</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-700">Test Your Knowledge</h2>
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <p className="font-medium text-gray-800 mb-4">{idx + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correct;
                    const showResult = quizAnswers[q.id] !== undefined;
                    return (
                      <button key={optIdx} onClick={() => handleQuizAnswer(q.id, optIdx)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showResult ? (isCorrect ? 'bg-green-100 border-green-500' : isSelected ? 'bg-red-100 border-red-500' : 'bg-white border-gray-200') : isSelected ? 'bg-emerald-100 border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-300'}`}>
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {Object.keys(quizAnswers).length === quizQuestions.length && (
              <div className="bg-emerald-100 rounded-xl p-6 border-2 border-emerald-400">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">🎉 Quiz Complete!</h3>
                <p className="text-emerald-700">Score: {quizQuestions.filter((q) => quizAnswers[q.id] === q.correct).length}/{quizQuestions.length}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
          <button onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" />Previous
          </button>
          <div className="text-sm text-gray-600 flex items-center">Section {currentSection + 1} of {sections.length}</div>
          <button onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))} disabled={currentSection === sections.length - 1} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50">
            Next<ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export function InteractiveModule() {
  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      <div className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
        🌍 Learn • Play • Save Earth
      </div>

      <FeedbackLoopLearning />
    </div>
  );
}