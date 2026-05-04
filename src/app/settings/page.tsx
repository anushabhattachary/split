"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, VolumeX, Vibrate, VibrateOff, RefreshCw, Calendar, Download } from "lucide-react";

export default function Settings() {
  const router = useRouter();
  
  const [isMuted, setIsMuted] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [dayOverride, setDayOverride] = useState<string>("");

  useEffect(() => {
    setIsMuted(localStorage.getItem("lgd_muted") === "true");
    setVibrationEnabled(localStorage.getItem("lgd_vibration") !== "false");
    setDayOverride(localStorage.getItem("lgd_day_override") || "");
  }, []);

  const toggleMute = () => {
    const val = !isMuted;
    setIsMuted(val);
    localStorage.setItem("lgd_muted", val.toString());
  };

  const toggleVibration = () => {
    const val = !vibrationEnabled;
    setVibrationEnabled(val);
    localStorage.setItem("lgd_vibration", val.toString());
  };

  const handleDayOverride = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDayOverride(val);
    if (val === "") {
      localStorage.removeItem("lgd_day_override");
    } else {
      localStorage.setItem("lgd_day_override", val);
    }
  };

  const resetStreak = () => {
    if (confirm("Are you sure you want to reset your streak and session history?")) {
      localStorage.removeItem("lgd_streak");
      localStorage.removeItem("lgd_sessions_completed");
      alert("Streak reset successfully.");
    }
  };

  const exportData = () => {
    const data = {
      streak: localStorage.getItem("lgd_streak"),
      sessions_completed: localStorage.getItem("lgd_sessions_completed"),
      muted: localStorage.getItem("lgd_muted"),
      vibration: localStorage.getItem("lgd_vibration"),
      day_override: localStorage.getItem("lgd_day_override"),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lean-girl-daily-backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-charcoal/70">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-serif text-xl text-charcoal font-bold">Settings</h1>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex-1 px-6 py-6 space-y-8 overflow-y-auto pb-20">
        
        {/* Preferences */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal/50 mb-4">Preferences</h2>
          <div className="bg-white rounded-[1.25rem] overflow-hidden shadow-soft">
            <div className="flex items-center justify-between p-4 border-b border-cream">
              <div className="flex items-center gap-3 text-charcoal">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                <span className="font-medium">Audio Cues</span>
              </div>
              <button 
                onClick={toggleMute}
                className={`w-12 h-6 rounded-full transition-colors relative ${!isMuted ? "bg-sage" : "bg-charcoal/20"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${!isMuted ? "translate-x-6.5" : "translate-x-0.5"}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 text-charcoal">
                {vibrationEnabled ? <Vibrate size={20} /> : <VibrateOff size={20} />}
                <span className="font-medium">Haptic Vibration</span>
              </div>
              <button 
                onClick={toggleVibration}
                className={`w-12 h-6 rounded-full transition-colors relative ${vibrationEnabled ? "bg-sage" : "bg-charcoal/20"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${vibrationEnabled ? "translate-x-6.5" : "translate-x-0.5"}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Workout Settings */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal/50 mb-4">Workout Configuration</h2>
          <div className="bg-white rounded-[1.25rem] overflow-hidden shadow-soft">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 text-charcoal">
                <Calendar size={20} />
                <span className="font-medium">Override Today</span>
              </div>
              <select 
                value={dayOverride} 
                onChange={handleDayOverride}
                className="bg-cream text-charcoal text-sm rounded-lg py-1 px-2 outline-none border-none focus:ring-2 focus:ring-sage"
              >
                <option value="">Auto (Current Day)</option>
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>
          </div>
        </section>

        {/* Data & Danger Zone */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal/50 mb-4">Data Management</h2>
          <div className="bg-white rounded-[1.25rem] overflow-hidden shadow-soft">
            <button 
              onClick={exportData}
              className="w-full flex items-center justify-between p-4 border-b border-cream text-charcoal active:bg-cream/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download size={20} />
                <span className="font-medium">Export Backup Data</span>
              </div>
            </button>

            <button 
              onClick={resetStreak}
              className="w-full flex items-center justify-between p-4 text-coral active:bg-coral/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <RefreshCw size={20} />
                <span className="font-medium">Reset Streak</span>
              </div>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
