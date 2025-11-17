import { useEffect, useMemo, useState } from "react";

interface TypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
}

export const useTypewriter = (
  phrases: string[],
  { typingSpeed = 110, deletingSpeed = 55, pauseBetween = 1400 }: TypewriterOptions = {}
) => {
  const safePhrases = useMemo(
    () => (phrases.length ? phrases : [""]),
    [phrases]
  );

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = safePhrases[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseBetween);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % safePhrases.length);
      }, 300);
    } else {
      const delta = isDeleting ? -1 : 1;
      const speed = isDeleting ? deletingSpeed : typingSpeed;

      timeout = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + delta));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, safePhrases, typingSpeed, deletingSpeed, pauseBetween]);

  return { text, isDeleting };
};

