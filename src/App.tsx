import { useState } from "react";
import { Check, X } from "lucide-react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Тестовое задание", completed: false },
    { id: 2, text: "Покрытие тестами", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-6xl font-thin text-center text-gray-300 mb-8">
          todos
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={addTodo} className="border-b">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 focus:outline-none"
            />
          </form>
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="border-b last:border-b-0">
                <div className="flex items-center px-4 py-3">
                  <button onClick={() => toggleTodo(todo.id)} className="mr-2">
                    {todo.completed ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                    )}
                  </button>
                  <span
                    className={`flex-grow ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() =>
                      setTodos(todos.filter((t) => t.id !== todo.id))
                    }
                    aria-label="Delete todo"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-700" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between text-xs text-gray-500">
            <span>
              {todos.filter((todo) => !todo.completed).length} items left
            </span>
            <div className="space-x-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-1 py-0.5 rounded ${
                  filter === "all" ? "border" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-1 py-0.5 rounded ${
                  filter === "active" ? "border" : ""
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-1 py-0.5 rounded ${
                  filter === "completed" ? "border" : ""
                }`}
              >
                Completed
              </button>
            </div>
            <button onClick={clearCompleted} className="hover:underline">
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
