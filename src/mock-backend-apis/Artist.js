export const updateSongsForArtist = (artistArr, songId) => {
  //console.log("2 updateArtist", artistArr, songId);
  const tempArtist = localStorage?.getItem("artistList")
    ? JSON.parse(localStorage?.getItem("artistList"))
    : [];
  // console.log("artists", tempArtist);
  if (tempArtist) {
    const newArtistList = [];
    tempArtist?.forEach((artist) => {
      if (artistArr?.includes(artist?.id)) {
        artist.songs.push(songId);
      }
      newArtistList.push(artist);
    });
    // console.log("12 artist", newArtistList, tempArtist);
    localStorage?.setItem("artistList", JSON.stringify(newArtistList));
    return true;
  }
};

export const createArtist = (body) => {
  console.log("4 body");
  const serverToken = localStorage.getItem("serverToken");
  console.log("6 token match", body?.token, serverToken);
  if (body?.token === serverToken) {
    const artistsList = localStorage.getItem("artistList")
      ? JSON.parse(localStorage.getItem("artistList"))
      : [];
    let newArtistsList = [];
    if (artistsList?.length > 0) {
      const songIdsArr = artistsList?.map((song) => song.id);
      const nextSongId = Math.max(...songIdsArr) + 1;
      console.log("15 nextSongId", nextSongId);
      body.artistObj.id = nextSongId;
      newArtistsList = [...artistsList, body.artistObj];
    } else {
      body.songObject.id = 1;
      newArtistsList.push(body.artistObj);
    }
    localStorage.setItem("artistList", JSON.stringify(newArtistsList));
    return newArtistsList;
  } else {
    return false;
  }
};

export const deleteArtist = (body) => {
  console.log("31 songId", body?.artistId);
  const serverToken = localStorage.getItem("serverToken");
  console.log("6 token match", body?.token, serverToken);
  if (body?.token === serverToken) {
    const artistsList = localStorage.getItem("artistList")
      ? JSON.parse(localStorage.getItem("artistList"))
      : [];
    if (artistsList?.length > 0) {
      let newArtistsList = artistsList?.filter((song) => song.id !== body?.artistId);
      console.log("41 newArtistsList", newArtistsList, artistsList);
      localStorage.setItem("artistList", JSON.stringify(newArtistsList));
      return newArtistsList;
    }
  } else {
    return false;
  }
};
