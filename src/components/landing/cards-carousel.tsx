"use client";

import Image from "next/image";
import { useState } from "react";

const cards = [
  {
    format: "og",
    label: "Link preview",
    size: "1200 x 630",
    width: 1200,
    height: 630,
  },
  {
    format: "square",
    label: "Square",
    size: "1080 x 1080",
    width: 1080,
    height: 1080,
  },
  {
    format: "story",
    label: "Story",
    size: "1080 x 1920",
    width: 1080,
    height: 1920,
  },
];

export function CardsCarousel({ login }: { login: string }) {
  const [index, setIndex] = useState(0);
  const card = cards[index];
  return (
    <div className="border-border-strong relative border px-5 py-12 sm:px-16 sm:py-16">
      <span className="bg-accent absolute top-0 left-1/2 h-8 w-px -translate-x-1/2" />
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <Image
          key={card.format}
          src={`/api/card/${login}.png?format=${card.format}`}
          alt={`${card.label} share card for ${login}`}
          width={card.width}
          height={card.height}
          unoptimized
          priority
          className="border-border rise h-64 w-auto max-w-full border sm:h-80"
        />
      </div>
      <div className="mt-8 flex flex-col items-center gap-5">
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-2 text-center font-mono text-[11px] tracking-[0.14em] uppercase">
          <span className="bg-accent size-2 shrink-0" />
          <span className="text-foreground">{card.label}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{card.size} PNG</span>
        </p>
        <div className="flex items-center gap-2">
          {cards.map((c, i) => (
            <button
              key={c.format}
              type="button"
              aria-label={`Show ${c.label} card`}
              onClick={() => setIndex(i)}
              className={`h-1 w-6 transition-all ${i === index ? "bg-accent" : "bg-border-strong hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
