import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor(){
    console.log("constructor");
    super();
    this.state = {
      photos: []
    }
  }; 

  componentDidMount() {
    const photosRef = firebase.firestore().collection('photos');
    photosRef.get().then((querySnapshot) => {
      let reads = [];
      querySnapshot.forEach(function(photo){
        var storage = firebase.storage();
        var pathReference = storage.ref(photo.data().filename);
        var promise = pathReference.getDownloadURL().then(function(url) {
          return ({id: photo.id, url: url, filename: photo.data().filename})
        })
        reads.push(promise);
      });
      Promise.all(reads).then((results) => {
        this.setState({
          photos: results
        })
      })
    })
  }

  render() {
    return (
      <div classname="app">
        <h1 class="header-text">pmannuel</h1>
        <div class="gallery">
          {this.state.photos.map((photo, index) => (
              <img alt={photo.filename} src={photo.url}></img>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
