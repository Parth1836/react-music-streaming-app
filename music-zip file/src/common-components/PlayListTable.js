function PlayListTable(props) {
    const {playlist} = props;
    return (
        <>
        <div
          style={{
            width: "50%",
            height: "300px",
            margin: "auto",
            border: "1px solid black",
            backgroundColor: "antiquewhite",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              id="audio-file"
              accept="audio/mp3"
              // onChange={(event) => uploadFile(event)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {fileObject?.id && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <h2>Uploaded File details: </h2>
                  <span>File Name</span> : {fileObject.fileName} <br />
                  <br />
                  <span>Song Name</span> :{" "}
                  <input
                    type="text"
                    onChange={(e) => handleChange(e.target.value, "songName")}
                  />
                  <br />
                  <br />
                  <span>Artist Name</span> :{" "}
                  <input
                    type="text"
                    onChange={(e) => handleChange(e.target.value, "artist")}
                  />
                  <br />
                  <button type="submit" onClick={handleSubmit}>
                    Upload File
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
        {playlist && playlist.length && (
          <table
            style={{
              width: "50%",
              margin: "20px auto 0px auto",
              textAlign: "center",
            }}
          >
            <tr>
              <th>Id</th>
              <th>Playlist Name</th>
              <th></th>
            </tr>
            {playlist &&
              playlist?.map((song) => (
                <tr>
                  <td>{song.id}</td>
                  <td>{song.songName}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
          </table>
        )}
      </>
    )
}

export default PlayListTable;