"use client";

import { useRef } from "react";

export const useInterval = () => {
  const id = useRef<NodeJS.Timeout>();

  const startInterval = (cb: () => void, delay: number) => {
    cb();
    id.current = setInterval(cb, delay);
  };

  const stopInterval = () => {
    if (id.current !== undefined) {
      clearInterval(id.current);
      id.current = undefined;
    }
  };

  return { startInterval, stopInterval };
};
