export type Exercise = {
  id: string;
  name: string;
  cue: string;
  durationSec?: number;
  reps?: string;
  weightLb?: 0 | 3 | 8;
  restSec: number;
  animationSrc: string;
  posterImg?: string;
};

export type WorkoutDay = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sun..Sat
  name: string;
  type: "weights" | "rest" | "cardio";
  estMinutes: number;
  warmup: Exercise[];
  main: Exercise[];
  cooldown: Exercise[];
};

export const USER = {
  name: "Anusha",
  weights: { light: 3, heavy: 8 }, // lbs — no other equipment
  dailyStepGoal: 9500,
  dislikes: ["isolated calf raises", "bulky-look heavy compounds"],
  vibe: "pilates-girl + calisthenics + light strength — lean, not bulky",
};

const COMMON_REST_SEC = 15;
const TRANSITION_REST_SEC = 30; // slightly longer between major blocks

const standardWarmup: Exercise[] = [
  {
    id: "wu-1",
    name: "Incline Walk",
    cue: "5-min incline walk (treadmill or brisk walk in place)",
    durationSec: 300,
    restSec: 15,
    animationSrc: "/animations/walk.svg",
  },
  {
    id: "wu-2",
    name: "Run Intervals",
    cue: "30 sec jog × 90 sec walk × 5 rounds",
    durationSec: 600, // 5 * (30 + 90)
    restSec: TRANSITION_REST_SEC,
    animationSrc: "/animations/jog.svg",
  }
];

const weekendWarmup: Exercise[] = [
  {
    id: "wu-1",
    name: "Incline Walk",
    cue: "5-min warmup walk",
    durationSec: 300,
    restSec: 15,
    animationSrc: "/animations/walk.svg",
  },
  {
    id: "wu-2-wknd",
    name: "Run Intervals (Long)",
    cue: "30 sec jog × 90 sec walk × 8 rounds",
    durationSec: 960, // 8 * (30 + 90)
    restSec: TRANSITION_REST_SEC,
    animationSrc: "/animations/jog.svg",
  }
];

export const workouts: WorkoutDay[] = [
  {
    day: 0, // Sunday
    name: "Long alternate run + 10-min core finisher",
    type: "cardio",
    estMinutes: 45,
    warmup: weekendWarmup,
    main: [
      { id: "sun-1", name: "Pilates 100s", cue: "100 pumps", durationSec: 100, restSec: 15, animationSrc: "/animations/core.svg" },
      { id: "sun-2", name: "Plank Hold", cue: "Hold steady", durationSec: 60, restSec: 15, animationSrc: "/animations/core.svg" },
      { id: "sun-3", name: "Hollow Hold", cue: "Press lower back down", durationSec: 60, restSec: 15, animationSrc: "/animations/core.svg" },
      { id: "sun-4", name: "Dead Bug", cue: "Slow and controlled", reps: "3 × 10 each side", restSec: 15, animationSrc: "/animations/core.svg" },
      { id: "sun-5", name: "Russian Twist", cue: "Twist from core", weightLb: 3, reps: "3 × 20", restSec: 15, animationSrc: "/animations/core.svg" }
    ],
    cooldown: []
  },
  {
    day: 1, // Monday
    name: "Upper Body Sculpt",
    type: "weights",
    estMinutes: 45,
    warmup: standardWarmup,
    main: [
      { id: "mon-1", name: "Pilates arm circles", cue: "Forward + back", durationSec: 90, weightLb: 3, restSec: 15, animationSrc: "/animations/arms.svg" },
      { id: "mon-2", name: "Bicep curl + pulse at top", cue: "Squeeze at top", reps: "3 × 15", weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-3", name: "Tricep kickbacks", cue: "Keep elbows high", reps: "3 × 15", weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-4", name: "Lateral raises", cue: "Slow tempo 3-1-3", reps: "3 × 12", weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-5", name: "Front raise → halo press", cue: "Controlled movement", reps: "3 × 12", weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-6", name: "Bent-over reverse fly", cue: "Squeeze shoulder blades", reps: "3 × 15", weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-7", name: "Bent-over row", cue: "Squeeze shoulder blades", reps: "3 × 15", weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-8", name: "Pilates \"boxing\" punches", cue: "Keep core tight", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "mon-9", name: "Plank → shoulder taps", cue: "Minimal hip sway", durationSec: 120, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/plank.svg" },
      { id: "mon-10", name: "Forearm plank hold", cue: "Breathe through it", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/plank.svg" },
    ],
    cooldown: [
      { id: "mon-cd1", name: "Cat-cow + child's pose + chest opener", cue: "Breathe deep", durationSec: 180, restSec: 0, animationSrc: "/animations/stretch.svg" }
    ]
  },
  {
    day: 2, // Tuesday
    name: "Lower Body & Glutes",
    type: "weights",
    estMinutes: 45,
    warmup: standardWarmup,
    main: [
      { id: "tue-1", name: "Bodyweight glute bridge warmup", cue: "Squeeze glutes", reps: "2 × 20", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-2", name: "Goblet squat", cue: "Slow tempo", reps: "3 × 15", weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-3", name: "Reverse lunge", cue: "Alternating legs", reps: "3 × 12 each", weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-4", name: "Curtsy lunge", cue: "Keep chest up", reps: "3 × 12 each", weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-5", name: "Romanian deadlift", cue: "Hinge form", reps: "3 × 15", weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-6", name: "Weighted glute bridge", cue: "10 pulses at top", reps: "3 sets", weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-7", name: "Single-leg glute bridge", cue: "Drive through heel", reps: "3 × 12 each", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-8", name: "Side-lying leg lift", cue: "Control the descent", reps: "3 × 15 each", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-9", name: "Clamshells", cue: "Squeeze at top", reps: "3 × 20 each", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "tue-10", name: "Fire hydrants", cue: "Keep core stable", reps: "3 × 15 each", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
    ],
    cooldown: [
      { id: "tue-cd1", name: "Pigeon pose + figure-4 stretch", cue: "Release tension", durationSec: 240, restSec: 0, animationSrc: "/animations/stretch.svg" }
    ]
  },
  {
    day: 3, // Wednesday
    name: "Active Rest",
    type: "rest",
    estMinutes: 15,
    warmup: [],
    main: [
      { id: "wed-1", name: "Cat-cow", cue: "Move with breath", reps: "10 reps", restSec: 10, animationSrc: "/animations/stretch.svg" },
      { id: "wed-2", name: "Thread-the-needle", cue: "Gentle twist", reps: "8 each side", restSec: 10, animationSrc: "/animations/stretch.svg" },
      { id: "wed-3", name: "Pigeon pose", cue: "Sink into it", durationSec: 120, restSec: 10, animationSrc: "/animations/stretch.svg" },
      { id: "wed-4", name: "Hip circles", cue: "Open up hips", reps: "10 each direction", restSec: 10, animationSrc: "/animations/stretch.svg" },
      { id: "wed-5", name: "Standing hamstring stretch", cue: "Keep back flat", durationSec: 60, restSec: 10, animationSrc: "/animations/stretch.svg" },
      { id: "wed-6", name: "Shoulder rolls", cue: "Release tension", reps: "20 reps", restSec: 0, animationSrc: "/animations/stretch.svg" },
    ],
    cooldown: []
  },
  {
    day: 4, // Thursday
    name: "Full-Body Pilates Flow + Core",
    type: "weights",
    estMinutes: 45,
    warmup: standardWarmup,
    main: [
      { id: "thu-1", name: "Pilates 100s", cue: "100 pumps", durationSec: 100, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-2", name: "Roll-up", cue: "One vertebra at a time", reps: "3 × 8", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-3", name: "Single-leg circles", cue: "Keep hips stable", reps: "3 × 8 each dir", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-4", name: "Pilates push-up", cue: "Knees ok", reps: "3 × 10", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "thu-5", name: "Plank → up-down plank", cue: "Keep hips level", reps: "3 × 8", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/plank.svg" },
      { id: "thu-6", name: "Side plank + hip dip", cue: "Lift from obliques", reps: "3 × 12 each", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/plank.svg" },
      { id: "thu-7", name: "Dead bug", cue: "Slow & controlled", reps: "3 × 10 each", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-8", name: "Hollow body hold", cue: "Press lower back down", durationSec: 90, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-9", name: "Boat pose + 10 pulses", cue: "Chest lifted", reps: "3 sets", weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-10", name: "Russian twist", cue: "Twist from core", reps: "3 × 20", weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "thu-11", name: "Superman holds", cue: "Squeeze glutes and back", durationSec: 90, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
    ],
    cooldown: [
      { id: "thu-cd1", name: "Spinal twist + cobra + child's pose", cue: "Deep breaths", durationSec: 240, restSec: 0, animationSrc: "/animations/stretch.svg" }
    ]
  },
  {
    day: 5, // Friday
    name: "Total-Body Burn",
    type: "weights",
    estMinutes: 45,
    warmup: standardWarmup,
    main: [
      { id: "fri-1", name: "Squat → overhead press", cue: "Explosive up", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-2", name: "Reverse lunge → curl", cue: "Control balance", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-3", name: "Pilates push-up to side plank", cue: "Smooth transition", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "fri-4", name: "Glute bridge march", cue: "Keep hips high", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-5", name: "Plank shoulder taps", cue: "Stable core", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/plank.svg" },
      { id: "fri-6", name: "Bent-over row", cue: "Squeeze shoulder blades", durationSec: 60, weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "fri-7", name: "Curtsy lunge → lateral raise", cue: "Coordinate arms & legs", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-8", name: "Bicycle crunch", cue: "Elbow to opposite knee", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "fri-9", name: "Wall sit hold", cue: "90 degree angle", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-10", name: "Russian twist", cue: "Twist from core", durationSec: 60, weightLb: 3, restSec: 90, animationSrc: "/animations/core.svg" },
      // Round 2
      { id: "fri-11", name: "Squat → overhead press (R2)", cue: "Keep form tight", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-12", name: "Reverse lunge → curl (R2)", cue: "Control balance", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-13", name: "Pilates push-up to side plank (R2)", cue: "Smooth transition", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "fri-14", name: "Glute bridge march (R2)", cue: "Keep hips high", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-15", name: "Plank shoulder taps (R2)", cue: "Stable core", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/plank.svg" },
      { id: "fri-16", name: "Bent-over row (R2)", cue: "Squeeze shoulder blades", durationSec: 60, weightLb: 8, restSec: COMMON_REST_SEC, animationSrc: "/animations/arms.svg" },
      { id: "fri-17", name: "Curtsy lunge → lateral raise (R2)", cue: "Coordinate arms & legs", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-18", name: "Bicycle crunch (R2)", cue: "Elbow to opposite knee", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
      { id: "fri-19", name: "Wall sit hold (R2)", cue: "90 degree angle", durationSec: 60, weightLb: 0, restSec: COMMON_REST_SEC, animationSrc: "/animations/legs.svg" },
      { id: "fri-20", name: "Russian twist (R2)", cue: "Twist from core", durationSec: 60, weightLb: 3, restSec: COMMON_REST_SEC, animationSrc: "/animations/core.svg" },
    ],
    cooldown: [
      { id: "fri-cd1", name: "Standing forward fold + neck rolls", cue: "Release all tension", durationSec: 180, restSec: 0, animationSrc: "/animations/stretch.svg" }
    ]
  },
  {
    day: 6, // Saturday
    name: "Long alternate run + stretch",
    type: "cardio",
    estMinutes: 45,
    warmup: weekendWarmup,
    main: [
      { id: "sat-1", name: "Full Body Stretch", cue: "Focus on hips & calves", durationSec: 600, restSec: 0, animationSrc: "/animations/stretch.svg" }
    ],
    cooldown: []
  }
];
