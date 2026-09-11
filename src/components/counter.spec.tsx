import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Counter } from "./counter";
import { describe, expect, test } from "vitest";

describe("Counter", () => {
  test("should render interface", () => {
    render(<Counter />);

    expect(screen.getByText(/current count\:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  test("should add to counter on button press", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    expect(screen.getByText(/current count\: 0/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText(/current count\: 1/i)).toBeInTheDocument();
  });

  test("should remove to counter on button press", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    expect(screen.getByText(/current count\: 0/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText(/current count\: \-1/i)).toBeInTheDocument();
  });

  test("should reset the counter", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    expect(screen.getByText(/current count\: 0/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText(/current count\: 1/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByText(/current count\: 0/i)).toBeInTheDocument();
  });
});
