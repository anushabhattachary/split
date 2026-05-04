"use client";

import Link from "next/link";
import { workouts } from "@/data/workouts";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkoutsLibrary() {
  const router = useRouter();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Sort workouts to start from Monday (1) to Sunday (0)
  const sortedWorkouts = [...workouts].sort((a, b) => {
    const dayA = a.day === 0 ? 7 : a.day;
    const dayB = b.day === 0 ? 7 : b.day;
    return dayA - dayB;
  });

  return (
    <div className="flex flex-col h-[100dvh] bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-charcoal/70">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-serif text-xl text-charcoal font-bold">Library</h1>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 pb-20">
        {sortedWorkouts.map((w) => (
          <div key={w.day} className="bg-white rounded-[1.25rem] p-5 shadow-soft flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-sm font-bold tracking-widest uppercase text-sage mb-1">
                {days[w.day]}
              </p>
              <h2 className="font-serif text-lg leading-tight text-charcoal mb-1">
                {w.name}
              </h2>
              <p className="text-sm text-charcoal/60">
                {w.type === "rest" ? "Recovery" : "Workout"} · ~{w.estMinutes} min
              </p>
            </div>
            <Link 
              href={`/workout/${w.day}`}
              className="w-12 h-12 flex-shrink-0 bg-cream rounded-full flex items-center justify-center text-charcoal hover:bg-blush/30 transition-colors"
            >
              <PlayCircle size={24} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
