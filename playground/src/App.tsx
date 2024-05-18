import React from 'react'
import './app.scoped.css'
import About from './About/index.tsx'
import Home from './Home/index.tsx'

const App = () => {
  return (
    <>
      <div className="app">App</div>
      <Home />
      <About />
    </>
  )
}

export default App
