import { validateUser } from "../config/Auth";
import handleLogout from "../config/Logout";
function Header()
{
    var isLoggedIn = false;
    if(validateUser == true){
        isLoggedIn = true;
    }else{
        isLoggedIn = false;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">ToDO App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li>
                                {isLoggedIn ? (
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                                ) : (
                                <a className="nav-link" href="/login">Login</a>
                                )}
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
