import { useEffect, useState } from "react";
import Header from "../common-components/Header";
import AddAlbum from "./AddAlbum";
import PlayListTable from "../common-components/PlayListTable";

function AdminPage() {
  const [songsList, setSongsList] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [uploadType, setUploadType] = useState("");
  const [fileObject, setFileObject] = useState({
    id: "",
    fileName: "",
    file: null,
    songName: "",
    artist: "",
  });

  useEffect(() => {
    const tempList = JSON.parse(localStorage.getItem("songsList"));
    console.log("tempList", tempList);
    setSongsList(tempList);
  }, []);

  const handleUpload = (type) => {
    setUploadType(type);
  };

  const uploadFile = (event) => {
    console.log("event", event.target.files[0]);
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log("result", e.target.result);
      const result = e.target.result;

      const songsList = JSON.parse(localStorage.getItem("songsList"));
      const songObject = {
        id: songsList?.length ? songsList?.length + 1 : 1,
        fileName: file.name,
        file: result,
        songName: "",
        artist: "",
      };
      setFileObject(songObject);
    };
  };

  const handleSubmit = () => {
    const songsList = JSON.parse(localStorage.getItem("songsList"));
    let newSongsList = [];
    if (songsList?.length > 0) {
      newSongsList = [...songsList, fileObject];
    } else {
      newSongsList.push(fileObject);
    }
    localStorage.setItem("songsList", JSON.stringify(newSongsList));
    setSongsList(newSongsList);
    alert("Congratulations! Song is Uploaded.");
    resetFile();
  };

  const handleChange = (value, type) => {
    let tempObj = fileObject;
    if (type === "songName") {
      tempObj.songName = value;
    } else {
      tempObj.artist = value;
    }
    setFileObject(tempObj);
    console.log("tempobj", tempObj);
  };

  const resetFile = () => {
    let file = document.querySelector("#audio-file");
    console.log("file value", file);
    file.value = "";
    setFileObject(null);
  };
  return (
    <>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "25px" }}
      >
        <button className="admin-btns" onClick={() => handleUpload("song")}>
          Upload Song
        </button>
        <button className="admin-btns" onClick={() => handleUpload("album")}>
          Upload Album
        </button>
        <button className="admin-btns" onClick={() => handleUpload("playlist")}>
          Add Playlist
        </button>
      </div>
      {uploadType === "song" && (
        <>
          <div
            style={{
              width: "50%",
              height: "300px",
              margin: "auto",
              border: "1px solid black",
              backgroundColor: "antiquewhite",
              paddingTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                id="audio-file"
                accept="audio/mp3"
                onChange={(event) => uploadFile(event)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {fileObject?.id && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <h2>Uploaded File details: </h2>
                    <span>File Name</span> : {fileObject.fileName} <br />
                    <br />
                    <span>Song Name</span> :{" "}
                    <input
                      type="text"
                      onChange={(e) => handleChange(e.target.value, "songName")}
                    />
                    <br />
                    <br />
                    <span>Artist Name</span> :{" "}
                    <input
                      type="text"
                      onChange={(e) => handleChange(e.target.value, "artist")}
                    />
                    <br />
                    <button type="submit" onClick={handleSubmit}>
                      Upload File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {songsList && songsList.length && (
            <table
              style={{
                width: "50%",
                margin: "20px auto 0px auto",
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
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
            </table>
          )}
        </>
      )}
      {uploadType === "album" && <AddAlbum /> }
      {uploadType === "playlist" && (
        <PlayListTable playlist={playlist}/>
      )}
    </>
  );
}

export default AdminPage;
