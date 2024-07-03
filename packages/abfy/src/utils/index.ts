import { ReactElement, ReactNode } from "react";
import { ABFY_SESSION_STORAGE_KEY, ABFY_VARIANT } from "./constants";
import { logger } from "./logger";

export const randomIdGenerator = (prefix?: string | null): string => {
  const adjectives = [
    "Bright",
    "Creative",
    "Dynamic",
    "Energetic",
    "Fantastic",
    "Genuine",
    "Happy",
    "Innovative",
    "Jolly",
    "Keen",
    "Lively",
    "Marvelous",
    "Optimistic",
    "Productive",
    "Reliable",
    "Successful",
    "Thriving",
    "Vivacious",
    "Wonderful",
  ];
  const nouns = [
    "Adventure",
    "Challenge",
    "Concept",
    "Design",
    "Endeavor",
    "Expedition",
    "Goal",
    "Horizon",
    "Idea",
    "Insight",
    "Inspiration",
    "Journey",
    "Landmark",
    "Mission",
    "Objective",
    "Perspective",
    "Plan",
    "Quest",
    "Strategy",
    "Vision",
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 900) + 100;

  if (prefix) {
    return `${prefix}-${adj}${noun}${number}`;
  } else {
    return `${adj}${noun}${number}`;
  }
};

export function getRenderId(): string | null {
  try {
    const sessionData = sessionStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    if (!sessionData) return null;
    const storedData = JSON.parse(sessionData) || {};
    return storedData.renderId || null;
  } catch (error) {
    logger({
      message: "Error parsing session storage data:",
      level: "ERROR",
      data: error,
    });
    return null;
  }
}

export function storeRenderId(renderId: string): void {
  sessionStorage.setItem(
    ABFY_SESSION_STORAGE_KEY,
    JSON.stringify({ renderId })
  );
}

export function isReactElement(child: ReactNode): child is ReactElement {
  return typeof child === "object" && child !== null && "props" in child;
}

export function isVariant(child: ReactElement) {
  return !!child.props.variantId;
}
