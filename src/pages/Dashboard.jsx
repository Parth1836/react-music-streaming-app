import React, { useEffect } from "react";
import Header from "../common-components/Header";
import SongsList from "./SongsList";
import AlbumList from "./AlbumList";
import { useNavigate } from "react-router-dom";
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
      <SongsList />
      <AlbumList />
    </>
  );
}

export default Dashboard;
