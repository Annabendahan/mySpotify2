
import React, {Component} from "react"
import { getUser } from "../services/auth"
import { Link } from "gatsby"


class Nouveautes extends Component {

  state={
    playlist_display: "",
    playlist_description: "",
    playlist_tracks: []
  }

myChangeHandler = (event) => {
    this.setState({inputValue: event.target.value});
  }




componentDidMount = () => {

   let playlist_id = "37i9dQZEVXblh2kb8O99zT"
  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = "BQDL_kNSl0ulogjpeanbLpXnfj6IOf8PuZrbKx1FmEJKsi01JuRUib_muBU20ShUk_OLL9-_DoozNpAyM2oGmIGn9MXK-hLa0rf254mF8vvHqbni6jH_jf_udy-ZQZicj0x11qaErfWbol9AiKEqr5oRIK9Dxo4nonz3Jmi0"
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
              this.setState({ playlist_tracks: playlist_tracks  })

        })
        console.log(this.state.playlist_tracks[0].track.name)
        }

    });


})
}


render() {

let tracks = []


this.state.playlist_tracks.forEach((a,i) =>{
        tracks.push(
          <div className="song">

            <img className="song-pic" src={a.track.album.images[0].url}/>
          </div> )

       })




console.log(tracks.slice(0,5))




  return(

    <div>
       <div className="landing">
          <div className="desc">
          <h1> Découvrez les nouveautés rentrée 2019 </h1>
           <p> {this.state.playlist_description} </p>
          </div>
          <div className="songs">
           {tracks.slice(0,6)}
          </div>
      </div>
      <Link to="search" className="button-green"> Rechercher </Link>
    </div>

    )
}

}





export default Nouveautes
