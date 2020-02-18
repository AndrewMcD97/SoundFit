import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-node';

const spotifyWebApi = new Spotify();

class App extends Component {

  constructor(){
    super();
    const parameter = this.getHashParams();
    this.state = {
      loggedIn: parameter.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      }
    }
    if(parameter.access_token){
      spotifyWebApi.setAccessToken(parameter.access_token)
    }
  }



  componentDidMount() {
            this.interval = setInterval(() => this.getNowPlaying(), 1000);
          }




  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){


    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: {
          console: console.log(response.body),
          name: response.body.item.name,
          artist: response.body.item.artists[0].name,
          image: response.body.item.album.images[1].url
        }
      })
    })

  }

createPlaylist(){


spotifyWebApi.createPlaylist('andrewmcdaid97', 'SoundFit', { 'public' : false })
  .then(function(data) {
    console.log('Created playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyWebApi.getUserPlaylists('andrewmcdaid97')
    .then(function(data) {
      console.log('Retrieved playlists', data.body);
    },function(err) {
      console.log('Something went wrong!', err);
    });

}

nextSong(){

spotifyWebApi.skipToNext();



}

previousSong(){

spotifyWebApi.skipToPrevious();



}

pause(){

spotifyWebApi.pause();



}

play(){

spotifyWebApi.play();



}




render() {
  return (
    <div className='App'>
      <a href='http://localhost:8888'> Login to Spotify </a>


    <div>Song: { this.state.nowPlaying.name } </div>
    <div>Artist: { this.state.nowPlaying.artist } </div>
    <div><img src= {this.state.nowPlaying.image}/></div>

      <button onClick={() => this.createPlaylist()}>Create Playlist?</button>
      <button onClick={() => this.previousSong()}>Previous Song</button>
      <button onClick={() => this.nextSong()}>Next Song</button>
      <button onClick={() => this.pause()}>Pause</button>
      <button onClick={() => this.play()}>Play</button>

    </div>

  )
}
}

export default App;
