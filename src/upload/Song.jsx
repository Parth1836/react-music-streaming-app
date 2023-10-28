import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { deleteSong, uploadSong } from "../mock-backend-apis/Song";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedArtists, theme) {
  return {
    fontWeight:
      selectedArtists.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Song() {
  const [songsList, setSongsList] = useState([]);
  const [posterUrl, setPosterUrl] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const [songName, setSongName] = useState("");
  const [artistNames, setArtistNames] = useState("");
  const [artistIds, setArtistIds] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [songFile, setSongFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const loadMasterData = () => {
    const tempArtist = localStorage?.getItem("artistList");
    console.log("artists", JSON.parse(tempArtist));
    if (!tempArtist) {
      setArtistList([]);
    } else {
      setArtistList(JSON.parse(tempArtist));
    }
    const tempList = JSON.parse(localStorage.getItem("songsList"));
    console.log("tempList", tempList);
    setSongsList(tempList);
  };
  useEffect(() => {
    loadMasterData();
  }, []);

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log("result", e.target.result);
      const result = e.target.result;
      setSongFile(result);
    };
  };

  const handleChange = (event) => {
    const tempArr = event.target.value;
    setSelectedArtists(tempArr);

    const tempArtistNames = tempArr?.map((artist) => artist.artistName);
    setArtistNames(tempArtistNames.join(", "));

    const tempArtistIds = tempArr?.map((artist) => artist.id);
    setArtistIds(tempArtistIds);
  };

  const handleUpload = () => {
    if (songName && songFile && artistIds?.length > 0 && posterUrl) {
      const token = localStorage.getItem("clientUserToken");
      const songObject = {
        file: songFile,
        songName: songName,
        posterUrl,
        artist: artistNames,
      };
      const artistArr = artistIds;
      const body = {
        token,
        songObject,
        artistArr,
      };
      // console.log("138 body", body);
      const res = uploadSong(body);
      // console.log("129 res", res);
      if (res.length > 0) {
        setSongsList(res);
        resetState();
      } 
      // else {
      //   setError("Please try to upload your song again");
      // }
    } else {
      setError(
        "Please fill all mandatory fields like Song Name, Song Poster URL, Select File & Artist"
      );
    }
  };

  const resetState = () => {
    let file = document.querySelector("#contained-button-file");
    console.log("file value", file);
    file.value = "";
    setArtistIds([]);
    setArtistNames("");
    setSelectedArtists([]);
    setSongFile(null);
    setSongName("");
    setSelectedFile(null);
    setPosterUrl("");
  };

  const handleDeleteSong = (songId) => {
    console.log("77 delete", songId);
    const token = localStorage.getItem("clientUserToken");
    const body = {
      token,
      songId,
    };
    const res = deleteSong(body);
    if (res?.length > 0) {
      setSongsList(res);
    } else {
      alert("Some error occured!");
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{ width: "50%", height: "400px" }}
      >
        <Typography variant="h6">Song Upload</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "75%",
          }}
        >
          <Typography style={{ width: "30%" }}>Song Name </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="songName"
            label="Song Name"
            name="songName"
            autoComplete="songName"
            onChange={(e) => setSongName(e.target.value)}
            value={songName}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "75%",
          }}
        >
          <Typography style={{ width: "30%" }}>Poster URL</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="songImage"
            label="Poster URL"
            name="songImage"
            autoComplete="songImage"
            onChange={(e) => setPosterUrl(e.target.value)}
            value={posterUrl}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "75%",
          }}
        >
          <Typography style={{ width: "24%" }}>Select File</Typography>
          <input
            accept="audio/mp3"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.button}
            >
              Choose File
            </Button>
          </label>
        </div>
        {selectedFile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "75%",
              marginTop: "15px",
            }}
          >
            <Typography style={{ width: "24%" }}>Selected File</Typography>
            <Typography>{selectedFile.name}</Typography>
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            marginTop: "15px",
          }}
        >
          <Typography style={{ width: "20%" }}>Artist</Typography>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Artist</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Artist"
              multiple
              value={selectedArtists}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {artistList?.map((artist) => (
                <MenuItem
                  key={artist.id}
                  value={artist}
                  style={getStyles(artist.name, selectedArtists, theme)}
                >
                  {artist.artistName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ width: "25%", marginTop: "20px" }}
          onClick={handleUpload}
        >
          Upload Song
        </Button>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "red" }}>{error}</h3>
        </div>
      </Paper>
      {songsList && songsList.length && (
        <>
          <h2 style={{ textAlign: "center" }}>Songs List</h2>
          <table
            style={{
              width: "90%",
              margin: "10px auto",
              textAlign: "center",
            }}
          >
            <tr>
              <th>Id</th>
              <th>Song Name</th>
              <th>Artist</th>
              <th></th>
            </tr>
            {songsList &&
              songsList?.map((song) => (
                <tr>
                  <td>{song.id}</td>
                  <td>{song.songName}</td>
                  <td>{song.artist}</td>
                  <td>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ width: "40%", margin: "10px" }}
                      onClick={() => handleDeleteSong(song.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </table>
        </>
      )}
    </Container>
  );
}

export default Song;
