import React from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"
import ReactHowler from 'react-howler'

import "../components/index.css"
import Nouveautes from "../components/nouveautes-rentree"

import Layout from "../components/layout"

export default () => (
  <Layout>
  <div className="gradient">

      <p>
      <Nouveautes />
        {isLoggedIn() ? (
          <>




          </>
        ) : (
          <>
            <p className="login"> <Link to="/app/login">S'identifier</Link> </p>
          </>
        )}


      </p>
    </div>
  </Layout>
)
