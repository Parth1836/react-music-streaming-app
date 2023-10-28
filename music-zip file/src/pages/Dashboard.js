import React, { useState } from "react";
import testfile from "../mp3 file/test.mp3";
import Header from "../common-components/Header";
import SongsList from "./SongsList";
import AlbumList from "./AlbumList";
function Dashboard() {
  const [mp3File, setmp3File] = useState(null);
  const handleFileChange = (event) => {
    console.log("event", event.target.files[0]);
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const result = e.target.result;
      var base64 = result.substr(result.indexOf(',')+1)      
      console.log("dataUrl to base64: " + base64);
      setmp3File(result)
      // const arrayBuffer = base64ToBuffer(base64);
      // console.log("arrayBuffer", arrayBuffer);
    };
  }

  // const base64ToBuffer = (base64Url)=> {
  //     console.log('array buffer from base64Url:', base64Url);
  
  //     let base64 = base64Url.replaceAll('-', '+');
  //     base64 = base64.replaceAll('_', '/');
  //     const binaryString = window.atob(base64);
  //     const length = binaryString.length;
  //     const bytes = new Uint8Array(length);
  //     for (let i = 0; i < length; i++) {
  //         bytes[i] = binaryString.charCodeAt(i);
  //     }
  
  //     console.log('array buffer:', bytes.buffer);
  //     return bytes.buffer;
  // }

  return (
    <>
      <Header />
      {/* <h1>Dashboard</h1>
      <input
        type="file"
        id="sound"
        // accept="audio/mp3"
        onChange={(event) => handleFileChange(event)}
      />
      <div
        style={{
          width: "50%",
          margin: "auto",
          border: "1px solid black",
          height: "100px",
        }}
      >
        <audio
          id="dsw"
          type="audio/mp3"
          autobuffer="autobuffer"
          controls
          src={mp3File}
        />
      </div> */}
      <SongsList />
      <AlbumList />
    </>
  );
}

export default Dashboard;
