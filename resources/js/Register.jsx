import react, {useState} from 'react';
import axios from 'axios';

function Register() {

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
        var email = form.email;
        var password = form.password;
        var cpassword = form.cpassword;
        var name = form.name;

        const credentials = {
            email: email,
            password: password,
            name: form.name
        };

        if(name.length < 3){
            document.getElementById('name-error').innerHTML = 'Name should not be less than 3 characters long!';
        }else{
            document.getElementById('name-error').innerHTML = '';
        }

        if(password.length < 8){
            document.getElementById('password-error').innerHTML = 'Password length should not be less than 8 characters long!';
        }else{
            document.getElementById('password-error').innerHTML = '';
        }

        if(password != cpassword){
            document.getElementById('password-error').innerHTML = 'Password does not match!';
        }else{
            document.getElementById('password-error').innerHTML = '';
        }

        axios.post('/api/auth/register', credentials)
        .then(response => {
            console.log(response.data.message);
            // Handle the successful response data
            if(response.data.status == 'success'){
                location.assign('/login');
            }else if(response.data.status == 'validation'){
                alert(response.data.message);
            }else{
                alert(response.data.message);
            }

        })
        .catch(error => {
            // Handle any errors
            console.error("my error " + error);
        });
    }

    return (
        <div>

            <div className="row my-5">
                <div className="col-md-8 p-3 mt-4 m-auto">
                    <div className='container'>
                        <h4 className='text-center'>User Register</h4>

                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                            <input type="email" name="email" onChange={handleChange} className="form-control" id="email"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                            <input type="text" name="name" onChange={handleChange} className="form-control" id="name"/>
                            <i className="text-warning" id="name-error"></i>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                            <input type="password" name="password" onChange={handleChange} className="form-control" id="password"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Confirm Password</label>
                            <div class="col-sm-10">
                            <input type="password" name="cpassword" onChange={handleChange} className="form-control" id="cpassword"/>
                            <i className="text-warning" id="password-error"></i>
                            </div>
                        </div>

                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Sign Up</button>

                    </div>
                    <div className='row text-center p-3'>
                        <a href='/login'>Login here</a>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;
