import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import style from './App.module.css'

const App = () => {

  const [category, setCategory] = React.useState("people");
  const [tempCategory, setTempCategory] = React.useState("people");

  const [id, setId] = React.useState(1);
  const [tempId, setTempId] = React.useState(1);

  const [result, setResult] = React.useState({})
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isPending, setIsPending] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(()=> {
    axios.get(`https://swapi.dev/api/${category}/${id}`)
      .then(response=>{
        setResult(response.data);
        setErrorMsg(null);
        setIsPending(false);
      })
      .catch(error=> {
        setErrorMsg("Can't find that shi bruh.")
        setIsPending(false);
      })

      
  }, [category, id, isPending])

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsPending(true);
      navigate(`/${tempCategory}/${tempId}`);
      setCategory(tempCategory);
      setId(tempId);
  }
  
  return (
    <div className={style.flex1}>
      <form onSubmit={handleSubmit} className={style.flex2}>
          <div>
              <label>Search For:</label>
              <select
                  onChange={(e) => {
                    setTempCategory(e.target.value);
                    }
                  }
                  value={tempCategory}
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
                  min="1"
                  onChange={(e) => {
                    setTempId(e.target.value);
                    }
                  }
                  value={tempId}
                  />
          </div>
          <div>
              <button>Search</button>
          </div>
      </form>

      {errorMsg &&
        <div className={style.fadeIn}>
          <img src="https://www.smarttechbuzz.org/wp-content/uploads/2020/11/confused-2.jpg" alt="confused"/>
        </div>
      }

      {isPending &&
        <img src="https://i.gifer.com/origin/3f/3face8da2a6c3dcd27cb4a1aaa32c926_w200.gif" alt="loading" style={{width: '100px', height: '100px'}}/>
      }

      {
      category==="people" && !errorMsg && !isPending &&
        <>
          <div>Name: {result.name}</div>
          <div>Gender: {result.gender}</div>
          <div>Skin Color: {result.skin_color}</div>
          <div>Hair Color: {result.hair_color}</div>
        </>
      }
      {
      category==="planets" && !errorMsg && !isPending &&
        <>
          <div>Name: {result.name}</div>
          <div>Climate: {result.climate}</div>
          <div>Diameter: {result.diameter}</div>
          <div>Terrain: {result.terrain}</div>
        </>
      }
      {
      category==="species" && !errorMsg && !isPending &&
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
