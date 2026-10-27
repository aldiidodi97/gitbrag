"use client";

import { useEffect, useState } from "react";

/** Cycles through words, letter by letter, like the Vantage headline. */
export function RotatingWord({
  words,
  interval = 2600,
}: {
  words: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
      setKey((k) => k + 1);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const word = words[index];

  return (
    <span className="text-accent relative inline-block align-baseline whitespace-nowrap">
      <span className="invisible inline-block whitespace-nowrap">
        {longest}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <span className="sr-only">{word}</span>
        <span
          aria-hidden
          className="absolute top-0 left-0 inline-block whitespace-pre"
        >
          {Array.from(word).map((ch, i) => (
            <span
              key={`${key}-${i}`}
              className="letter-in inline-block whitespace-pre"
              style={{ animationDelay: `${i * 28}ms` }}
            >
              {ch}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
