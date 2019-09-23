import React, {Component} from "react"
import { getUser } from "../services/auth"
import Layout from "../components/layout"
import "../components/search.css"
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler'

class Search extends Component {

  state={
    artist_name: "",
    artist_pic_url:"",
    inputValue: "Rechercher un artiste",
    artist_pic_url: "",
    artist_albums: [],
    album_tracks: [],
    artists: [],
    display: null,
    album_title: "",
    token: "BQD9RTC9sRoa9X6pZ_JhkpnEzgvesjGIR-sgUQ8_mW9vlSNuIO3lGGeUVMRyuYJbvFoYdRwFXfL5iiXeUVabbM3GEBNf6DI0E-xRp2puwIeY_70hGs0r9klyNlNv_8ngarO0pYQO1uyFeXZiqZZJ9ZM5i5EpBCGRHq7OmyG1",
    album_pic: "",
    track_number: null,
    date: "",
    playing: false,
    song: "https://p.scdn.co/mp3-preview/6e8bef4d9afb67163e187822d7f872364963f949?cid=0c007c2d26ba489e8061ba1e9d5dc808"

  }



myChangeHandler = (event) => {
    this.setState({inputValue: event.target.value});
  }


handleReset = (event) => {
   this.setState({inputValue: ""});
}


getCode2 = (e) => {
  e.preventDefault();
  let input = this.state.inputValue
  let token = this.state.token
  let url = `https://api.spotify.com/v1/search?q=${input}&type=artist`
  let artists = []

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response =>  {
    e.preventDefault();
    console.log(`CODE ${response}`)
    response.json().then((data) => {
      if (data.artists === undefined) {
        console.log("token dead")
        this.setState({
          display: "error"
        })
      } else {
        console.log(data);
        data.artists.items.forEach((a, i) => {
          console.log(a)
          artists.push(a)
          this.setState({
            artists: artists,
            display: "artists"
          })
        })
      }
    });
  })
  .catch(error => {
    console.log(error);
  })
}


getArtist = (artist_id) => {
  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = this.state.token
  let artists_url = `https://api.spotify.com/v1/artists/${artist_id}`
  let playlists_url = `https://api.spotify.com/v1/users/"${user_id}/playlists`

  fetch(artists_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response =>  {

   console.log(response)
   response.json().then((data) => {
    console.log(data);
    this.setState({
      artist_name: data.name,
      artist_popularity: data.popularity,
      artist_pic_url: data.images[0].url,
      display: "details"})
    this.getAlbums(data.id)
  });
 })
}



getAlbums = (artist_id) => {

  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = this.state.token
  let albums_url = `https://api.spotify.com/v1/artists/${artist_id}/albums`
  let playlists_url = `https://api.spotify.com/v1/users/"${user_id}/playlists`
  let albums= []

  fetch(albums_url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response =>  {
 console.log(response)
 response.json().then((data) => {
        console.log(data.items);
        if (data.items === undefined) {
          console.log("token dead")
        } else {
          console.log(`albums: ${data.items}`);
          data.items.forEach((a, i) => {
              console.log(a)
              if (a.album_type === "album") {
                albums.push(a) }
                this.setState({
                  artist_albums:
                  albums
                })
          })
        }
    });
})
}


getAlbum = (album_id) =>{

  let token = this.state.token
  let album_url = `https://api.spotify.com/v1/albums/${album_id}/tracks`

fetch(album_url = `https://api.spotify.com/v1/albums/${album_id}`, {
  method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
})
.then(response => {

  console.log(response)
  response.json().then((data) => {
    console.log(data)
    this.setState({
      display: "album_details",
      album_title: data.name,
      album_pic: data.images[0].url,
      track_number: data.total_tracks,
      date: data.release_date
    })
    this.getAlbumTracks(data.id)

  })


})


}



getAlbumTracks = (album_id) =>{

  let token = this.state.token
  let album_tracks_url = `https://api.spotify.com/v1/albums/${album_id}/tracks`
  let tracks = []

  fetch(album_tracks_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response =>  {
    console.log(response)
    response.json().then((data) => {
      console.log(`COUCU album ${data.name}`)
      console.log(`tracks: ${data.items}`);
      data.items.forEach((a, i) => {
        console.log(a)
        tracks.push(a)
        this.setState({
          album_tracks:
          tracks})
      })
    }
    )
  })
}


handlePlaySong = (song_url) => {

  this.setState({
    playing: !this.state.playing,
    song: song_url
  })
}


render() {

let albums = []
let tracks = []
let artists = []
let display = ""
let error = <p className="erreur"> Il y a eu une erreur ! Nous vous conseillons de vérifier les fautes de frappes, et la validité du token :)  </p>

let pic = this.state.artist_pic_url


let artist =  <div className="artist"
                  style = {{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${pic})`,
                    backgroundSize: "center"
                  }}>

                  <div className="artist-name">
                    <h2> {this.state.artist_name} </h2>
                    <h4> VUE D'ENSEMBLE </h4>
                  </div>

                  <div className="artist-details">
                    <h3> Albums </h3>
                  <div className="albums">
                    {albums}
                  </div>
                  </div>
              </div>



let album_details =   <div className="album-display">
                        <div className="album-infos">
                        <img className="album-pic" src={this.state.album_pic}/>
                          <h3> {this.state.album_title} </h3>
                          <p className="album-artist"> {this.state.artist_name} </p>
                          <p className="date"> {this.state.track_number} TITRES  •  {this.state.date} </p>

                        </div>
                        <div className="tracks">
                          {tracks}
                        </div>
                      </div>


if (this.state.display === "artists") {
  display = artists
} else if (this.state.display === "details")  {
  display = artist
} else if (this.state.display === "album_details") {
  display = album_details
} else if (this.state.display === "error") {
  display = error
}


this.state.artist_albums.forEach((a,i) =>{
        albums.push(
          <div key={a.id} className="albums">

            <div className="album">
              <img className="album-pic" src={a.images[0].url}/>
              <div onClick={() => this.getAlbum(a.id)} className="filter">
              <svg width="25" height="26" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.5 28C53.5 42.6611 41.834 54.5 27.5 54.5C13.166 54.5 1.5 42.6611 1.5 28C1.5 13.3389 13.166 1.5 27.5 1.5C41.834 1.5 53.5 13.3389 53.5 28Z" stroke="white" stroke-width="3"/>
                <path d="M37.064 28.4686L21.3614 37.5345V19.4027L37.064 28.4686Z" fill="white"/>
                </svg>


              <p> {a.name} </p>
              <p> {a.artist} </p>
              </div>
            </div>

          </div> )

       })



this.state.album_tracks.forEach((a,i) =>{
  let play = ""

        tracks.push(
            <div key={a.id} className="track">
             <p className="song_num" > {a.track_number} </p>
             <p onClick={() => this.handlePlaySong(a.preview_url)}> play</p>
             <div onClick={this.handlePlaySong(a.preview_url)}> play </div>
            <p className="song_name"> {a.name} </p>
            <p className="duration"> {a.duration_ms} </p>
             </div>
          )
       })


this.state.artists.forEach((a, i) => {
  {if (a.images.length > 0 ) {
  artists.push(
     <div key={a.id} className="albums">
      <div className="album">
        <img className="artist-pic" src={a.images[0].url}/>
        <div onClick={() => this.getArtist(a.id)} className="filter2">
          <svg width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.5 28C53.5 42.6611 41.834 54.5 27.5 54.5C13.166 54.5 1.5 42.6611 1.5 28C1.5 13.3389 13.166 1.5 27.5 1.5C41.834 1.5 53.5 13.3389 53.5 28Z" stroke="white" stroke-width="3"/>
                <path d="M37.064 28.4686L21.3614 37.5345V19.4027L37.064 28.4686Z" fill="white"/>
                </svg>
        </div>
        <p className="artist-name-2"> {a.name} </p>
     </div>
          </div>

    )}}
})

console.log(pic)
console.log(tracks)
console.log(this.state.album_tracks)
console.log(this.state.inputValue)
console.log(display)





  return(
    <Layout>
      <div className="background-g">

        <div>
          <div style={{
            display: "flex",
            background: "#292929",
            padding: "20px"
          }}>

          <form onSubmit={this.getCode2}>
            <label>
            <input type="text" onClick={this.handleReset} value={this.state.inputValue} onChange={this.myChangeHandler} />
            </label>
            <input type="submit" value="" />
            </form>
          </div>

          <ReactHowler
            src= {this.state.song}
            format= "mp3"
            playing= {this.state.playing}
          />

          <div className="artists-list"> </div>
          {display}
        </div>
      </div>
    </Layout>

    )
}

}





export default Search
