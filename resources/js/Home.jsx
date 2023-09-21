import React, { useEffect } from 'react';
import Header from './components/Header';
import Login from './Login';
import { setDocumentTitle } from './utils/setDocumentTitle';

function Home() {
    useEffect(() => {
        setDocumentTitle('Todo App | Welcome');
    }, []);

    return (
        <div>
            <Header />

            <Login />

        </div>
    );
}

export default Home;
