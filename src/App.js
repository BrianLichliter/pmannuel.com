import React, { Component } from 'react';
import PhotoGrid from './components/PhotoGrid';
import Navbar from './components/Navbar';

class App extends Component {
    render(){
        return (
            <div className="app">
                <Navbar />
                <PhotoGrid />
            </div>
        );
    }
}

export default App;