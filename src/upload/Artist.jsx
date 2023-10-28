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
import { createArtist, deleteArtist } from "../mock-backend-apis/Artist";

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

function Artist() {
  // const [songsList, setSongsList] = useState([]);
  const classes = useStyles();
  const [artistName, setArtistName] = useState("");
  const [artistImg, setArtistImg] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [error, setError] = useState("");

  const loadMasterData = () => {
    const tempArtist = localStorage?.getItem("artistList");
    console.log("artists", JSON.parse(tempArtist));
    if (!tempArtist) {
      setArtistList([]);
    } else {
      setArtistList(JSON.parse(tempArtist));
    }
  };
  useEffect(() => {
    loadMasterData();
  }, []);

  const handleSaveArtist = () => {
    if (artistName && artistImg) {
      const token = localStorage.getItem("clientUserToken");
      const artistObj = {
        artistName: artistName,
        artistImg,
        status: true,
        songs: [],
      };
      const body = {
        token,
        artistObj,
      };
      console.log("138 body", body);
      const res = createArtist(body);
      console.log("129 res", res);
      if (res.length > 0) {
        setArtistList(res);
        resetState();
      } else {
        setError("Please try to upload your song again");
      }
    } else {
      setError("Please fill all mandatory fields like Artist Name, Image URL.");
    }
  };

  const resetState = () => {
    setArtistName("");
    setArtistImg("");
  };

  const handleArtistDelete = (artistId) => {
    console.log("154 delete", artistId);
    const token = localStorage.getItem("clientUserToken");
    const body = {
      token,
      artistId,
    };
    const res = deleteArtist(body);
    if (res?.length > 0) {
      setArtistList(res);
    } 
    // else {
    //   alert("Some error occured!");
    // }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{ width: "50%", height: "350px" }}
      >
        <Typography variant="h6">Add Artist</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "75%",
          }}
        >
          <Typography style={{ width: "30%" }}>Artist Name </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="artistName"
            label="Artist Name"
            name="artistName"
            autoComplete="artistName"
            onChange={(e) => setArtistName(e.target.value)}
            value={artistName}
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
            id="artistImage"
            label="Poster URL"
            name="artistImage"
            autoComplete="artistImage"
            onChange={(e) => setArtistImg(e.target.value)}
            value={artistImg}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ width: "25%", marginTop: "20px" }}
          onClick={handleSaveArtist}
        >
          Add Artist
        </Button>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "red" }}>{error}</h3>
        </div>
      </Paper>
      {artistList && artistList.length && (
        <>
          <h2 style={{ textAlign: "center" }}>Artists List</h2>
          <table
            style={{
              width: "90%",
              margin: "10px auto",
              textAlign: "center",
            }}
          >
            <tr>
              <th>Sr No.</th>
              <th>Artist Name</th>
              <th></th>
            </tr>
            {artistList &&
              artistList?.map((artist, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{artist.artistName}</td>
                  <td>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ width: "40%", margin: "10px" }}
                      onClick={() => handleArtistDelete(artist.id)}
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
export default Artist;
