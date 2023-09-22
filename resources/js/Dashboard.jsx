import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import Header from './components/Header';
import { setDocumentTitle } from './utils/setDocumentTitle';

function Dashboard() {

    useEffect(() => {
        setDocumentTitle('User Dashboard | Manage Todos');
    }, []);

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [todos, setTodos] = useState([]);

    const handleChange = (evt) => {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }

    function handleSubmit() {
        var title = form.title;
        var description = form.description;

        const data = {
            title: title,
            description: description,
        };
        const userToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        axios.post('/api/todos', data)
            .then(response => {
                console.log(response.data.message);
                // Handle the successful response data
                if (response.data.status == 'success') {
                    setTodos([...todos, response.data.todo]);
                    setForm({ title: "", description: "" });
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                // Handle any errors
                console.error("my error " + error);
            });
    }

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        // Fetch todos when the component mounts
        axios.get('/api/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            return () => {
                delete axios.defaults.headers.common['Authorization'];
            };
    }, []);

    return (
        <div>
            <Header/>
            <div className="row my-5">
                <div className="col-md-4 p-3 mt-4">
                    <div className='container'>
                        <h4 className='text-center'>Create new todo</h4>

                        <div className="row mb-3">
                            <div className="form-group">
                                <label >Title</label>
                                <input type="text" name="title" onChange={handleChange} className="form-control" id="title"/>
                                <i className="text-warning" id="title-error"></i>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" onChange={handleChange} className="form-control" id="description"></textarea>
                                <i className="text-warning" id="description-error"></i>
                            </div>
                        </div>

                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Save</button>

                    </div>
                </div>
                <div className="col-md-8 p-3 mt-4">
                    <div className='container'>
                        <h2>My Todos</h2>
                        <div className='row table-responsive'>

                            <TodoList todos={todos} />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
