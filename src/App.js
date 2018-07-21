import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';

class App extends Component {
  // initialize the state of our app
  constructor(){
    console.log("constructor");
    super();
    this.state = {
      photos: [],
      photosLoaded: false,
      width: -1,
      currentImage: 0
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }; 

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

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
          return ({id: photo.id, src: url, filename: photo.data().filename, width: photo.data().width, height: photo.data().height})
        })
        reads.push(promise);
      });
      // wait till all the downloadURL calls return and then set the state
      Promise.all(reads).then((results) => {
        this.setState({
          photos: results,
          photosLoaded: true
        })
      })
    })
  }

  render() {
    // check to see if the photos have loaded
    if (this.state.photosLoaded) {
      return (
        // measure the side of the window
        <Measure className="app" bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
          {
          // set the number of columns based on the width of the window
          ({measureRef}) => {
            if (this.state.width < 1 ){
              return <div ref={measureRef}></div>;
            }
            let columns = 1;
            if (this.state.width >= 720){
              columns = 2;
            }
            if (this.state.width >= 1024){
              columns = 3;
            }
            if (this.state.width >= 1700){
              columns = 4;
            }
            return  <div ref={measureRef}>
                      <h1 className="header-text">pmannuel</h1>
                      <Gallery photos={this.state.photos} columns={columns} onClick={this.openLightbox}/>
                      <Lightbox images={this.state.photos}
                                onClose={this.closeLightbox}
                                onClickPrev={this.gotoPrevious}
                                onClickNext={this.gotoNext}
                                currentImage={this.state.currentImage}
                                isOpen={this.state.lightboxIsOpen}
                              />
                    </div>
          }
        }
      </Measure>
      )
    } else {
      // if the photos haven't loaded yet display the loading text
      return (
        <p>Loading . . .</p>
      )
    }
  }
}

export default App;