
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



getCode = () => {

   let artist_name = "chilla"
  let token = "BQCbKexeHiaQhpjnupHwzArVZebjaPICa6nE__Phg5iqf1iPP6x2uffovOa0oAwrbiir8UT-vuVEl0_JEenHjMOESNM_6Ro-O1oci-srUjrsG9UjRvyB-h8EpTEDEi4aiuuIS6-CyZKSREBtWizUE2AdkYqpggxaom7HnTc3"


  fetch(`https://api.spotify.com/v1/search?q=tania%20bowra&type=artist`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin':'*'
  }
})
.then(response =>  {

 console.log(response)


})
}


componentDidMount = () => {

   let playlist_id = "37i9dQZEVXblh2kb8O99zT"
  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = "BQCbKexeHiaQhpjnupHwzArVZebjaPICa6nE__Phg5iqf1iPP6x2uffovOa0oAwrbiir8UT-vuVEl0_JEenHjMOESNM_6Ro-O1oci-srUjrsG9UjRvyB-h8EpTEDEi4aiuuIS6-CyZKSREBtWizUE2AdkYqpggxaom7HnTc3"
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

     <div className="landing">

      <div className="desc">
      <h1> Découvrez les nouveautés rentrée 2019 </h1>
        {this.state.playlist_description}

        <Link to="search" className="button-green"> Rechercher </Link>


      </div>

      <div className="songs">
       {tracks.slice(0,6)}
      </div>

    </div>

    )
}

}





export default Nouveautes
