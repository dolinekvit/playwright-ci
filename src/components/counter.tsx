import { useCounter } from "../hooks/use-counter";

export function Counter() {
  const { count, add, subtract, reset } = useCounter();

  return (
    <div>
      <span>Current count: {count}</span>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
