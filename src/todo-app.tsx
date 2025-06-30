import React, { useState, useEffect } from "react";

// Define the Todo type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const newItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([newItem, ...todos]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg bg-gray-500">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 border rounded px-3 py-2 mr-2"
          placeholder="Enter a new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border px-3 py-2 rounded"
          >
            <span
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
