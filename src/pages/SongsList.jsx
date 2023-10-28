import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import SongPhoto from "../assets/songImage.jpg";

function SongsList() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [playingMp33File, setPlayingMp33File] = useState(null);
  // const [playlistArr, setPlaylistArr] = useState([]);
  // const [selectedPlaylist, setSelectedPlaylist] = useState("");
  // const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    const tempList = JSON.parse(localStorage.getItem("songsList"));
    setSongsList(tempList);
    const tempPlaylist = JSON.parse(localStorage.getItem("playlist"));
    //setPlaylistArr(tempPlaylist);
  }, []);

  const playSong = (id) => {
    const tempFile = songsList?.find((song) => song.id === id);
    console.log("tempFile", tempFile);
    setPlayingMp33File(tempFile.file);
  };

  const handlePlaylistChange = (event) => {
    console.log("value", event.target.value);
  };
  return (
    <>
      <div style={{ borderBottom: "0.5px solid black", margin: "5px 25px" }}>
        <h2 style={{ paddingLeft: "25px" }}>Tracks</h2>
        <Grid style={{ padding: "20px 25px" }} container spacing={2}>
          {songsList && songsList?.length ? (
            songsList?.map((song, idx) => (
              <Grid item xs={12} md={2.4} lg={2.4}>
                <div
                  id={idx}
                  style={{
                    display: "flex",
                    width: "800px",
                    justifyContent: "flex-start",
                    cursor: "pointer",
                  }}
                  onClick={() => playSong(song?.id)}
                >
                  <Card sx={{ width: 250 }}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image={song?.posterUrl}
                      title="green iguana"
                    />
                    <CardContent className="movie-card-content">
                      <Typography
                        style={{ fontWeight: "bold" }}
                        className="typo"
                        gutterBottom
                      >
                        {song?.songName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By - {song?.artist}
                      </Typography>
                      <Button style={{ marginTop: "5px" }} variant="contained">
                        Add To Playlist
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))
          ) : (
            <h2 style={{ paddingLeft: "25px" }}>No Songs Found</h2>
          )}
        </Grid>
        {playingMp33File && (
          <div
            style={{
              position: "fixed",
              bottom: "10px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <audio
              style={{ width: "90%" }}
              id="dsw"
              type="audio/mp3"
              autobuffer="autobuffer"
              controls
              src={playingMp33File}
            />
          </div>
        )}
      </div>
      {/* <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              label="Playlist"
              onChange={handlePlaylistChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button style={{ marginTop: "20px" }} variant="contained">
            Submit
          </Button>
        </Box>
      </Modal> */}
    </>
  );
}

export default React.memo(SongsList);
