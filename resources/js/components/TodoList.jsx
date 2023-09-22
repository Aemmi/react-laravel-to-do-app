import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: todo.completed == '1' ? '0' : '1' };
      await axios.put(`/api/todos/${todo.id}`, updatedTodo);
      setTodoList((prevTodos) =>
        prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
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

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTodos = Array.from(todoList);
    const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, movedTodo);

    setTodoList(reorderedTodos);

    try {
        const updatedOrder = reorderedTodos.map((todo) => todo.id);
        // Send an API request to update the order in the backend
        await axios.post('/api/todos/reorder', { order: updatedOrder });
      } catch (error) {
        console.error('Error updating todo order:', error);
      }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
        <table className="table table-stripped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <Droppable droppableId="todos">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {todoList.length === 0 ? (
                <tr>
                    <td colSpan="4">No todos found</td>
                </tr>
                ) : (
                todoList.map((todo, index) => (
                    <Draggable
                        key={todo.id.toString()}
                        draggableId={todo.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                            <td>{index + 1}</td>
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
                            <input
                                    type="checkbox"
                                    checked={todo.completed == '1'}
                                    onChange={() => handleToggleComplete(todo)}
                                />
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
                        )}
                      </Draggable>
                    ))
                  )}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      )}
    </div>
  );
}

export default TodoList;
