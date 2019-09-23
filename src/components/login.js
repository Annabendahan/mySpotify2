import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }

    return (
      <>
      <div className="background-p">
        <h1>De la musique pour tous</h1>
        <div className="form">
        <h2> S'identifier </h2>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/app/profile`)
          }}
        >
          <label>
            <p> Identifiant
            <input type="text" name="username" onChange={this.handleUpdate} /> </p>
          </label>
          <label>
             <p> Mot de passe
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
            /></p>
          </label>
          <input className="button-green" type="submit" value="S'identifier" />
        </form>
        </div>
        </div>
      </>
    )
  }
}

export default Login
