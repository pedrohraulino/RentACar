

import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {


    return (
        <div className="App">
            <div className="d-flex containerhoe mt-5 mb-5">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default App;
