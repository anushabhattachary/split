# Antigravity Prompt: Anusha's Personal Pilates-Girl Workout PWA

> Copy-paste everything below the line into Antigravity (or any agentic IDE) as the initial brief. It is written as a single, self-contained spec so the agent can scaffold, code, and deploy without further clarification.

---

## ROLE

You are a senior full-stack engineer + product designer. Your job is to build, commit to GitHub, and deploy to Vercel a **personal Progressive Web App** called **"Lean Girl Daily"** for a user named **Anusha**. The app is a guided, timed, vertical-timeline workout coach that knows what day of the week it is and auto-loads the correct session. It must feel motivational, soft-feminine, minimal, and "that-girl"-aesthetic. No login, no accounts, no backend — it is a single-user PWA installed on her phone.

---

## TECH STACK (NON-NEGOTIABLE)

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS + a small amount of Framer Motion for transitions
- **State:** React state + `localStorage` (for streaks, last-completed day, settings)
- **PWA:** `next-pwa` or a hand-rolled service worker + `manifest.json` (must be installable on iOS Safari & Android Chrome — set `apple-touch-icon`, `theme_color`, `display: standalone`, splash screens)
- **Animations of exercises:** Use **Lottie** (`lottie-react`) with free animations from LottieFiles where possible; fall back to looping muted MP4/WebM clips stored in `/public/animations/` (find royalty-free clips on Pexels/Mixkit; if none exist for a specific move, generate a clean CSS/SVG silhouette loop). Each exercise object must have an `animationSrc` field so swapping clips is trivial.
- **Audio:** Web Audio API for short timer beeps (3-2-1 cue, rest-end ding, workout-complete chime). Include a global mute toggle.
- **Repo:** Initialize a git repo, push to a new GitHub repository named `lean-girl-daily`. Include a thorough README with setup, deploy, and "how to swap an exercise" instructions.
- **Deploy:** Deploy to Vercel with a custom production URL. Output the live URL at the end.

---

## USER PROFILE (HARDCODE)

```ts
export const USER = {
  name: "Anusha",
  weights: { light: 3, heavy: 8 }, // lbs — no other equipment
  dailyStepGoal: 9500,
  dislikes: ["isolated calf raises", "bulky-look heavy compounds"],
  vibe: "pilates-girl + calisthenics + light strength — lean, not bulky",
};
```

The greeting on the home screen reads: **"Hi Anusha — ready to start your workout?"** with today's day name and a single big start button.

---

## WEEKLY SCHEDULE (HARDCODE — THE APP READS `new Date().getDay()` AND ROUTES)

| Day | Type | Focus |
|---|---|---|
| **Monday** | Weights | Upper Body Sculpt (Pilates Arms + Back) |
| **Tuesday** | Weights | Lower Body & Glutes (no isolated calves) |
| **Wednesday** | REST | Optional 15-min mobility flow + walk |
| **Thursday** | Weights | Full-Body Pilates Flow + Core |
| **Friday** | Weights | Total-Body Burn (Calisthenics + Light Weights) |
| **Saturday** | Active | Long alternate run + stretch |
| **Sunday** | Active | Long alternate run + 10-min core finisher |

**Every workout day starts with the same warmup block:**
- 5-min incline walk (treadmill optional — otherwise brisk walk in place / outside)
- **Alternate run intervals:** 30 sec jog × 90 sec walk × **5 rounds** (= 10 min)
- Total warmup: ~15 min, contributing to her ~9–10k daily step goal

---

## EXERCISE LIBRARY (USE EXACTLY THESE — RESEARCHED FOR LEAN, PILATES-GIRL, NON-BULKY)

All weighted moves use **3 lb** unless marked **(8 lb)**. Reps favor high-rep / time-under-tension over heavy load, which is the lean-look protocol. No barbells, no machines.

### MONDAY — Upper Body Sculpt (~30 min)
| # | Exercise | Format | Weight |
|---|---|---|---|
| 1 | Pilates arm circles (forward + back) | 45s each direction | 3 lb |
| 2 | Bicep curl + pulse at top | 3 × 15 reps | 3 lb |
| 3 | Tricep kickbacks | 3 × 15 reps | 3 lb |
| 4 | Lateral raises (slow tempo 3-1-3) | 3 × 12 reps | 3 lb |
| 5 | Front raise → halo press | 3 × 12 reps | 3 lb |
| 6 | Bent-over reverse fly | 3 × 15 reps | 3 lb |
| 7 | Bent-over row (squeeze shoulder blades) | 3 × 15 reps | 8 lb |
| 8 | Pilates "boxing" punches with weights | 60 sec | 3 lb |
| 9 | Plank → shoulder taps | 3 × 40 sec | bodyweight |
| 10 | Forearm plank hold | 1 × 60 sec | bodyweight |
| Cooldown | Cat-cow + child's pose + chest opener | 3 min | — |

### TUESDAY — Lower Body & Glutes (~30 min, NO ISOLATED CALVES)
| # | Exercise | Format | Weight |
|---|---|---|---|
| 1 | Bodyweight glute bridge warmup | 2 × 20 | — |
| 2 | Goblet squat (slow tempo) | 3 × 15 | 8 lb |
| 3 | Reverse lunge (alternating) | 3 × 12 each leg | 8 lb |
| 4 | Curtsy lunge | 3 × 12 each leg | 8 lb |
| 5 | Romanian deadlift (hinge form) | 3 × 15 | 8 lb |
| 6 | Weighted glute bridge + 10 pulses at top | 3 sets | 8 lb on hips |
| 7 | Single-leg glute bridge | 3 × 12 each side | bodyweight |
| 8 | Side-lying leg lift | 3 × 15 each side | bodyweight |
| 9 | Clamshells | 3 × 20 each side | bodyweight |
| 10 | Fire hydrants | 3 × 15 each side | bodyweight |
| Cooldown | Pigeon pose + figure-4 stretch | 4 min | — |

### THURSDAY — Full-Body Pilates Flow + Core (~30 min)
| # | Exercise | Format | Weight |
|---|---|---|---|
| 1 | Pilates 100s | 100 pumps | — |
| 2 | Roll-up | 3 × 8 | — |
| 3 | Single-leg circles | 3 × 8 each direction, each leg | — |
| 4 | Pilates push-up (knees ok) | 3 × 10 | — |
| 5 | Plank → up-down plank | 3 × 8 reps | — |
| 6 | Side plank + hip dip | 3 × 12 each side | — |
| 7 | Dead bug (slow & controlled) | 3 × 10 each side | — |
| 8 | Hollow body hold | 3 × 30 sec | — |
| 9 | Boat pose + 10 pulses | 3 sets | — |
| 10 | Russian twist | 3 × 20 | 3 lb |
| 11 | Superman holds | 3 × 30 sec | — |
| Cooldown | Spinal twist + cobra + child's pose | 4 min | — |

### FRIDAY — Total-Body Burn / Calisthenics + Light Weights (~30 min)
Run as **2 rounds**, 60 sec per move, 15 sec transition, 90 sec rest between rounds.
| # | Exercise | Notes |
|---|---|---|
| 1 | Squat → overhead press | 3 lb |
| 2 | Reverse lunge → curl | 3 lb |
| 3 | Pilates push-up to side plank | bodyweight |
| 4 | Glute bridge march | bodyweight |
| 5 | Plank shoulder taps | bodyweight |
| 6 | Bent-over row | 8 lb |
| 7 | Curtsy lunge → lateral raise | 3 lb |
| 8 | Bicycle crunch | bodyweight |
| 9 | Wall sit hold | bodyweight |
| 10 | Russian twist | 3 lb |
| Cooldown | Standing forward fold + neck rolls | 3 min |

### WEDNESDAY — Active Rest (~15 min, optional)
- Cat-cow × 10
- Thread-the-needle × 8 each side
- Pigeon pose × 60 sec each side
- Hip circles × 10 each direction
- Standing hamstring stretch × 30 sec each
- Shoulder rolls × 20

### SATURDAY / SUNDAY — Cardio + Mobility
- Warmup walk 5 min
- Alternate run: 30 sec jog × 90 sec walk × **8 rounds** (longer than weekday)
- Saturday: stretch out
- Sunday: 10-min core finisher (Pilates 100s, plank, hollow hold, dead bug, Russian twist)

---

## APP UI / UX SPEC

### Home screen (`/`)
- Background: soft gradient (cream → blush → sage). Subtle grain texture.
- Top: time of day greeting → **"Good morning, Anusha 💪"** (drop the emoji if you prefer; user is fine without)
- Headline: **"Ready to start your {DayName} workout?"**
- Subhead in smaller text: today's focus, e.g. *"Upper Body Sculpt · ~45 min including warmup"*
- Streak counter pill (reads from localStorage): *"🔥 12-day streak"*
- Big rounded primary CTA: **START WORKOUT**
- Secondary links: *Browse all workouts*, *Settings* (mute, reset streak, change start day)
- Footer mini-stats: today's est. steps from warmup, total weekly sessions completed

### Workout screen (`/workout/[day]`)
- **Vertical timeline layout.** Each exercise is a card stacked top-to-bottom; current exercise is enlarged & centered with a sticky timer bar at the top of the screen.
- Background of the active card: **looping silent animation of a woman performing the move** (Lottie or muted MP4, `object-fit: cover`, 30% opacity overlay so text reads cleanly on top).
- Active card shows: exercise name, set/rep count, weight cue ("3 lb" pill), large countdown timer, *Pause* and *Skip* buttons, *Next ↓* button.
- Below current: greyed-out previews of upcoming exercises (compact cards).
- Above current: completed exercises collapse with a green check.
- Auto-advance when timer hits 0 with a soft beep + haptic vibrate (`navigator.vibrate(200)`).
- Rest screen between exercises: full-screen calm gradient + countdown + motivational rotating quote ("You're doing the work. Be proud.")
- Workout-complete screen: confetti (`canvas-confetti`), summary (total time, streak +1), share button (web share API), back to home.

### Warmup module
- Always the **first block** on every workout day (Mon, Tue, Thu, Fri, Sat, Sun).
- Renders as: incline walk (5 min) → alternate run intervals (30s/90s × 5, or × 8 on weekends).
- Use a colored ring timer that switches color (jog = coral, walk = sage) so she knows what to do at a glance even if her phone is across the room.

### Workouts library (`/workouts`)
- Plain list of all 7 days with their focus and estimated time, so she can preview the week or do tomorrow's workout today if she wants.

### Settings (`/settings`)
- Mute / unmute audio cues
- Toggle vibration
- Override "today's day" (for makeup days)
- Reset streak
- Export data (download localStorage JSON)

---

## DATA MODEL

```ts
type Exercise = {
  id: string;
  name: string;
  cue: string;             // 1-line form tip
  durationSec?: number;    // for time-based moves
  reps?: string;           // e.g. "3 × 15"
  weightLb?: 0 | 3 | 8;
  restSec: number;
  animationSrc: string;    // /animations/{slug}.json or .mp4
  posterImg?: string;      // first frame for fast paint
};

type WorkoutDay = {
  day: 0|1|2|3|4|5|6;      // Sun..Sat
  name: string;            // "Upper Body Sculpt"
  type: "weights" | "rest" | "cardio";
  estMinutes: number;
  warmup: Exercise[];      // shared block injected
  main: Exercise[];
  cooldown: Exercise[];
};
```

Put all workouts in `/data/workouts.ts`. Make it the single source of truth so swapping a move = editing one object.

---

## ANIMATION SOURCING

For each exercise above, attempt in this order:
1. Search LottieFiles for a free animation matching the move (e.g. "squat", "plank", "lunge"). Prefer minimalist line-art figures.
2. If none, use a free silent loop from Pexels or Mixkit (women doing pilates / bodyweight moves).
3. If neither exists, generate a simple SVG/CSS keyframe silhouette loop and include a small note in `/animations/README.md` saying which exercises need a real clip swap later.

Wire each `animationSrc` so it can be swapped without code changes — just drop a new file in `/public/animations/` and update the path.

---

## MOTIVATIONAL COPY (USE THESE — ROTATE RANDOMLY ON REST SCREENS)

- "Strong is the new soft."
- "Lean, long, lit. Keep going."
- "Future Anusha is watching. Make her proud."
- "One more rep. One more breath. One more day."
- "You don't need a gym — you ARE the gym."
- "Pilates girls don't quit at rep 12."
- "Consistency over intensity. Every single day."

---

## ACCESSIBILITY & POLISH

- All buttons ≥ 44px tap target.
- Respect `prefers-reduced-motion` (disable Lottie loops, fall back to a still poster).
- Keep contrast WCAG AA on the gradient backgrounds.
- Keyboard-navigable home screen.
- Add a meta theme-color matching the active screen so iOS status bar blends in.

---

## DELIVERABLES

1. **Public GitHub repo** `lean-girl-daily` with clean commit history (initial scaffold → data layer → UI → animations → PWA → deploy).
2. **README.md** with: install, run dev, deploy to Vercel, how to swap an exercise, how to swap an animation, how to add a new day.
3. **Production Vercel URL** that opens to the home screen.
4. **PWA installable** on iOS and Android — verify by adding to home screen on a real device or via Chrome DevTools "Install" simulation.
5. **Lighthouse PWA score ≥ 90** for Performance, Accessibility, Best Practices, PWA.
6. Final message: print the GitHub URL + Vercel URL + a one-paragraph summary of what was built.

---

## EXECUTION ORDER (DO IT IN THIS SEQUENCE)

1. Scaffold Next.js + TypeScript + Tailwind + `next-pwa`.
2. Build `/data/workouts.ts` with the full library above.
3. Build the day-routing logic + home screen.
4. Build the workout screen with the vertical timeline + timer engine + audio cues.
5. Source/embed Lottie or MP4 animations for each exercise.
6. Add localStorage for streaks + completion history.
7. Add PWA manifest, icons (generate from a simple "LG" monogram or sage-toned circle), service worker.
8. Polish — confetti, motivational rotator, settings page.
9. `git init`, push to GitHub, deploy to Vercel.
10. Run Lighthouse, fix any PWA / a11y issues, redeploy.
11. Print the URLs and a screenshot of the home screen.

---

## OUT OF SCOPE (DO NOT BUILD)

- Login / auth / multi-user
- Backend / database
- Calorie tracking
- Heart-rate integration
- Social feed
- Any heavy compound lifts (deadlift PRs, barbell back squat, etc. — wrong vibe)
- Isolated calf-raise exercises (the user explicitly dislikes them)

---

## STYLE GUIDE QUICK REF

- Font: `Inter` for UI, `Fraunces` (variable) for the big headline only.
- Palette: `#F8F1EA` (cream), `#E8C7B8` (blush), `#9CAF9A` (sage), `#2B2A28` (charcoal text), `#D87C5A` (coral accent for active timer).
- Border radius: `1.25rem` everywhere; cards have soft `0 8px 24px rgba(0,0,0,0.06)` shadow.
- Animations: ease-in-out 250ms; never longer than 400ms; use `will-change: transform` sparingly.

---

End of brief. Start now. Ask zero clarifying questions — every decision is yours to make within this spec. Ship it.
