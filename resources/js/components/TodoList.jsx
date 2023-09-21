import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({ todos }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='table table-stripped table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="4">No todos found</td>
              </tr>
            ) : (
              todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <div className="btn-group">
                      <a href="#" className="btn btn-primary active" aria-current="page">
                        <i className='fa fa-pencil'></i>
                      </a>
                      <a href="#" className="btn btn-danger">
                        <i className='fa fa-trash'></i>
                      </a>
                    </div>
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
