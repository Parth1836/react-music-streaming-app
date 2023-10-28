import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

function AddAlbum() {
  const  [albumList, setAlbumList] = useState([]);
  const [albumObj, setAlbumObj] = useState({
    id: "",
    albumName: "",
    songsList: [],
  });
  const [albumSongList, setAlbumSongList] = useState([]);
  const [count, setCount] = useState(0);

useEffect(()=> {
  const tempArr = JSON.parse(localStorage.getItem("albumList"));
  setAlbumList(tempArr);
}, [])

  const handleChange = (value) => {
    let tempObj = albumObj;
    tempObj.albumName = value;
    setAlbumObj(tempObj);
  };

  const handleSubmit = () => {
    if(albumObj.albumName) {
      const albumList = JSON.parse(localStorage.getItem("albumList"));
      let newAlbumList = [];
      if (albumList?.length > 0) {
        newAlbumList = [...albumList, albumObj];
      } else {
        newAlbumList.push(albumObj);
      }
      localStorage.setItem("albumList", JSON.stringify(newAlbumList));
      alert("Congratulations! Album is added.");
      setAlbumList(newAlbumList);
    }else {
      alert("Please enter album name");
    }
   
    // resetFile();
  };

  const uploadFile = (event) => {
    console.log("event", event.target.files[0]);
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const result = e.target.result;

      const songsList = JSON.parse(localStorage.getItem("songsList"));
      const songObject = {
        id: Math.random(),
        fileName: file.name,
        file: result,
        songName: "",
        artist: "",
      };
      let tempAlbumObj = albumObj;
      let tempArr = albumSongList;
      tempAlbumObj.fileName = file.name;
      tempAlbumObj.songsList.push(songObject.id);
      setAlbumObj(tempAlbumObj);

      console.log(tempArr);
      tempArr.push(songObject);
      console.log("56", tempArr);
      setTimeout(() => {
        setAlbumSongList(tempArr);
      }, 5000);
      
    };
    setCount(count + 1);
    console.log("60");
  };

  return (
    <>
    <div
      style={{
        width: "50%",
        height: "300px",
        margin: "auto",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "antiquewhite",
        paddingTop: "15px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h2>Add Album details: </h2>
          <span>Album Name *</span> :{" "}
          <input type="text" onChange={(e) => handleChange(e.target.value)} />{" "}
          <br />
          <span style={{ paddingRight: "30px" }}>Add Songs: </span>
          {/* <input
            type="file"
            id="audio-file"
            accept="audio/mp3"
            onChange={(event) => uploadFile(event)}
          /> */}
          <br />
          <button type="submit" onClick={handleSubmit}>
            Create Album
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddAlbum;
