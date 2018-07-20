import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  // initialize the state of our app
  constructor(){
    console.log("constructor");
    super();
    this.state = {
      photos: []
    }
  }; 

  componentDidMount() {
    // create the reference to the 'photos' collection in our firestore
    const photosRef = firebase.firestore().collection('photos');
    // get all 'photos' documents from the firestore
    photosRef.get().then((querySnapshot) => {
      let reads = [];
      // extract meta data for each 'photos' document
      querySnapshot.forEach(function(photo){
        var storage = firebase.storage();
        var pathReference = storage.ref(photo.data().filename);
        // convert the filenames into downloadURLs
        var promise = pathReference.getDownloadURL().then(function(url) {
          return ({id: photo.id, url: url, filename: photo.data().filename})
        })
        reads.push(promise);
      });
      // wait till all the downloadURL calls return and then set the state
      Promise.all(reads).then((results) => {
        this.setState({
          photos: results
        })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <h1 className="header-text">pmannuel</h1>
        <div className="gallery">
          {this.state.photos.map((photo, index) => (
              <img key={photo.id} alt={photo.filename} src={photo.url}></img>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
