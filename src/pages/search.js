import React, {Component} from "react"
import { getUser } from "../services/auth"
import Layout from "../components/layout"
import "../components/search.css"

class Search extends Component {

  state={
    artist_name: "",
    artist_popularity: "",
    inputValue: "",
    artist_pic_url: "",
    artist_albums: [],
    album_tracks: [],
    artists: []
  }

myChangeHandler = (event) => {
    this.setState({inputValue: event.target.value});
  }





getCode2 = () => {
  let token = "BQDJD-U0Mc-pI6QeOJq7qc5rmm-vx6owHdBG8jAXXNC-yGZTzs5yq2jF8h3rVGc0-HkpIyU5JTZCklcq5gpZ8qV6dKxLH4a-jGc87_gnejqKk9EaIubeuMx9VXipxpi5S8T-hsrMII3QIb4TPi_-72iH0nuD5hKReX9DTdHf"
let url = "https://api.spotify.com/v1/search?q=chilla&type=artist"
let artists = []

fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response =>  {

 console.log(`CODE ${response}`)
  response.json().then((data) => {
        console.log(data);
        data.artists.items.forEach((a, i) => {
    console.log(a)

              artists.push(a)
              this.setState({ artists: artists })

  })


    });



})

}


getArtist = (artist_id) => {

  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = "BQDJD-U0Mc-pI6QeOJq7qc5rmm-vx6owHdBG8jAXXNC-yGZTzs5yq2jF8h3rVGc0-HkpIyU5JTZCklcq5gpZ8qV6dKxLH4a-jGc87_gnejqKk9EaIubeuMx9VXipxpi5S8T-hsrMII3QIb4TPi_-72iH0nuD5hKReX9DTdHf"
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
        this.setState({artist_name: data.name, artist_popularity: data.popularity, artist_pic_url: data.images[0].url})
        this.getAlbums(data.id)
    });


})
}



getAlbums = (artist_id) => {


  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = "BQDJD-U0Mc-pI6QeOJq7qc5rmm-vx6owHdBG8jAXXNC-yGZTzs5yq2jF8h3rVGc0-HkpIyU5JTZCklcq5gpZ8qV6dKxLH4a-jGc87_gnejqKk9EaIubeuMx9VXipxpi5S8T-hsrMII3QIb4TPi_-72iH0nuD5hKReX9DTdHf"
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
              this.setState({ artist_albums: albums  })

        })
        }

    });

})
}


getAlbumTracks = (album_id) =>{

  let token = "BQDJD-U0Mc-pI6QeOJq7qc5rmm-vx6owHdBG8jAXXNC-yGZTzs5yq2jF8h3rVGc0-HkpIyU5JTZCklcq5gpZ8qV6dKxLH4a-jGc87_gnejqKk9EaIubeuMx9VXipxpi5S8T-hsrMII3QIb4TPi_-72iH0nuD5hKReX9DTdHf"
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
        console.log(`tracks: ${data.items}`);
         data.items.forEach((a, i) => {
    console.log(a)

              tracks.push(a)
              this.setState({ album_tracks: tracks })

  })

        }

    )


})


}





render() {



let albums = []
let tracks = []
let artists = []

let pic = this.state.artist_pic_url


this.state.artist_albums.forEach((a,i) =>{
        albums.push(
          <div className="albums">

            <div className="album">
              <img className="album-pic" src={a.images[0].url}/>
              <div onClick={() => this.getAlbumTracks(a.id)} className="filter">

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
        tracks.push(

            <div className="track">
             <p className="song_num" > {a.track_number} </p>

            <p className="song_name"> {a.name} </p>
            <p className="artist_name"> {a.artists[0].name} </p>
            <p className="duration"> {a.duration_ms/60000} </p>
             </div>
          )

       })


this.state.artists.forEach((a, i) => {
  {if (a.images.length > 0 ) {
  artists.push(

    <div onClick={() => this.getArtist(a.id)} className="">


    <p> {a.name} </p>

    <img className="album-pic" src={a.images[0].url}/>




    </div>

    )}}
})

console.log(pic)
console.log(tracks)
console.log(this.state.album_tracks)






  return(
    <Layout>
    <div className="background-g">

     <div>
       <div style={{
        display: "flex",
        background: "#292929"
       }}>


          <p onClick={this.getArtist}> CLICK</p>
           <p onClick={this.getCode}> CLICKCODE</p>
            <p onClick={this.getCode2}> CLICKCODE2</p>

          <form>
          <input
            type="text"
            onChange={this.myChangeHandler}/>
          {this.state.inputValue}
          </form>

        </div>
          <div className="artists-list"> {artists} </div>



          <div className="artist"
          style = {{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${pic})`,
            backgroundSize: "cover"
          }}
            >

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
             <div className="tracks">
                {tracks}
              </div>

          </div>


      </div>

      </div>
    </Layout>

    )
}

}





export default Search
