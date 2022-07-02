import './App.css';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyricsData, setLyrics] = useState("");



  const handleSongChange = (event) => {
    setSong(event.target.value)
  }
  const handleArtistChange = (event) => {
    setArtist(event.target.value)
  }
  function searchLyrics() {
    if (artist === "" || song === "") {
      return;
    }
    console.log(lyricsData.lyrics)
  }
  // console.log("checking", lyricsData)

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>Snap Lyrics</h1>
          <form id="form" autoComplete="off">

            <TextField className='input'
              id="outlined-name"
              label="Song"
              value={song}
              onChange={handleSongChange}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Artist"
              value={artist}
              onChange={handleArtistChange}
            />
        f
            <button
              onClick={(e) => {
                e.preventDefault();
                fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`, requestOptions)
                  .then(response => {
                    console.log(response)
                    return response.json()
                  })
                  .then(result => {
                    console.log("song JSON data", result)
                    console.log(result);
                    setLyrics(result.lyrics)

                    searchLyrics(result.lyrics)

                  })
                  .catch(error => console.log('error', error));
              }
              }

            >Search</button>
          </form>
          <Grid container
            justifyContent={"center"}
            alignItems="center"><Grid item width="500px"><Typography color={"black"} fontSize={"15px"} className='lyricsGrid'>{lyricsData}</Typography></Grid></Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
