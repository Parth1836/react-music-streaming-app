import { useEffect, useState } from "react";
import Header from "../common-components/Header";

function ArtistSongs() {
  const searchParams = new URLSearchParams(window.location.search);
  const artistId = searchParams.get("artist");
  const [songsList, setSongsList] = useState([]);
  const [artist, setArtist] = useState(null);
  const [playingMp33File, setPlayingMp33File] = useState(null);
  const loadMasterData = () => {
    const tempArtist = localStorage?.getItem("artistList")
      ? JSON.parse(localStorage?.getItem("artistList"))
      : [];
    console.log("artists", tempArtist);
    if (tempArtist && tempArtist?.length) {
      const filteredArtist = tempArtist.find(
        (artist) => artist.id === parseInt(artistId, 10)
      );
      console.log("filteredArtist", filteredArtist);
      setArtist(filteredArtist);
      const tempList = localStorage.getItem("songsList")
        ? JSON.parse(localStorage.getItem("songsList"))
        : [];
      const filteredSongsByArtist = tempList?.filter((song) =>
        filteredArtist.songs.includes(song.id)
      );
      console.log("filteredSongsByArtist", filteredSongsByArtist);
      setSongsList(filteredSongsByArtist);
    }
  };
  useEffect(() => {
    loadMasterData();
  }, []);

  const playSong = (id) => {
    const tempFile = songsList?.find((song) => song.id === id);
    console.log("tempFile", tempFile);
    setPlayingMp33File(tempFile);
  };
  return (
    <>
      <Header />
      <div style={{marginTop:"6%"}}>
      <h2 style={{ padding: "5px 0px 0px 20px", textAlign: "center" }}>
        Songs by Artist - {artist?.artistName}
      </h2>    
        {songsList.length > 0 ? (
          songsList?.map((song) => (
            <div
              onClick={() => playSong(song?.id)}
              style={{
                borderBottom: "1px solid black",
                width: "80%",
                height: "70px",
                margin: "0px 20px",
                backgroundColor: "silver",
                cursor:"pointer"
              }}
            >
              <h3 style={{ margin: "0", padding:"10px" }}>{song?.songName}</h3>
              <h5 style={{ margin: "0", padding:"5px 10px" }}>{song?.artist}</h5>
            </div>
          ))
        ) : (
          <h2 style={{ padding: "5px 0px 0px 20px", textAlign: "center" }}>
            No songs found for {artist?.artistName}
          </h2>
        )}
   
      {playingMp33File && (
        <div
          style={{
            position: "fixed",
            bottom: "0px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "darkgray",
            height: "110px",
          }}
        >
          <div style={{ width: "70%" }}>
            <h3 style={{ margin: "10px", textAlign: "center" }}>
              Playing - {playingMp33File?.songName}
            </h3>
            <audio
              style={{ width: "90%" }}
              id="dsw"
              type="audio/mp3"
              autobuffer="autobuffer"
              controls
              src={playingMp33File?.file}
            />
          </div>
        </div>
      )}
      </div>
      
    </>
  );
}

export default ArtistSongs;
