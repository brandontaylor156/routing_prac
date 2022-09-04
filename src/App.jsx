import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import {useParams} from "react-router"
import style from './App.module.css'


// import React, {useState} from 'react'
// import { useNavigate } from 'react-router-dom';

// const App = () => {
//   const [name, setName] = useState("");
//   const [comment, setComment] = useState("");
//   const navigate = useNavigate();

//   const sendSurvey = (e) => {
//     e.preventDefault();

//     navigate("/results");
//   }

//   return (
//     <form onSubmit={sendSurvey}>
//       <label>Your name:</label>
//       <input type="text" onChange={(e)=> setName(e.target.value)} value={name} />

//       <label>Your comment:</label>
//       <textarea onChange={(e) => setComment(e.target.value)} value={comment} />

//       <input type="submit" value="Submit survey" />
//     </form>

//   )
// }

// const Location = () => {
//   const {city} = useParams();
//   return (
//     <div>
//       <h1>Welcome to {city}!</h1>
//     </div>
//   );
// }

const Home = () => {
  return (
    <div className={style.fadeIn}>
      <h1>Welcome home</h1>
    </div>
  );
}

const Argument = () => {
  const {argument} = useParams();

  return (
    <div className={style.fadeIn}>
      {
      isNaN(argument) ? 
      <h1>The word is: {argument}</h1> :
      <h1>The number is: {argument}</h1>
      }
    </div>
  )
}

const Multiple = () => {
  const {word, color1, color2} = useParams();
  
  return (
    <div className={style.fadeIn}>
      <h1 style={{color:color1, backgroundColor:color2}}>{word}</h1>
    </div>
  )
}



function App() {
  return (
  
    <div>
      {/* <p>
        <Link to="/location/seattle">Seattle</Link>
         | 
        <Link to="/location/chicago">Chicago</Link>
         | 
        <Link to="/location/burbank">Burbank</Link>
      </p> */}
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/:argument" element={<Argument/>}/>
        <Route path="/:word/:color1/:color2" element={<Multiple/>} />
        {/* <Route path="/location/:city" element={<Location />} /> */}
      </Routes>
      
    </div>

  );
}



export default App;
