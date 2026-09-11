import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./use-counter";

describe(useCounter.name, () => {
  test("default count is 0", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("should increase counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.add());

    expect(result.current.count).toBe(1);
  });

  test("should decrease counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.subtract());

    expect(result.current.count).toBe(-1);
  });

  test("should reset counter", () => {
     const { result } = renderHook(() => useCounter());

    act(() => result.current.subtract());

    expect(result.current.count).toBe(-1);

    act(() => result.current.reset());

    expect(result.current.count).toBe(0);
  })
});
