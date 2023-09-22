import axios from "axios";

function Logout()
{
    const userToken = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    // Fetch todos when the component mounts
    axios.post('/api/todos/logout')
    .then(response => {
        localStorage.removeItem('token');
        location.assign('/')
    })
    .catch(error => {
        console.error(error);
    });
}

export default Logout;
