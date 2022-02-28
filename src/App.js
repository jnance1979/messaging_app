import React, { Component } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Inbox from './views/Inbox'
import Sent from './views/Sent'
import Trash from './views/Trash'


export default class App extends Component {

  componentDidMount () {

  }
  render() {
    return (
      <React.Fragment>
        <header>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            {/* <a className="navbar-brand" href="#">Home</a>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to='/' className="nav-link">Home<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to='/sent' className="nav-link">Sent</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to='/trash' className="nav-link">Trash</Link>
                </li>
              </ul>
              {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form> */}
            </div>
          </nav>

        </header>

        <main>
          <Routes>
            <Route exact path='/' element={ <Inbox />} />
            <Route exact path='/sent' element={ <Sent />} />
            <Route exact path='/trash' element={ <Trash />} />
          </Routes>

        </main>
      </React.Fragment>
    )
  }
}
