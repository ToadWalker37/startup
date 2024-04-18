import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './index.css'
import './about.css'
import Home from './Home.jsx';
import About from './About.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <div className="app">
        <nav>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/home">Home</NavLink>
        </nav>

        <main>
          <Routes>
            <Route
              path='/'
              element={ <Home/> }
              exact
            />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </>
  )
}

export default App