import React from 'react'
import './app.scoped.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Home from './Home/index.tsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import About from './About/index.tsx'

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
