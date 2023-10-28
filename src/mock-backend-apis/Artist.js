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
