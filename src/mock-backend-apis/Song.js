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
      const songIdsArr = songsList?.map((song) => song.id);
      const nextSongId = Math.max(...songIdsArr) + 1;
      console.log("15 nextSongId", nextSongId);
      body.songObject.id = nextSongId;
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

export const deleteSong = (body) => {
  console.log("31 songId", body?.songId);
  const serverToken = localStorage.getItem("serverToken");
  console.log("6 token match", body?.token, serverToken);
  if (body?.token === serverToken) {
    const songsList = localStorage.getItem("songsList")
      ? JSON.parse(localStorage.getItem("songsList"))
      : [];
    if (songsList?.length > 0) {
      let newSongsList = songsList?.filter((song) => song.id !== body?.songId);
      console.log("41 newSongsList", newSongsList);
      localStorage.setItem("songsList", JSON.stringify(newSongsList));
      return newSongsList;
    }
  } else {
    return false;
  }
};
