import React, {Component} from "react"
import { getUser } from "../services/auth"
import ReactHowler from 'react-howler'
import {Howl, Howler} from 'howler';
import '../components/profile.css'
import pic1 from "../images/spotify.png"
import Layout from "../components/layout"


class Profile extends Component {

  state={
      name: "",
      followers: null,
      id: ""

  }




componentDidMount = () => {
  let token = localStorage.getItem('token')
  let user_url = "https://api.spotify.com/v1/me"


  fetch(user_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  .then(response => {
    console.log(response)
    response.json().then((data) => {
      console.log(data)
      this.setState({ name: data.display_name, id: data.id})
    })
  })

}


render() {


  let profile = ""


if (this.state.name === undefined) {
  profile = "Merci de renseigner votre token en page d'accueil :) "

} else {

    profile = <div> <h2> Profil </h2>

          <div className="line"> <p className="int"> Name </p> <p className="int2"> {this.state.name} </p> </div>
          <div className="line"> <p className="int"> Identifiant </p> <p className="int2"> {this.state.id} </p> </div>
          <div className="line"> <p className="int"> Pays </p> <p className="int2"> France </p> </div>
          <div className="line"> <p className="int"> Followers </p> <p className="int2"> {this.state.followers} </p> </div>

          </div>
}




  return(

    <Layout>
      <div className="background-p">
         <div className="bonjour">
           <div className="part-left">
            <h1>Bonjour!</h1>
            <p> Retrouvez toutes vos informations ici </p>
           </div>
          <img className="" src={pic1}/>
         </div>
        <div className="profile-infos"> {profile}</div>
      </div>
    </Layout>



    )
}

}





export default Profile
