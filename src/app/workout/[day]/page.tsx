"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { workouts, Exercise } from "@/data/workouts";
import { CheckCircle2, Pause, Play, SkipForward, ArrowLeft, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

const MOTIVATIONAL_QUOTES = [
  "Strong is the new soft.",
  "Lean, long, lit. Keep going.",
  "Future Anusha is watching. Make her proud.",
  "One more rep. One more breath. One more day.",
  "You don't need a gym — you ARE the gym.",
  "Pilates girls don't quit at rep 12.",
  "Consistency over intensity. Every single day.",
];

export default function WorkoutPlayer({ params }: { params: Promise<{ day: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const dayIndex = parseInt(resolvedParams.day, 10);
  const workout = workouts.find((w) => w.day === dayIndex) || workouts[0];

  const fullSequence = [...workout.warmup, ...workout.main, ...workout.cooldown];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Load settings
    const muted = localStorage.getItem("lgd_muted") === "true";
    setIsMuted(muted);
    const noVib = localStorage.getItem("lgd_vibration") === "false";
    setVibrationEnabled(!noVib);
  }, []);

  const playBeep = (freq = 440, type: OscillatorType = "sine", duration = 0.2) => {
    if (isMuted) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const triggerVibrate = (pattern: number | number[]) => {
    if (vibrationEnabled && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Initialize Timer for current stage
  useEffect(() => {
    if (isComplete) return;

    if (isResting) {
      const restSec = fullSequence[currentIndex - 1]?.restSec || 15;
      setTimeLeft(restSec);
      setQuoteIndex(Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));
    } else {
      const ex = fullSequence[currentIndex];
      if (ex && ex.durationSec) {
        setTimeLeft(ex.durationSec);
      } else {
        // Rep-based exercise, no strict timer, but maybe we just track time elapsed or set a dummy
        setTimeLeft(0);
      }
    }
  }, [currentIndex, isResting, isComplete, fullSequence]);

  // Timer Tick
  useEffect(() => {
    if (isPaused || isComplete || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        // 3-2-1 Beeps
        if (prev <= 4 && prev > 1) {
          playBeep(600, "sine", 0.1);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isComplete, timeLeft]);

  const handleTimeUp = () => {
    if (isResting) {
      // Rest over -> Next Exercise
      playBeep(800, "square", 0.3); // Ding
      triggerVibrate(200);
      setIsResting(false);
    } else {
      // Exercise over -> Rest or Complete
      handleNext();
    }
  };

  const handleNext = () => {
    const currentEx = fullSequence[currentIndex];
    
    if (currentIndex >= fullSequence.length - 1) {
      // Workout Complete!
      playBeep(880, "sine", 0.1);
      setTimeout(() => playBeep(1100, "sine", 0.2), 150);
      setTimeout(() => playBeep(1320, "sine", 0.4), 300);
      triggerVibrate([200, 100, 200, 100, 400]);
      setIsComplete(true);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F8F1EA", "#E8C7B8", "#9CAF9A", "#D87C5A"]
      });

      // Update local storage
      const streak = parseInt(localStorage.getItem("lgd_streak") || "0", 10);
      localStorage.setItem("lgd_streak", (streak + 1).toString());
      const sessions = parseInt(localStorage.getItem("lgd_sessions_completed") || "0", 10);
      localStorage.setItem("lgd_sessions_completed", (sessions + 1).toString());
    } else {
      if (!isResting && currentEx.restSec > 0) {
        setIsResting(true);
      } else {
        setIsResting(false);
        setCurrentIndex((i) => i + 1);
      }
    }
  };

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    localStorage.setItem("lgd_muted", newMute.toString());
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (fullSequence.length === 0) {
    return (
      <div className="p-6 text-center pt-20">
        <p>No exercises found for this day.</p>
        <button onClick={() => router.back()} className="mt-4 text-coral">Go back</button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="flex flex-col h-[100dvh] items-center justify-center p-6 text-center">
        <h1 className="font-serif text-5xl mb-4 text-charcoal">Amazing work.</h1>
        <p className="text-xl text-charcoal/80 mb-8">You showed up for yourself today.</p>
        
        <div className="bg-white/40 rounded-3xl p-8 backdrop-blur-md shadow-soft w-full mb-8">
          <p className="text-sm uppercase tracking-widest text-charcoal/60 mb-2">Streak updated</p>
          <p className="text-4xl font-semibold text-coral">+1</p>
        </div>

        <button 
          onClick={() => router.push("/")}
          className="w-full bg-charcoal text-cream py-4 rounded-[1.25rem] font-medium text-lg shadow-soft"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  if (isResting) {
    return (
      <div className="flex flex-col h-[100dvh] bg-sage/20 p-6 transition-colors duration-500">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-sm uppercase tracking-widest text-charcoal/60 mb-8 font-medium">Rest & Breathe</p>
          <div className="text-8xl font-serif text-charcoal mb-12 tracking-tight">
            {formatTime(timeLeft)}
          </div>
          <p className="text-2xl font-serif text-charcoal/80 leading-snug max-w-[280px] italic">
            "{MOTIVATIONAL_QUOTES[quoteIndex]}"
          </p>
        </div>
        <div className="flex justify-between items-center bg-white/40 p-4 rounded-[1.25rem] backdrop-blur-md">
          <div>
            <p className="text-xs text-charcoal/60 uppercase font-bold tracking-wider mb-1">Up Next</p>
            <p className="font-medium text-charcoal truncate pr-4">{fullSequence[currentIndex].name}</p>
          </div>
          <button onClick={handleNext} className="bg-white p-3 rounded-full shadow-sm">
            <SkipForward size={20} className="text-charcoal" />
          </button>
        </div>
      </div>
    );
  }

  const currentEx = fullSequence[currentIndex];

  return (
    <div className="flex flex-col h-[100dvh] bg-cream">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-charcoal/70">
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex gap-4 items-center">
          <button onClick={toggleMute} className="text-charcoal/70 p-2">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold font-serif w-14 text-right tabular-nums">
              {currentEx.durationSec ? formatTime(timeLeft) : "--:--"}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-32">
        {fullSequence.map((ex, idx) => {
          const isActive = idx === currentIndex;
          const isCompleted = idx < currentIndex;

          if (isCompleted) {
            return (
              <div key={`${ex.id}-${idx}`} className="flex items-center gap-4 py-3 opacity-50">
                <CheckCircle2 size={24} className="text-sage fill-sage/20" />
                <span className="line-through decoration-charcoal/30">{ex.name}</span>
              </div>
            );
          }

          if (isActive) {
            return (
              <div key={`${ex.id}-${idx}`} className="relative bg-white rounded-[2rem] overflow-hidden shadow-soft my-6 border-2 border-white transition-all">
                {/* Visual Area (Animation Fallback to CSS gradient if no video) */}
                <div className="h-64 bg-cream/50 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10"></div>
                  
                  {ex.animationSrc.endsWith('.mp4') || ex.animationSrc.endsWith('.webm') ? (
                    <video src={ex.animationSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" />
                  ) : ex.animationSrc.endsWith('.svg') || ex.animationSrc.endsWith('.png') || ex.animationSrc.endsWith('.jpg') ? (
                    <img src={ex.animationSrc} alt={ex.name} className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" />
                  ) : (
                    <div className="text-charcoal/30 font-serif text-3xl z-0">
                      {ex.name[0]}
                    </div>
                  )}
                  
                  {/* Timer Ring / Progress visual could go here */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end text-white">
                    <div>
                      <h2 className="text-2xl font-serif leading-tight drop-shadow-md">{ex.name}</h2>
                      <p className="opacity-90 mt-1 drop-shadow-sm">{ex.cue}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      {ex.weightLb ? (
                        <span className="px-3 py-1 bg-charcoal text-cream text-sm font-bold rounded-full">
                          {ex.weightLb} lb
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-charcoal/10 text-charcoal text-sm font-bold rounded-full">
                          Bodyweight
                        </span>
                      )}
                      {ex.reps && (
                        <span className="px-3 py-1 bg-blush/30 text-charcoal text-sm font-bold rounded-full">
                          {ex.reps}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    {ex.durationSec && (
                      <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-charcoal shadow-sm"
                      >
                        {isPaused ? <Play size={24} className="ml-1" /> : <Pause size={24} />}
                      </button>
                    )}
                    
                    <button 
                      onClick={handleNext}
                      className="flex-1 bg-charcoal text-cream py-4 rounded-full font-medium shadow-soft flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                      NEXT <SkipForward size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Upcoming
          return (
            <div key={`${ex.id}-${idx}`} className="flex items-center gap-4 py-4 opacity-60">
              <div className="w-6 h-6 rounded-full border-2 border-charcoal/30 flex items-center justify-center text-xs font-bold text-charcoal/50">
                {idx + 1}
              </div>
              <div>
                <p className="font-medium">{ex.name}</p>
                <p className="text-xs text-charcoal/60">{ex.reps || formatTime(ex.durationSec || 0)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
