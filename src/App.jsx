import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import style from './App.module.css'

const App = () => {

  const [category, setCategory] = React.useState("people");
  const [id, setId] = React.useState(1);
  const [result, setResult] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)

  const navigate = useNavigate();

  React.useEffect(()=> {
    axios.get(`https://swapi.dev/api/${category}/${id}`)
      .then(response=>{setResult(response.data)})
  }, [category, id])

  console.log(result);

  const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/${category}/${id}`);
      setSubmitted(true);
  }
  
  return (
    <div className={style.flex1}>
      <form onSubmit={handleSubmit} className={style.flex2}>
          <div>
              <label>Search For:</label>
              <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubmitted(false);
                    }
                  }
                  value={category}
                  >
                  <option value="people">People</option>
                  <option value="planets">Planets</option>
                  <option value="species">Species</option>
              </select>
          </div>
          <div>
              <label>ID:</label>
              <input
                  type="number"
                  onChange={(e) => {
                    setId(e.target.value);
                    setSubmitted(false);
                    }
                  }
                  value={id}
                  />
          </div>
          <div>
              <button>Search</button>
          </div>
      </form>
      {
      category==="people" && submitted &&
        <>
          <div>Name: {result.name}</div>
          <div>Gender: {result.gender}</div>
          <div>Skin Color: {result.skin_color}</div>
          <div>Hair Color: {result.hair_color}</div>
        </>
      }
      {
      category==="planets" && submitted &&
        <>
          <div>Name: {result.name}</div>
          <div>Climate: {result.climate}</div>
          <div>Diameter: {result.diameter}</div>
          <div>Terrain: {result.terrain}</div>
        </>
      }
      {
      category==="species" && submitted &&
        <>
          <div>Name: {result.name}</div>
          <div>Classification: {result.classification}</div>
          <div>Designation: {result.designation}</div>
          <div>Language: {result.language}</div>
        </>
      }
    </div>
  )
}



export default App;
