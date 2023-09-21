import React, { useState } from 'react';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <TodoList todos={todos} />
    </div>
  );
}

export default TodoApp;
