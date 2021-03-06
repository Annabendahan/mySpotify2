import React from "react"
import { Link, navigate } from "gatsby"
import "./navbar.css"
import { getUser, isLoggedIn, logout } from "../services/auth"
import logo from "../images/Spotify_Logo_RGB_White (1).png"

export default () => {
  const content = { message: "", login: true }
  if (isLoggedIn()) {
    content.message = `Hello, ${getUser().name}`
  } else {
    content.message = "You are not logged in"
  }
  return (
    <div className="navbar">
     <Link to="/"> <img  src={logo} className="logo" alt="fireSpot" /> </Link>

      <nav>

                {` `}
                <p> <svg width="23" height="21" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.8125 30.2349H5.18555C4.90955 30.2349 4.68555 30.0109 4.68555 29.7349V11.1389C4.68555 10.8629 4.90955 10.6389 5.18555 10.6389C5.46155 10.6389 5.68555 10.8629 5.68555 11.1389V29.2349H27.3125V11.1389C27.3125 10.8629 27.5365 10.6389 27.8125 10.6389C28.0885 10.6389 28.3125 10.8629 28.3125 11.1389V29.7349C28.3125 30.0109 28.0895 30.2349 27.8125 30.2349Z" fill="white"/>
        <path d="M32.4994 16.1099C32.3764 16.1099 32.2524 16.0649 32.1554 15.9739L16.4984 1.18788L0.843438 15.9729C0.642438 16.1629 0.323438 16.1529 0.136438 15.9529C-0.0525616 15.7519 -0.0445616 15.4359 0.156438 15.2459L16.1544 0.136875C16.3474 -0.0461247 16.6484 -0.0451247 16.8424 0.136875L32.8434 15.2459C33.0434 15.4359 33.0524 15.7519 32.8634 15.9529C32.7644 16.0569 32.6324 16.1099 32.4994 16.1099Z" fill="white"/>
        <path d="M20.4903 30.2349H12.5093C12.2333 30.2349 12.0093 30.0109 12.0093 29.7349V18.8989C12.0093 18.6229 12.2333 18.3989 12.5093 18.3989H20.4903C20.7663 18.3989 20.9903 18.6229 20.9903 18.8989V29.7349C20.9903 30.0109 20.7663 30.2349 20.4903 30.2349ZM13.0093 29.2349H19.9903V19.3989H13.0093V29.2349Z" fill="white"/>
        </svg>
         <Link to="/">Accueil</Link> </p>
                {` `}
                <p > <svg width="21" height="23" viewBox="0 0 51 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.721 51.273L35.862 35.82C39.652 32.019 42 26.779 42 21C42 9.42 32.58 0 21 0C9.42 0 0 9.42 0 21C0 32.58 9.42 42 21 42C26.083 42 30.748 40.183 34.384 37.168L49.279 52.659C49.475 52.864 49.737 52.966 50 52.966C50.25 52.966 50.499 52.873 50.693 52.687C51.091 52.304 51.103 51.671 50.721 51.273ZM21 40C10.523 40 2 31.477 2 21C2 10.523 10.523 2 21 2C31.477 2 40 10.523 40 21C40 31.477 31.476 40 21 40Z" fill="white"/>
        </svg><Link to="/search">Rechercher</Link> </p>
                {` `}
                <p className="profil"> <svg width="26" height="30" viewBox="0 0 46 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.014 42.889L31.461 38.113C30.56 37.662 30 36.756 30 35.748V32.367C30.229 32.087 30.47 31.768 30.719 31.416C31.958 29.666 32.951 27.718 33.673 25.617C35.084 24.97 36 23.575 36 22V18C36 17.037 35.64 16.104 35 15.375V10.056C35.056 9.506 35.276 6.232 32.908 3.531C30.854 1.188 27.521 0 23 0C18.479 0 15.146 1.188 13.092 3.53C10.724 6.231 10.944 9.506 11 10.056V15.375C10.36 16.104 10 17.037 10 18V22C10 23.217 10.553 24.352 11.497 25.109C12.413 28.736 14.33 31.469 15 32.346V35.655C15 36.623 14.472 37.511 13.623 37.975L4.702 42.841C1.801 44.424 0 47.458 0 50.762V54C0 58.746 15.045 60 23 60C30.955 60 46 58.746 46 54V50.957C46 47.519 44.089 44.427 41.014 42.889ZM44 54C44 55.357 36.588 58 23 58C9.412 58 2 55.357 2 54V50.762C2 48.191 3.402 45.828 5.659 44.598L14.58 39.732C16.073 38.917 17 37.354 17 35.655V31.636L16.767 31.358C16.743 31.329 14.292 28.364 13.357 24.293L13.266 23.897L12.925 23.677C12.346 23.303 12 22.676 12 22V18C12 17.439 12.238 16.916 12.67 16.525L13 16.228V10L12.991 9.869C12.988 9.842 12.648 7.07 14.596 4.848C16.253 2.958 19.081 2 23 2C26.905 2 29.727 2.951 31.386 4.828C33.333 7.029 33.011 9.845 33.009 9.869L33 16.228L33.33 16.526C33.762 16.916 34 17.439 34 18V22C34 22.873 33.428 23.637 32.578 23.899L32.08 24.052L31.92 24.547C31.251 26.628 30.298 28.55 29.086 30.26C28.789 30.681 28.5 31.054 28.249 31.339L28 31.623V35.748C28 37.518 28.983 39.109 30.566 39.901L40.119 44.677C42.513 45.874 44 48.28 44 50.957V54Z" fill="white"/>
        </svg> <Link to="/profile/">Profil</Link> </p>
        {` `}
                <p> <svg width="20" height="22" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" y1="1" x2="0.5" y2="42" stroke="white"/>
        <line x1="13.5" y1="1" x2="13.5" y2="42" stroke="white"/>
        <line x1="22.1932" y1="0.421416" x2="39.4586" y2="40.162" stroke="white"/>
        </svg> <Link to="/mes-playlists"> Ma bibliothèque </Link> </p>
                {isLoggedIn() ? (
                  <a className="deconnexion"
                    href="/"
                    onClick={event => {
                      event.preventDefault()
                      logout(() => navigate(`/app/login`))
                    }}
                  >
                    Deconnexion
                  </a>

                ) : null}
                {` `}

      </nav>
    </div>
  )
}
