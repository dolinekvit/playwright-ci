import { useState } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);

  const add = () => setCount((state) => state + 1);

  const subtract = () => setCount((state) => state - 1);

  const reset = () => setCount(0);

  return { count, add, subtract, reset };
}
