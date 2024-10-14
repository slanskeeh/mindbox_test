import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Todo List Component", () => {
  test("renders the todo list", () => {
    render(<App />);
    expect(screen.getByText("todos")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(input);
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<App />);
    const todoText = "Тестовое задание";
    const todoItem = screen.getByText(todoText);
    const checkbox = todoItem.previousSibling as HTMLElement;
    fireEvent.click(checkbox);
    expect(todoItem).toHaveClass("line-through");
  });

  test("deletes a todo", () => {
    render(<App />);
    const initialTodoCount = screen.getAllByRole("listitem").length;
    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0]; // Assuming the delete button has an accessible name
    fireEvent.click(deleteButton);
    const finalTodoCount = screen.getAllByRole("listitem").length;
    expect(finalTodoCount).toBe(initialTodoCount - 1);
    expect(screen.queryByText("Тестовое задание")).not.toBeInTheDocument();
  });

  test("filters todos", () => {
    render(<App />);
    const activeFilter = screen.getByText("Active");
    fireEvent.click(activeFilter);
    expect(screen.queryByText("Покрытие тестами")).not.toBeInTheDocument();
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();

    const completedFilter = screen.getByText("Completed");
    fireEvent.click(completedFilter);
    expect(screen.queryByText("Тестовое задание")).not.toBeInTheDocument();
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();
  });

  test("clears completed todos", () => {
    render(<App />);
    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);
    expect(screen.queryByText("Покрытие тестами")).not.toBeInTheDocument();
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
  });

  test("updates items left count", () => {
    render(<App />);
    expect(screen.getByText("1 items left")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(input);
    expect(screen.getByText("2 items left")).toBeInTheDocument();
  });
});
