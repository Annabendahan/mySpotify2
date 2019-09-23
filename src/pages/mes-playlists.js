import React, {Component} from "react"
import { getUser } from "../services/auth"
import Layout from "../components/layout"
import "../components/search.css"
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler'
import pic1 from "../images/playlist-pic.png"

class Playlists extends Component {
state= {

  my_playlists: [],
  error: false


}



componentDidMount = () =>{
    let token = localStorage.getItem('token')
    let user_url = "https://api.spotify.com/v1/me"

     fetch(user_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

     .then(response => {
      response.json().then((data) => {
          console.log(data)
          console.log(data.id)
          this.getPlaylists(data.id)
      })
     })

}



getPlaylists = (user_id) => {
  let token = localStorage.getItem('token')
  let u_id = user_id
  let playlists_url = `https://api.spotify.com/v1/users/${u_id}/playlists`
  let my_playlists = []


  fetch(playlists_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  .then(response => {
      response.json().then((data) => {
          console.log(data.items)
          console.log(u_id)
          if (data.items === undefined) {
            console.log("coucou")
            this.setState({error: true})
          } else {
          data.items.forEach((a, i) => {
            my_playlists.push(a)
          })}
          this.setState({my_playlists: my_playlists})
      })
     })


}


render() {


  let myPlaylists = []
  console.log(this.state.my_playlists)

  let error = ""

  this.state.error ? error =  <div className="erreur2"> Merci de renseigner votre token en page d'accueil :) </div> : error = null






this.state.my_playlists.forEach((a, i ) => {

  if (a.images.length !== 0) {
  myPlaylists.push(
    <div key={a.id} className="album">
      <img className="album-pic" src={a.images[0].url}/>
      <p className="pl-name"> {a.name} </p>
    </div>
    )} else {
    myPlaylists.push(
    <div key={a.id} className="album">
      <img className="album-pic" src={pic1}/>
      <p className="pl-name"> {a.name} </p>
    </div>
    )}

})


  return (

        <Layout>
          <div className="background-g">

            {error}


          <h1> Ma bibliothèque </h1>

          {myPlaylists}

          </div>
        </Layout>

    )
}

}



export default Playlists
