
import React, {Component} from "react"
import { getUser } from "../services/auth"
import { Link } from "gatsby"
import ReactHowler from 'react-howler'
import Token from '../components/token'


class Nouveautes extends Component {

  state={
    tokenValue: localStorage.getItem('token'),
    playlist_display: "",
    playlist_description: "",
    playlist_tracks: [],
    playing: false,
    song: "https://p.scdn.co/mp3-preview/6e8bef4d9afb67163e187822d7f872364963f949?cid=0c007c2d26ba489e8061ba1e9d5dc808"
  }


  componentDidMount = () => {


    let playlist_id = "37i9dQZEVXblh2kb8O99zT"
    let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
    let token = localStorage.getItem('token')
    let playlist_tracks= this.state.playlist_tracks
    let playlists_url = `https://api.spotify.com/v1/playlists/${playlist_id}`

    fetch(playlists_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response =>  {

     console.log(response)
     response.json().then((data) => {
      if (data.tracks === undefined) {
        console.log("token dead")

      } else {
        console.log(data.tracks.items);
        this.setState({playlist_description: data.description})

        data.tracks.items.forEach((a, i) => {
          console.log(a)
          playlist_tracks.push(a)
          this.setState({ playlist_tracks: playlist_tracks })

        })
      }

    });
   })
  }



  handleClick = (e) => {

    e.preventDefault()
    let playlist_id = "37i9dQZEVXblh2kb8O99zT"
    let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
    let token = localStorage.getItem('token')
    let playlist_tracks= this.state.playlist_tracks
    let playlists_url = `https://api.spotify.com/v1/playlists/${playlist_id}`

    fetch(playlists_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response =>  {

     console.log(response)
     response.json().then((data) => {
      if (data.tracks === undefined) {
        console.log("token dead")

      } else {
        console.log(data.tracks.items);
        this.setState({playlist_description: data.description})

        data.tracks.items.forEach((a, i) => {
          console.log(a)
          playlist_tracks.push(a)
          this.setState({ playlist_tracks: playlist_tracks })

        })
      }

    });
   })
  }


  handlePlaySong = (song_url) => {

    this.setState({
      playing: true,
      song: song_url
    })
  }

  handlePauseSong = () => {

  this.setState({
    playing: false
  })
}

handleReset2 = (event) => {
   this.setState({tokenValue: ""});
 }


   myChangeHandler2 = (e) => {
    e.preventDefault()
    this.setState({tokenValue: e.target.value});
    this.handleClick(e);
  }





  render() {

    let tracks = []


    this.state.playlist_tracks.forEach((a,i) =>{

      let control = ""

    if ((this.state.playing) && (a.track.preview_url === this.state.song)) {
     control = <svg onClick={(e) => this.handlePauseSong()} width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M53.5 28C53.5 42.6611 41.834 54.5 27.5 54.5C13.166 54.5 1.5 42.6611 1.5 28C1.5 13.3389 13.166 1.5 27.5 1.5C41.834 1.5 53.5 13.3389 53.5 28Z" stroke="white" stroke-width="3"/>
     <line x1="21.5" y1="36" x2="21.5" y2="20" stroke="white" stroke-width="3"/>
     <line x1="33.5" y1="36" x2="33.5" y2="20" stroke="white" stroke-width="3"/>
     </svg>

     } else {
    control = <svg onClick={(e) => this.handlePlaySong(a.track.preview_url)} width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.5 28C53.5 42.6611 41.834 54.5 27.5 54.5C13.166 54.5 1.5 42.6611 1.5 28C1.5 13.3389 13.166 1.5 27.5 1.5C41.834 1.5 53.5 13.3389 53.5 28Z" stroke="white" stroke-width="3"/>
    <path d="M37.064 28.4686L21.3614 37.5345V19.4027L37.064 28.4686Z" fill="white"/>
    </svg>
    }

      tracks.push(
        <div className="nv" >
          <img className="nv-pic" src={a.track.album.images[0].url}/>
          <div className="filter" >
            {control}
            <p> {a.track.name} </p>
          </div>
        </div> )

    })




    console.log(tracks.slice(0,5))
    console.log(`storage: ${localStorage.getItem('token')}`)



    return(

    <div>

      <form className="token-form" onSubmit={localStorage.setItem("token", this.state.tokenValue) }>
          <p> Votre token ici <input type="text" onClick={this.handleReset2} value={this.state.tokenValue} onChange={(e) => this.myChangeHandler2(e)}/>
          </p>
      </form>


      <div className="landing">
        <div className="desc">
          <h1> Découvrez les nouveautés rentrée 2019 </h1>
          <p> {this.state.playlist_description} </p>
          <Link to="search" className="button-green"> Rechercher </Link>
        </div>
        <div className="songs">
          {tracks.slice(0,6)}
        </div>
      </div>


      <ReactHowler
        src= {this.state.song}
        format= "mp3"
        playing= {this.state.playing}
      />

    </div>

      )
  }

}





export default Nouveautes
