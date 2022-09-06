import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import {Button} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

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
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              value={tempCategory}
              label="Category"
              onChange={(e) => setTempCategory(e.target.value)}
            >
              <MenuItem value="people">People</MenuItem>
              <MenuItem value="planets">Planets</MenuItem>
              <MenuItem value="species">Species</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="ID"
            type="number"
            min="1"
            value={tempId}
            onChange={(e) => setTempId(e.target.value)}
            InputLabelProps={{
            shrink: true,
          }}
          />
  
          <div>
              <Button variant="contained" color="error" size="large" type="submit" endIcon={<SearchIcon />}>Search</Button>
          </div>
      </form>

      {errorMsg &&
        <div className={style.fadeIn}>
          <img src="https://www.smarttechbuzz.org/wp-content/uploads/2020/11/confused-2.jpg" alt="confused"/>
        </div>
      }

      {isPending &&
        <CircularProgress style={{marginTop: '20px'}}/>
      }

      {
      category==="people" && !errorMsg && !isPending &&
        <div style={{marginTop: '20px'}}>
          <div>Name: {result.name}</div>
          <div>Gender: {result.gender}</div>
          <div>Skin Color: {result.skin_color}</div>
          <div>Hair Color: {result.hair_color}</div>
        </div>
      }
      {
      category==="planets" && !errorMsg && !isPending &&
        <div style={{marginTop: '20px'}}>
          <div>Name: {result.name}</div>
          <div>Climate: {result.climate}</div>
          <div>Diameter: {result.diameter}</div>
          <div>Terrain: {result.terrain}</div>
        </div>
      }
      {
      category==="species" && !errorMsg && !isPending &&
        <div style={{marginTop: '20px'}}>
          <div>Name: {result.name}</div>
          <div>Classification: {result.classification}</div>
          <div>Designation: {result.designation}</div>
          <div>Language: {result.language}</div>
        </div>
      }
    </div>
  )
}



export default App;
