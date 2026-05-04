"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { workouts, USER } from "@/data/workouts";
import { Settings, List, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    // Read day (allow override from localStorage)
    const override = localStorage.getItem("lgd_day_override");
    const today = override ? parseInt(override, 10) : new Date().getDay();
    setCurrentDay(today);

    // Read stats
    const savedStreak = localStorage.getItem("lgd_streak");
    if (savedStreak) setStreak(parseInt(savedStreak, 10));

    const savedSessions = localStorage.getItem("lgd_sessions_completed");
    if (savedSessions) setSessionsCompleted(parseInt(savedSessions, 10));

    // Determine greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  if (currentDay === null) return null; // Hydrating

  const todaysWorkout = workouts.find((w) => w.day === currentDay) || workouts[0];
  const isRest = todaysWorkout.type === "rest";

  return (
    <div className="flex flex-col h-[100dvh] p-6 justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between mt-4">
        <div className="inline-flex items-center px-3 py-1 bg-white/40 rounded-full shadow-sm backdrop-blur-md text-sm font-medium">
          🔥 {streak}-day streak
        </div>
        <Link href="/settings" className="p-2 rounded-full bg-white/40 shadow-sm backdrop-blur-md">
          <Settings size={20} className="text-charcoal" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-lg font-medium text-charcoal/70 mb-2">
          {greeting}, {USER.name}
        </h2>
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-4 text-charcoal">
          Ready to start your {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDay]} {isRest ? "flow" : "workout"}?
        </h1>
        <p className="text-charcoal/80 text-lg mb-8">
          {todaysWorkout.name} · ~{todaysWorkout.estMinutes} min {todaysWorkout.warmup.length > 0 ? "including warmup" : ""}
        </p>

        <Link 
          href={`/workout/${currentDay}`}
          className="group relative w-full bg-charcoal text-cream text-center py-4 rounded-[1.25rem] font-medium text-lg shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all flex items-center justify-center overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            START {isRest ? "FLOW" : "WORKOUT"}
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-coral opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </Link>

        <Link
          href="/workouts"
          className="mt-6 flex items-center justify-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors font-medium"
        >
          <List size={18} />
          Browse all workouts
        </Link>
      </div>

      {/* Footer Stats */}
      <div className="bg-white/40 rounded-[1.25rem] p-4 backdrop-blur-md shadow-soft flex justify-between items-center text-sm mb-4">
        <div>
          <p className="text-charcoal/60 mb-0.5">Est. Warmup Steps</p>
          <p className="font-semibold text-lg">{isRest ? 0 : "1,500"}</p>
        </div>
        <div className="text-right">
          <p className="text-charcoal/60 mb-0.5">Sessions Completed</p>
          <p className="font-semibold text-lg">{sessionsCompleted}</p>
        </div>
      </div>
    </div>
  );
}
