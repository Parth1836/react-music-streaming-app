import { updateSongsForArtist } from "./Artist";

export const uploadSong = (body) => {
  console.log("4 body");
  const serverToken = localStorage.getItem("serverToken");
  console.log("6 token match", body?.token, serverToken);
  if (body?.token === serverToken) {
    const songsList = localStorage.getItem("songsList")
      ? JSON.parse(localStorage.getItem("songsList"))
      : [];
    let newSongsList = [];
    if (songsList?.length > 0) {
      body.songObject.id = songsList?.length + 1;
      newSongsList = [...songsList, body.songObject];
    } else {
      body.songObject.id = 1;
      newSongsList.push(body.songObject);
    }
    updateSongsForArtist(body?.artistArr, body?.songObject?.id);
    localStorage.setItem("songsList", JSON.stringify(newSongsList));
    return newSongsList;
  } else {
    return false;
  }
};
