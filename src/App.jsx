import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import banana from './App.module.css'

const Home = () => {
  return (
    <div className={banana.fadeIn}>
      <h1 style={{color: "red"}}>Home Component</h1>
      <Link to={"/about"}>Go to about</Link>
    </div>
  );
}

const About = () => {
  return (
    <div className={banana.fadeIn}>
      <h1 style={{color: "blue"}}>About Component</h1>
      <Link to={"/"}>Go home</Link>
    </div>
  )
}

function App() {
  return (
    <>
      <div>
        <h1>Routing Example</h1>
        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
