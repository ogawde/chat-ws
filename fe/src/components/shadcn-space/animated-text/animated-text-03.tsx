"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "../../../lib/utils";

interface AnimatedTypingMotionProps {
  words?: string[];
  className?: string;
  typeOnce?: boolean;
}

const AnimatedTypingMotion = ({
  words: wordsProp,
  className,
  typeOnce = false,
}: AnimatedTypingMotionProps) => {
  const defaultWords = ["Hello, World!", "Welcome to my website!", "This is a typewriter effect."];
  const words = wordsProp ?? defaultWords;
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (typeOnce && doneRef.current) return;
    const currentWord = words[i];
    if (!currentWord) return;

    const timeout = setTimeout(() => {
      if (typeOnce && j === currentWord.length) {
        doneRef.current = true;
        return;
      }
      if (isDeleting) {
        setText(currentWord.substring(0, j - 1));
        setJ(j - 1);
        if (j === 0) {
          setIsDeleting(false);
          setI((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, j + 1));
        setJ(j + 1);
        if (j === currentWord.length && !typeOnce) {
          setIsDeleting(true);
        }
      }
    }, typeOnce ? 28 : 100);

    return () => clearTimeout(timeout);
  }, [j, i, isDeleting, words, typeOnce]);

  return (
    <div className="w-full flex justify-center items-start">
      <p className={cn("text-sm font-medium md:text-base lg:text-lg text-center max-w-2xl", className)}>
        {text}
      </p>
    </div>
  );
};

export default AnimatedTypingMotion;

