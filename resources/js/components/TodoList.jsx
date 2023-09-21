import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({ todos }) {
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(todos);
    setLoading(false);
  }, [todos]);

  const handleEditClick = (todo) => {
    // Clone the todo object before setting it to editingTodo
    setEditingTodo({ ...todo });
  };

  const handleDeleteClick = async (todo) => {
    try {
      await axios.delete(`/api/todos/${todo.id}`);
      // Remove the deleted todo from the local state
      setTodoList((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleSaveEdit = async (editedTodo) => {
    try {
      await axios.put(`/api/todos/${editedTodo.id}`, editedTodo);

      setTodoList((prevTodos) =>
        prevTodos.map((t) => (t.id === editedTodo.id ? editedTodo : t))
      );
      // Clear the editing state
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-stripped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.length === 0 ? (
              <tr>
                <td colSpan="4">No todos found</td>
              </tr>
            ) : (
              todoList.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>
                    {editingTodo && editingTodo.id === todo.id ? (
                      <input
                        type="text"
                        value={editingTodo.title}
                        onChange={(e) =>
                          setEditingTodo({
                            ...editingTodo,
                            title: e.target.value,
                          })
                        }
                      />
                    ) : (
                      todo.title
                    )}
                  </td>
                  <td>
                    {editingTodo && editingTodo.id === todo.id ? (
                      <input
                        type="text"
                        value={editingTodo.description}
                        onChange={(e) =>
                          setEditingTodo({
                            ...editingTodo,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      todo.description
                    )}
                  </td>
                  <td>
                    {editingTodo && editingTodo.id === todo.id ? (
                      <>
                        <button onClick={() => handleSaveEdit(editingTodo)} className="btn btn-success">
                          Save
                        </button>
                        <button onClick={handleCancelEdit} className="btn btn-secondary">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <div className="btn-group">
                        <button onClick={() => handleEditClick(todo)} className="btn btn-primary">
                          <i className='fa fa-pencil'></i>
                        </button>
                        <button onClick={() => handleDeleteClick(todo)} className="btn btn-danger">
                        <i className='fa fa-trash'></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TodoList;
