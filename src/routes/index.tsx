import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Aurora } from "@/components/birthday/Aurora";
import { CakeSection } from "@/components/birthday/CakeSection";
import { MusicToggle, ScrollProgress } from "@/components/birthday/Chrome";
import { Finale } from "@/components/birthday/Finale";
import { LetterSection } from "@/components/birthday/LetterSection";
import { Loader } from "@/components/birthday/Loader";
import { PhotoReveal } from "@/components/birthday/PhotoReveal";
import { Prelude } from "@/components/birthday/Prelude";
import { QuestionSection } from "@/components/birthday/QuestionSection";
// import { StarGame } from "@/components/birthday/StarGame";
// import { Timeline } from "@/components/birthday/Timeline";
import { opener, person, question } from "@/content/birthday";

const title = `Happy Birthday, ${person.name}`;
const description = `A private, cinematic birthday experience made for ${person.name} — memories, a wish, a letter and a small celebration.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const [opened, setOpened] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [chapterThreeAnswered, setChapterThreeAnswered] = useState(false);
  const [chapterFourReady, setChapterFourReady] = useState(false);
  const [chapterFourCompleted, setChapterFourCompleted] = useState(false);

  const unlock = () => {
    setUnlocked(true);
    window.setTimeout(() => {
      document.getElementById("photos")?.scrollIntoView({ behavior: "smooth" });
    }, 1400);
  };

  const scrollToSection = (id: string) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
  };

  const handleChapterThreeAnswer = () => {
    setChapterThreeAnswered(true);
    setChapterFourReady(true);
    scrollToSection("cake");
  };

  const handleCandleBlown = () => {
    setChapterFourCompleted(true);
    scrollToSection("letter");
  };

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      {ready && <Prelude onOpen={() => setOpened(true)} />}
      <Aurora />
      <ScrollProgress />
      <MusicToggle />

      <main
        className="relative z-10 mx-auto w-full max-w-[430px]"
        style={{ opacity: opened ? 1 : 0, transition: "opacity 900ms ease" }}
      >
        <h1 className="sr-only">{title}</h1>

        <QuestionSection id="opener" copy={opener} onYes={unlock} continueLabel="Keep scrolling" />

        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(16px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <PhotoReveal />
              {/* <Timeline /> */}
              <QuestionSection
                id="question"
                copy={question}
                onYes={handleChapterThreeAnswer}
              />
              {/* <StarGame /> */}
              {chapterThreeAnswered && (
                <>
                  {chapterFourReady && <CakeSection onCandleBlown={handleCandleBlown} />}
                  {chapterFourCompleted && (
                    <>
                      <LetterSection />
                      <Finale />
                    </>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
