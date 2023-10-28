export const createPlaylist = (playlistName) => {
  console.log("playlistname", playlistName);
  const playlists = JSON.parse(localStorage.getItem("playlists"));
  let newPlaylists = [];
  const playlistObj = {
    id: playlists?.length ? playlists?.length + 1 : 1,
    songList: [],
  };
  if (playlists?.length > 0) {
    newPlaylists = [...playlists, playlistObj];
  } else {
    newPlaylists.push(playlistObj);
  }
  localStorage.setItem("playlists", JSON.stringify(newPlaylists));
  return playlistObj.id
};
