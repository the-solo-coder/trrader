import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="/"
                role="button"
              >
                <i className="fas fa-th-large" />
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Account
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Log In
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
