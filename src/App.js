import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import './App.css'



function App() {
    return (
        <Router>
            <div className='app'>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
        <Footer />
            </div>
        </Router>
    )
}

export default App;
