import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';

// class Header extends React.Component {
class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        {/* <a href="https://twitter.com/flexdinesh">*/}
        {/* <img src={Banner} alt="react-redux-boilerplate - Logo" />*/}
        {/* </a>*/}
        <div className="nav-bar">
          <Link className="router-link" to="/">
            xxxxxx
          </Link>
          <Link className="router-link" to="/exam">
            eeeeee
          </Link>
          <Link className="router-link" to="/admin">
            aaaaa
          </Link>
          <Link className="router-link" to="/goiy">
            zzzzzz
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
