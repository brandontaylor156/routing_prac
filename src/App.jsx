import React from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import style from './App.module.css'


const App = () => {
  const [category, setCategory] = React.useState("people");
  const [id, setId] = React.useState(1);
  const [name, setName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const navigate = useNavigate();
  
  React.useEffect(()=> {
    axios.get(`https://swapi.dev/api/${category}/${id}`)
      .then(response=>{setName(response.data.name)})
  }, [category, id])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    navigate(`/${category}/${id}`);
  }

  return (
    <div className={style.flex}>
      <div>
        <form onSubmit={handleSubmit}>

          <label>Search for:</label>
          <select 
            name="category" 
            onChange={(e)=> {
              setCategory(e.target.value);
              setSubmitted(false);
            }}
            value={category}
            >
            <option value="people">People</option>
            <option value="planets">Planets</option>
          </select>
          
          &nbsp;&nbsp;&nbsp;&nbsp;

          <label>ID:</label>
          <input 
            type="number" 
            min="1" 
            onChange={(e) => { 
              setId(e.target.value);
              setSubmitted(false);
            }} 
            value={id}
            />     
          <button>Search</button>
        </form>
      </div>

      {
      submitted && 
      <div>
        <p>Name: {name}</p>
      </div>
      }
      
    </div>

  );
}



export default App;
