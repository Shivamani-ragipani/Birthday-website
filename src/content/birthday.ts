import photo1 from "@/assets/Photo-1.jpeg";
import photo2 from "@/assets/Photo-2.jpeg";
import photo3 from "@/assets/Photo-3.jpeg";
import photo4 from "@/assets/Photo-4.jpeg";
import photo5 from "@/assets/Photo-5.jpeg";

/**
 * Everything writeable in one place.
 * Replace the copy below and swap the five files in `src/assets/` to make
 * this experience personal. Nothing else needs to change.
 */

export const person = {
  name: "Nandhu",
  initial: "N",
  age: 23,
};

export const loader = {
  messages: [
    "Preparing a little surprise\u2026",
    "Collecting beautiful memories\u2026",
    "Wrapping today\u2019s happiness\u2026",
    "Almost ready\u2026",
  ],
  hint: "Best with sound on",
};

/** Act zero — the mysterious knock on the door. */
export const prelude = {
  whisper: "Hello 561, Ready ah?? Chusthava?",
  title: "Happy Birthday Nandhu",
  sub: "Navvaku.. chaalu",
  cta: "Tap to open",
};

/** Act one — the icebreaker. */
// export const opener = {
//   eyebrow: "Just one question",
//   title: "Do you think I\u2019m handsome?",
//   sub: "There is only one correct answer.",
//   yes: "YES",
//   no: "NO",
//   taunts: ["nope", "wrong way", "not today", "try harder", "nice try", "give up", "told you"],
//   reward: "Knew it. Let\u2019s begin.",
// };

export const opener = {
  eyebrow: "aagu.. first thing",
  title: "Nen Baguntana?? 😅",
  sub: "There is only one correct answer.",
  yes: "Avunu",
  no: "Chiiii",
  taunts: ["nope", "wrong way", "not today", "try harder", "nice try", "give up", "told you"],
  reward: "Telsu Naaku.., Let\u2019s begin.",
};

/** Act three — the callback question. */
// export const question = {
//   eyebrow: "Chapter three",
//   title: "Are you enjoying this surprise?",
//   sub: "Answer honestly. One of these buttons is honest too.",
//   yes: "YES",
//   no: "NO",
//   taunts: ["nope", "try again", "not there", "close\u2026", "seriously?", "impressive", "okay stop"],
//   reward: "Correct answer. Obviously.",
// };

export const question = {
  eyebrow: "Chapter three",
  title: "Bagundha website? Nijam chepuu?",
  sub: "Answer honestly. One of these buttons is honest too.",
  yes: "Bagundii",
  no: "Avg vundi",
  taunts: ["oyee", "try again", "not there", "close\u2026", "seriously?", "impressive", "okay stop"],
  reward: "Correct answer. Obviously.",
};

/** Act two — memories. Images only, barely any words. */
export const photos = [photo1, photo2, photo3, photo4, photo5];

/** One or two words per photo. Keep it feather-light. */
// export const photoWhispers = ["that smile", "golden hour", "us, laughing", "quiet joy", "always"];

export const photoIntro = {
  eyebrow: "Chapter two",
  title: "Photos Bagunnai.. ✨",
};

/** Emotional timeline — no dates, only feelings. */
export const timeline = {
  eyebrow: "A little journey",
  title: "How it feels",
  items: [
    { label: "Beautiful smile", note: "the first thing anyone notices" },
    { label: "Wonderful memories", note: "collected, never counted" },
    { label: "Beautiful moments", note: "the small, ordinary, perfect ones" },
    { label: "Today", note: "entirely yours" },
    { label: "New adventures", note: "whatever you choose next" },
  ],
} as const;

/** Mini game — collect the floating hearts. */
export const game = {
  eyebrow: "One tiny game",
  title: "Catch the falling stars",
  sub: "Tap eight of them. Should take about twenty seconds.",
  cta: "Start",
  goal: 8,
  win: "All caught. Something is unlocking\u2026",
};

export const cake = {
  eyebrow: "Chapter four",
  title: "Make a wish",
  sub: "Tap the candle and hold the thought.",
  wish: "Wish received. It\u2019s already on its way.",
};

export const letter = {
  eyebrow: "Chapter five",
  title: "Haappy Birthday",
  lines: [
    "I wanted to give you something that couldn\u2019t be bought or wrapped \u2014 so I built this website for you. ✨",
    "Thank you.. naa venakala roll number vunnadhuku, exams lo naa venakala vunnadhuku.. and for being the most amazing person I could ever ask for. 🥰",
    "May this year bring you countless smiles, beautiful memories, and everything you've been wishing for. ❤️",
  ],
  signature: "\u2014 Maniii",
};

export const finale = {
  title: "Happy Birthday",
  quote: "\u201cAnd the whole day belonged to you.\u201d",
  outro: "Website Bagunte Msg cheyuu..",
  // replay: "Play it again",
};

/**
 * Optional background music.
 * Drop an mp3 at `public/music.mp3` and it will play (muted until tapped).
 */
export const musicSrc = "/music.mp3";
