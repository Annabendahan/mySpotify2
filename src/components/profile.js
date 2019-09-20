import React, {Component} from "react"
import { getUser } from "../services/auth"
import ReactHowler from 'react-howler'
import {Howl, Howler} from 'howler';

class Profile extends Component {

  state={
    artist_names: "",
    artist_popularity: "",
    inputValue: "",
    playing: false,

  }

myChangeHandler = (event) => {
    this.setState({inputValue: event.target.value});
  }



getCode = () => {

   let artist_name = "chilla"
  let token = "Bearer BQAyGrRreAqUVACdUPN5m8z1kDvR9cLGdjL6LYt7T01rCSNRWfCd9gqI1K3vgV51uEFEReQe_dFWRimWWJzdAirRH2kUgF0BKojMLlOygC13ktsWm5SkuHHnZKXU6k-sV1SStNTGn-jSA2feeSh4FiLuVoS2sZk1qo4YodZu"


  fetch(`https://open.spotify.com/search/${artist_name}`, {
  method: "GET",
  mode: 'no-cors',
  headers: {
    Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin':'*'
  }
})
.then(response =>  {

 console.log(response)


})
}


getArtist = () => {

   let artist_id = "5BcAKTbp20cv7tC5VqPFoC"
  let user_id= "oql91c8w5ogq0nxa0nk81yxjb"
  let token = "Bearer BQAyGrRreAqUVACdUPN5m8z1kDvR9cLGdjL6LYt7T01rCSNRWfCd9gqI1K3vgV51uEFEReQe_dFWRimWWJzdAirRH2kUgF0BKojMLlOygC13ktsWm5SkuHHnZKXU6k-sV1SStNTGn-jSA2feeSh4FiLuVoS2sZk1qo4YodZu"
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
        this.setState({artist_names: data.name, artist_popularity: data.popularity})
    });

})
}

handlePlay = () => {




    this.setState({
      playing: true
    })


    console.log("played")

    console.log(this.state.playing)

    console.log(ReactHowler)
  }


handleContext = () =>{
  let context = new AudioContext();
  console.log(context.state)
 context.resume();

    console.log("resumed")
    console.log(context.state)
    this.handlePlay();

}



handlePlay2 = () =>{
  const sound = new Howl({
  src: 'https://api.spotify.com/v1/tracks/4PjcfyZZVE10TFd9EKA72r',
  autoplay: true,
  volume: 5,
});

  sound.play();

  console.log("payed2")
}



handlePlay3 = () =>{
  const sound = new Howl({
  src: ["../images.3789.mp3"],
  autoplay: true,
  volume: 5,
});

  sound.play();

  console.log("payed3")
}





render() {











  return(

     <div>

      <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().name}</li>
      <li>E-mail: {getUser().email}</li>
      <p onClick={this.getArtist}> CLICK</p>
      <p onClick={this.getCode}> CLICK2</p>
      <form>
      <input
        type="text"
        onChange={this.myChangeHandler}/>
      {this.state.inputValue}
      </form>


      ARTIST : {this.state.artist_names} {this.state.artist_popularity}



    </ul>
    play song
    <ReactHowler
        src='https://api.spotify.com/v1/tracks/4PjcfyZZVE10TFd9EKA72r'
        playing={this.state.playing}
      />
      <p onClick={this.handlePlay}>Play</p>
       <p onClick={this.handlePlay2}>Play2</p>
       <p onClick={this.handlePlay3}>Play3</p>
    </div>



    )
}

}





export default Profile
