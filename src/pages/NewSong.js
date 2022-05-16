import React from "react";
import { post } from "../authService/authService";

const NewSong = () => {
  const [name, setName] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [image, setImage] = React.useState("");

  function handleFileUpload(e) {
    //create FormData

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    post("/image-upload", uploadData)
      .then((results) => {
        console.log("This is the image path", results.data);
        setImage(results.data);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  function create(e) {
    e.preventDefault();

    post("/new-song", {
      name: name,
      artist: artist,
      albumPic: image,
    })
      .then((results) => {
        console.log("Results", results.data);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  return (
    <div>
      <h2>Create a new song</h2>
      <form onSubmit={create}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Artist</label>
        <input value={artist} onChange={(e) => setArtist(e.target.value)} />
        <label>Album Pic</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default NewSong;
