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
      let newState = [];
      querySnapshot.forEach(function(photo){
        var storage = firebase.storage();
        var pathReference = storage.ref(photo.data().filename);
        pathReference.getDownloadURL().then(function(url) {
          console.log(url)
        })
        newState.push({
          id: photo.id
        })
      });
      this.setState({
        photos: newState
      })
    });
  }

  render() {
    return (
      <div classname="app">
        {this.state.photos.map((photo, index) => (
            <p>{photo.}</p>
        ))}
      </div>
    );
  }
}

export default App;
