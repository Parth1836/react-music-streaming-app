import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import AlbumImage from "../assets/albumImage.jpeg";

function AlbumList() {
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    let tempArr = JSON.parse(localStorage.getItem("albumList"));
    setAlbumList(tempArr);
  },[]);

  return (
    <>
      <div style={{borderBottom: "0.5px solid black", margin:"5px 25px"}}>
        <h2 style={{ paddingLeft: "25px" }}>Albums</h2>
        <Grid style={{ padding: "20px 25px" }} container spacing={2}>
          {albumList && albumList?.length ? albumList?.map((song, idx) => (
            <Grid item xs={12} md={2.4} lg={2.4}>
              <div
                id={idx}
                style={{
                  display: "flex",
                  width: "800px",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                }}
              >
                <Card sx={{ width: 250 }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={AlbumImage}
                    title="green iguana"
                  />
                  <CardContent className="movie-card-content">
                    <Typography className="typo" gutterBottom>
                      {song?.albumName}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          )):(
            <h2 style={{ paddingLeft: "25px" }}>No Album Found</h2>
          )}
        </Grid>
      </div>
    </>
  );
}

export default React.memo(AlbumList);
