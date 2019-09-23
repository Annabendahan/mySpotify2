import React, {Component} from "react"
import { getUser } from "../services/auth"
import Layout from "../components/layout"
import "../components/search.css"


const Token = (props) => (

  <p>
      {props.token}

  </p>
  )







export default Token
