import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar'



function App() {
    return (
        <Router>
            <div className='app'>
        <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            
            </div>
        </Router>
    )
}

export default App;
