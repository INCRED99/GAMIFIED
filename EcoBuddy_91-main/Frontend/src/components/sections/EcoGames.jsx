// src/components/EcoGames.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EcoGames.jsx
 * - Vite + React compatible
 * - Uses Tailwind CSS for styling (assumes Tailwind configured)
 * - Uses framer-motion for animations (install: npm i framer-motion)
 *
 * Contains:
 *  - Navigation tabs
 *  - Recycling Sorter (drag & drop)
 *  - Carbon Footprint Calculator
 *  - Ocean Cleanup Challenge (simple click-to-collect)
 *  - Renewable Energy Builder (place items on grid)
 *
 * No external UI libs required.
 */

/* ------------------------- Root Component ------------------------- */
const EcoGames = () => {
  const [tab, setTab] = useState("recycling"); // recycling | carbon | ocean | renewable
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <motion.h1
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-extrabold text-emerald-700 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">♻️</span>
            EcoGames Arena
          </motion.h1>
          <p className="mt-2 text-neutral-600">Play small interactive games to learn about the environment.</p>
        </header>

        <nav className="flex justify-center gap-3 flex-wrap mb-6">
          <NavButton active={tab === "recycling"} onClick={() => setTab("recycling")} label="Recycling" emoji="🗑️" />
          <NavButton active={tab === "carbon"} onClick={() => setTab("carbon")} label="Carbon Calculator" emoji="🧮" />
          
          <NavButton active={tab === "renewable"} onClick={() => setTab("renewable")} label="Renewable Builder" emoji="☀️" />
        </nav>

        <main>
          <AnimatePresence mode="wait" initial={false}>
            {tab === "recycling" && (
              <motion.div key="recycling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RecyclingSorter />
              </motion.div>
            )}
            {tab === "carbon" && (
              <motion.div key="carbon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CarbonFootprintCalculator />
              </motion.div>
            )}
           
            {tab === "renewable" && (
              <motion.div key="renewable" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RenewableEnergyBuilder />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-10 text-center text-sm text-neutral-500">Made with 💚 — small actions add up.</footer>
      </div>
    </div>
  );
};

export default EcoGames;

/* ------------------------- Small shared UI ------------------------- */
const NavButton = ({ active, onClick, label, emoji }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm font-medium transition ${
      active ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-emerald-700 ring-1 ring-emerald-100"
    }`}
  >
    <span className="text-lg">{emoji}</span>
    <span>{label}</span>
  </button>
);

const MiniBadge = ({ children }) => <span className="px-3 py-1 rounded-full bg-white/60 text-sm">{children}</span>;

/* ===================== Recycling Sorter ===================== */
const WASTE_ITEMS = [
  { id: "p1", label: "Plastic Bottle", type: "plastic", emoji: "🧴" },
  { id: "p2", label: "Newspaper", type: "paper", emoji: "📰" },
  { id: "p3", label: "Banana Peel", type: "organic", emoji: "🍌" },
  { id: "p4", label: "Tin Can", type: "metal", emoji: "🥫" },
  { id: "p5", label: "Glass Jar", type: "glass", emoji: "🍾" },
  { id: "p6", label: "Cardboard Box", type: "paper", emoji: "📦" }
];

const WASTE_BINS = [
  { id: "plastic", label: "Plastic", bg: "from-blue-500 to-cyan-500", emoji: "♻️" },
  { id: "paper", label: "Paper", bg: "from-emerald-500 to-teal-500", emoji: "📄" },
  { id: "glass", label: "Glass", bg: "from-amber-400 to-amber-500", emoji: "🍶" },
  { id: "organic", label: "Organic", bg: "from-lime-400 to-lime-500", emoji: "🌿" },
  { id: "metal", label: "Metal", bg: "from-neutral-400 to-neutral-600", emoji: "🔩" }
];

function RecyclingSorter() {
  const [items, setItems] = useState(() => shuffleArray(WASTE_ITEMS));
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(items.length);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setItems(shuffleArray(WASTE_ITEMS));
    setRemaining(WASTE_ITEMS.length);
    setScore(0);
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.classList.add("opacity-70");
  };
  const handleDragEnd = (e) => e.currentTarget.classList.remove("opacity-70");
  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e, binId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const item = items.find((it) => it.id === itemId);
    if (!item) return;
    if (item.type === binId) {
      setScore((s) => s + 10);
      setMessage(`✅ Correct — ${item.label} → ${binId}`);
      setItems((prev) => prev.filter((it) => it.id !== itemId));
      setRemaining((r) => r - 1);
    } else {
      setScore((s) => Math.max(0, s - 5));
      setMessage(`❌ ${item.label} doesn't belong in ${binId}`);
    }
  };

  const resetRound = () => {
    const next = shuffleArray(WASTE_ITEMS);
    setItems(next);
    setRemaining(next.length);
    setScore(0);
    setMessage("");
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-700">♻️ Recycling Sorter</h2>
          <p className="text-sm text-neutral-500">Drag items into correct bins. +10 correct, −5 wrong.</p>
        </div>
        <div className="flex gap-2">
          <MiniBadge>Score: {score}</MiniBadge>
          <MiniBadge>Left: {remaining}</MiniBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-emerald-50 min-h-[160px]">
            {items.length ? (
              items.map((it) => (
                <motion.div
                  key={it.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, it.id)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ y: -6 }}
                  className="w-40 bg-white rounded-xl p-3 shadow cursor-grab"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{it.emoji}</div>
                    <div>
                      <div className="font-medium">{it.label}</div>
                      <div className="text-xs text-neutral-400">{capitalize(it.type)}</div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <h3 className="text-xl font-semibold text-emerald-600">🎉 All items sorted!</h3>
                <button
                  onClick={resetRound}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white text-emerald-700"
                >
                  Next Round
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          {WASTE_BINS.map((bin) => (
            <div
              key={bin.id}
              onDrop={(e) => handleDrop(e, bin.id)}
              onDragOver={allowDrop}
              className={`rounded-xl p-4 flex justify-between items-center text-white shadow-md bg-gradient-to-r ${bin.bg}`}
              style={{ minHeight: 88 }}
            >
              <div>
                <div className="font-semibold">{bin.label}</div>
                <div className="text-xs opacity-80">Drop here</div>
              </div>
              <div className="text-2xl">{bin.emoji}</div>
            </div>
          ))}
        </aside>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-neutral-500">{message || "Tip: Drag items onto bins"}</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setItems(shuffleArray(WASTE_ITEMS));
              setRemaining(WASTE_ITEMS.length);
              setMessage("Shuffled!");
            }}
            className="px-3 py-2 rounded-lg border bg-white"
          >
            Shuffle
          </button>
          <button onClick={resetRound} className="px-3 py-2 rounded-lg bg-emerald-600 text-white">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===================== Carbon Footprint Calculator ===================== */
function CarbonFootprintCalculator() {
  const [transportation, setTransportation] = useState({
    carMiles: 0,
    carType: "gasoline",
    publicTransit: 0,
    flights: 0 // flight hours per year
  });
  const [energy, setEnergy] = useState({
    electricity: 0, // monthly kWh
    naturalGas: 0, // monthly therms
    renewable: false
  });
  const [lifestyle, setLifestyle] = useState({
    meatConsumption: "moderate",
    localFood: 0, // percent
    recycling: 0 // percent
  });
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

  const calculateFootprint = () => {
    // Transportation emissions (kg CO2 per year)
    const carEmissionFactors = {
      gasoline: 0.411, // kg CO2 per mile
      diesel: 0.385,
      hybrid: 0.205,
      electric: 0.089
    };
    const carEmissions = transportation.carMiles * (carEmissionFactors[transportation.carType] || 0.411) * 52; // weekly -> yearly
    const transitEmissions = transportation.publicTransit * 0.14 * 52; // kg CO2 per mile
    const flightEmissions = transportation.flights * 90; // kg CO2 per flight hour

    // Energy emissions (kg CO2 per year)
    const electricityEmissions = energy.electricity * 0.92 * 12; // monthly kWh to kg/year
    const gasEmissions = energy.naturalGas * 5.3 * 12;
    const renewableDiscount = energy.renewable ? 0.7 : 1; // 30% reduction if using renewable sources

    // Lifestyle emissions
    const dietEmissions = {
      heavy: 3300,
      moderate: 2500,
      light: 1700,
      vegetarian: 1500,
      vegan: 1200
    };
    const foodEmissions = dietEmissions[lifestyle.meatConsumption] || dietEmissions.moderate;
    const localFoodDiscount = 1 - (lifestyle.localFood / 100) * 0.15;
    const recyclingDiscount = 1 - (lifestyle.recycling / 100) * 0.1;

    const transportTotal = carEmissions + transitEmissions + flightEmissions;
    const energyTotal = (electricityEmissions + gasEmissions) * renewableDiscount;
    const lifestyleTotal = foodEmissions * localFoodDiscount * recyclingDiscount;

    const totalEmissions = transportTotal + energyTotal + lifestyleTotal;
    const totalTonnes = totalEmissions / 1000;

    setResult(totalTonnes);

    // message
    if (totalTonnes < 4) {
      setMsg("🌟 Excellent! Your carbon footprint is well below average!");
    } else if (totalTonnes < 10) {
      setMsg("👍 Good job! Your footprint is close to the global average.");
    } else if (totalTonnes < 16) {
      setMsg("⚠️ Your footprint is above average. Consider reducing emissions.");
    } else {
      setMsg("🚨 High carbon footprint detected! Significant lifestyle changes recommended.");
    }
    // scroll to result (UX)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-700">🧮 Carbon Footprint Calculator</h2>
          <p className="text-sm text-neutral-500">Estimate your annual CO₂ emissions and get tips.</p>
        </div>
        <div className="flex gap-2 items-center">
          <MiniBadge>Global avg: ~4 t</MiniBadge>
          <MiniBadge>US avg: ~16 t</MiniBadge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Transport */}
        <div>
          <h3 className="text-lg font-semibold mb-2">🚗 Transportation</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Weekly Car Miles</label>
              <input
                type="number"
                value={transportation.carMiles}
                onChange={(e) => setTransportation({ ...transportation, carMiles: Number(e.target.value) })}
                className="mt-1 w-full p-2 border rounded"
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <label className="text-sm">Car Type</label>
              <select
                value={transportation.carType}
                onChange={(e) => setTransportation({ ...transportation, carType: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              >
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Weekly Public Transit Miles</label>
              <input
                type="number"
                value={transportation.publicTransit}
                onChange={(e) => setTransportation({ ...transportation, publicTransit: Number(e.target.value) })}
                className="mt-1 w-full p-2 border rounded"
                placeholder="e.g., 50"
              />
            </div>
            <div>
              <label className="text-sm">Flight Hours per Year</label>
              <input
                type="number"
                value={transportation.flights}
                onChange={(e) => setTransportation({ ...transportation, flights: Number(e.target.value) })}
                className="mt-1 w-full p-2 border rounded"
                placeholder="e.g., 10"
              />
            </div>
          </div>
        </div>

        {/* Energy */}
        <div>
          <h3 className="text-lg font-semibold mb-2">⚡ Home Energy</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Monthly Electricity (kWh)</label>
              <input
                type="number"
                value={energy.electricity}
                onChange={(e) => setEnergy({ ...energy, electricity: Number(e.target.value) })}
                className="mt-1 w-full p-2 border rounded"
                placeholder="e.g., 900"
              />
            </div>
            <div>
              <label className="text-sm">Monthly Natural Gas (therms)</label>
              <input
                type="number"
                value={energy.naturalGas}
                onChange={(e) => setEnergy({ ...energy, naturalGas: Number(e.target.value) })}
                className="mt-1 w-full p-2 border rounded"
                placeholder="e.g., 40"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="renewable"
                type="checkbox"
                checked={energy.renewable}
                onChange={(e) => setEnergy({ ...energy, renewable: e.target.checked })}
              />
              <label htmlFor="renewable" className="text-sm">Using Renewable Energy</label>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div>
          <h3 className="text-lg font-semibold mb-2">🍽️ Lifestyle</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Meat Consumption</label>
              <select
                value={lifestyle.meatConsumption}
                onChange={(e) => setLifestyle({ ...lifestyle, meatConsumption: e.target.value })}
                className="mt-1 w-full p-2 border rounded"
              >
                <option value="heavy">Heavy (daily)</option>
                <option value="moderate">Moderate (several times/week)</option>
                <option value="light">Light (occasionally)</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Local Food Consumption: {lifestyle.localFood}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={lifestyle.localFood}
                onChange={(e) => setLifestyle({ ...lifestyle, localFood: Number(e.target.value) })}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label className="text-sm">Recycling Rate: {lifestyle.recycling}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={lifestyle.recycling}
                onChange={(e) => setLifestyle({ ...lifestyle, recycling: Number(e.target.value) })}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={calculateFootprint} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
            Calculate My Footprint
          </button>
          <button
            onClick={() => {
              setTransportation({ carMiles: 0, carType: "gasoline", publicTransit: 0, flights: 0 });
              setEnergy({ electricity: 0, naturalGas: 0, renewable: false });
              setLifestyle({ meatConsumption: "moderate", localFood: 0, recycling: 0 });
              setResult(null);
              setMsg("");
            }}
            className="px-4 py-2 border rounded-lg"
          >
            Reset
          </button>
        </div>

        {result !== null && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg border">
            <div className="text-center">
              <h3 className="text-2xl font-bold">{result.toFixed(2)} tonnes CO₂ / year</h3>
              <p className="text-sm text-neutral-600 mt-1">{msg}</p>
              <div className="mt-3 text-left">
                <h4 className="font-semibold">Tips to reduce your footprint:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Switch to renewable energy sources</li>
                  <li>Use public transportation or carpool</li>
                  <li>Reduce meat consumption, especially beef</li>
                  <li>Buy local and seasonal produce</li>
                  <li>Improve home insulation and energy efficiency</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== Ocean Cleanup (click-to-collect) ===================== */

/* ===================== Renewable Energy Builder ===================== */
function RenewableEnergyBuilder() {
  const GRID_ROWS = 2;
  const GRID_COLS = 4;
  const TARGET = 200; // arbitrary energy target

  const ITEMS = [
    { id: "s", label: "Solar", emoji: "🔆", energy: 50, cost: 2000 },
    { id: "w", label: "Wind", emoji: "🌀", energy: 80, cost: 3000 },
    { id: "h", label: "Hydro", emoji: "💧", energy: 150, cost: 5000 }
  ];

  const [grid, setGrid] = useState(() => Array(GRID_ROWS * GRID_COLS).fill(null));
  const [money, setMoney] = useState(10000);
  const [energy, setEnergy] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEnergy(grid.reduce((acc, cell) => acc + (cell ? cell.energy : 0), 0));
  }, [grid]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.classList.add("opacity-70");
  };
  const handleDragEnd = (e) => e.currentTarget.classList.remove("opacity-70");

  const allowDrop = (e) => e.preventDefault();

  const handleDropOnCell = (e, idx) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const item = ITEMS.find((it) => it.id === id);
    if (!item) return;
    // If slot occupied, replace and refund
    setGrid((prev) => {
      const next = [...prev];
      next[idx] = item;
      return next;
    });
    setMoney((m) => Math.max(0, m - item.cost));
    setMessage("");
  };

  const removeFromCell = (idx) => {
    setGrid((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  };

  const checkTarget = () => {
    if (energy >= TARGET) setMessage(`🎉 Success! Energy = ${energy} (target ${TARGET})`);
    else setMessage(`⚠️ You need ${TARGET - energy} more energy.`);
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-700">☀️ Renewable Energy Builder</h2>
          <p className="text-sm text-neutral-500">Drag units onto the grid to build energy capacity.</p>
        </div>
        <div className="flex gap-2">
          <MiniBadge>Energy: {energy}</MiniBadge>
          <MiniBadge>Money: ${money}</MiniBadge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <div className="space-y-3">
            {ITEMS.map((it) => (
              <div
                key={it.id}
                draggable
                onDragStart={(e) => handleDragStart(e, it.id)}
                onDragEnd={handleDragEnd}
                className="flex justify-between items-center p-3 bg-white rounded-lg shadow cursor-grab"
              >
                <div>
                  <div className="font-medium">{it.label}</div>
                  <div className="text-xs text-neutral-400">{it.energy} energy • ${it.cost}</div>
                </div>
                <div className="text-2xl">{it.emoji}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => { setGrid(Array(GRID_ROWS * GRID_COLS).fill(null)); setMessage(""); }} className="px-3 py-2 border rounded">
              Reset Grid
            </button>
            <button onClick={checkTarget} className="px-3 py-2 bg-emerald-600 text-white rounded">
              Check Target
            </button>
          </div>

          {message && <div className="mt-3 p-3 rounded bg-emerald-50 border">{message}</div>}
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {grid.map((cell, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${cell ? "bg-emerald-50" : "bg-neutral-50"}`} style={{ minHeight: 120 }}
                   onDrop={(e) => handleDropOnCell(e, idx)} onDragOver={allowDrop}>
                <div className="flex justify-between items-start">
                  <div className="text-xs text-neutral-400">Slot {idx + 1}</div>
                  {cell && <button onClick={() => removeFromCell(idx)} className="text-xs rounded-full p-1 bg-white shadow-sm">🗑</button>}
                </div>
                <div className="h-16 flex items-center justify-center">
                  {cell ? (
                    <div className="text-center">
                      <div className="text-3xl">{cell.emoji}</div>
                      <div className="text-sm">{cell.label}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-neutral-400">Drop unit here</div>
                  )}
                </div>
                <div className="mt-2 text-xs text-neutral-500">+{cell ? cell.energy : 0} energy</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Utilities ------------------------- */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ------------------------- Small CSS for float animation ------------------------- */
/* Put this into your global CSS (e.g., index.css) OR keep it here as a style tag inside app root */
const styleTag = document.createElement("style");
styleTag.innerHTML = `
@keyframes floaty {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}
.animate-float { animation: floaty 3.5s ease-in-out infinite; }
`;
document.head.appendChild(styleTag);
