import { useState } from "react";
import Header from "../common-components/Header";
import Song from "../upload/Song";
import { Button } from "@mui/material";
import Artist from "../upload/Artist";

function AdminPage() {
  const [uploadType, setUploadType] = useState("");

  const handleUpload = (type) => {
    setUploadType(type);
  };

  return (
    <>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "25px", marginTop:"6%" }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={() => handleUpload("song")}
        >
          Upload Song
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={() => handleUpload("artist")}
        >
          Add Artist
        </Button>
      </div>
      {uploadType === "song" && <Song />}
      {uploadType === "artist" && <Artist />}
    </>
  );
}

export default AdminPage;
