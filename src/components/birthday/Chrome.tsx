import { motion, useScroll, useSpring } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { musicSrc } from "@/content/birthday";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--rose), var(--lavender), var(--gold))",
      }}
    />
  );
}

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "none";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // No track present (or blocked) — stay silent rather than break the mood.
      setPlaying(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="glass-strong fixed bottom-7 right-5 z-50 grid h-12 w-12 place-items-center rounded-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
      transition={{
        opacity: { delay: 2.6, duration: 0.8 },
        scale: { delay: 2.6, duration: 0.8 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      whileTap={{ scale: 0.9 }}
    >
      {playing ? (
        <Volume2 className="h-4 w-4" style={{ color: "var(--rose)" }} />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground" />
      )}
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: "var(--rose)" }}
          animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
