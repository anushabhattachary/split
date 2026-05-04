# Animations

This directory is where the application loads exercise animations.
The current app defaults to CSS/SVG fallbacks for the animations, using just the first letter of the exercise as a visual placeholder in the active card.

To swap these out with actual Lottie animations or MP4s as requested in the design spec:
1. Find a free line-art or minimalist Lottie JSON file (e.g., from LottieFiles).
2. Save it here (e.g. `walk.json`, `arms.json`, etc.).
3. Update `src/data/workouts.ts` `animationSrc` properties to point to your new file.
4. Update `src/app/workout/[day]/page.tsx` to conditionally render `lottie-react` or a `<video src="...">` based on the file extension.
