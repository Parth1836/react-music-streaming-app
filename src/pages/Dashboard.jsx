import React, { useEffect } from "react";
import Header from "../common-components/Header";
import SongsList from "./SongsList";
import AlbumList from "./AlbumList";
import { useNavigate } from "react-router-dom";
import ArtistList from "./ArtistList";
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("clientUserToken");
    if (!userToken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{marginTop:"6%"}}>
      <SongsList />
      <ArtistList />
      </div>   
      {/* <AlbumList /> */}
    </>
  );
}

export default Dashboard;
