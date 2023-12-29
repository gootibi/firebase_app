import { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  // Update Title
  const [updateTitle, setUpdateTitle] = useState('');

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const updateMovieTitle = async (id) => {
    const movieRef = doc(db, 'movies', id);
    try {
      await updateDoc(movieRef, {
        title: updateTitle
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }
    const filesFolderRef = ref(storage, `projectFile/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Auth />

      <br />

      <div>
        <input
          type='text'
          placeholder='Movie title...'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type='number'
          placeholder='Release Date...'
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type='checkbox'
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Receive An Oscar</label>
        <br />
        <br />
        <button
          type='button'
          onClick={onSubmitMovie}
        >Submit movie</button>
      </div>

      <div>
        {movieList.map(movie => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}> {movie.title} </h1>
            <p> Datte: {movie.releaseDate}</p>
            <br />
            <button onClick={() => deleteMovie(movie.id)} > Delete </button>
            <br />
            <br />
            <input onChange={(e) => setUpdateTitle(e.target.value)} type='text' placeholder='Update Title...' />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>
          Upload File
        </button>
      </div>
    </div>
  );
}

export default App;
