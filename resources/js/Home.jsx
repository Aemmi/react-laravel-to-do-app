import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Header from './components/Header';
import Login from './Login';

function Home() {
    return (
        <div>
            <Header />

            <Login />

        </div>
    );
}

export default Home;
