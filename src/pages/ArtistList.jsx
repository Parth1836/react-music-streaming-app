import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ArtistList() {
  const navigate = useNavigate();
  const [artistList, setArtistList] = useState([]);
  useEffect(() => {
    const tempArtistList = localStorage.getItem("artistList")
      ? JSON.parse(localStorage.getItem("artistList"))
      : [];
    setArtistList(tempArtistList);
  }, []);
  return (
    <div style={{ borderBottom: "0.5px solid black", margin: "5px 25px" }}>
      <h2 style={{ paddingLeft: "25px" }}>Artists</h2>
      <Grid style={{ padding: "20px 25px" }} container spacing={2}>
        {artistList && artistList?.length ? (
          artistList?.map((artist, idx) => (
            <Grid item xs={12} md={2.4} lg={2.4}>
              <div
                id={idx}
                style={{
                  display: "flex",
                  width: "800px",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/artist-songs?artist=" + artist?.id)}
              >
                <Card sx={{ width: 250 }}>
                  <CardMedia
                    sx={{ height: 250 }}
                    image={artist?.artistImg}
                    title="green iguana"
                  />
                  <CardContent className="movie-card-content">
                    <Typography
                      style={{ fontWeight: "bold" }}
                      className="typo"
                      gutterBottom
                    >
                      {artist?.artistName}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))
        ) : (
          <h2 style={{ paddingLeft: "25px" }}>No Artists Found</h2>
        )}
      </Grid>
    </div>
  );
}

export default ArtistList;
