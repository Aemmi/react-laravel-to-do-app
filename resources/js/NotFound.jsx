import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Header from './components/Header';

function NotFound() {
    return (
        <div>

            <div className="row my-5">
                <div className="col-md-8 p-3 mt-4 m-auto">
                    <div className='container'>
                        <h4 className='text-center'>Oooops! Page not found</h4>
                        <div className='row'>
                            <div className='col-md-8 m-auto text-center'>
                                <p>Page not found!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default NotFound;
