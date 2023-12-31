import react, {useState, useEffect} from 'react';
import axios from 'axios';
import { setDocumentTitle } from './utils/setDocumentTitle';

function Login() {

    useEffect(() => {
        setDocumentTitle('User Dashboard | Manage Todos');
    }, []);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setForm({
            ...form,
            [evt.target.name]: value
        });
    }

    function handleSubmit()
    {
        const credentials = {
            email: form.email,
            password: form.password
        };
        axios.post('/api/auth/login', credentials)
        .then(response => {
            if (response.data.status == 'success') {
                localStorage.setItem('token', response.data.token);
                location.assign('/dashboard');
            } else {
                alert(response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>

            <div className="row my-5">
                <div className="col-md-8 p-3 mt-4 m-auto">
                    <div className='container'>
                        <h2 className='text-center'>Welcome to your ToDo App</h2>
                        <h4 className='text-center'>Kindly Login</h4>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                            <input type="email" name="email" onChange={handleChange} value={form.email} className="form-control" id="inputEmail3"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-9">
                            <input type="password" name="password" onChange={handleChange} value={form.password} className="form-control" id="inputPassword3"/>
                            </div>
                        </div>

                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Sign in</button>

                    </div>
                    <div className='row text-center p-3'>
                        <a href='/register'>Not registered? Click here to register</a>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
