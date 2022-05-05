import React, { Component } from 'react';
import Identicon from 'identicon.js';
import box from '../box.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-light shadow-sm p-2 py-lg-3 text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          disabled
        >
          <img src={box} width="30" height="30" className="align-top" alt="" />
          FStorage
        </a>
        <ul className="navbar-nav px-3">
          <li>
            <small id="account">
              <a
                target="_blank"
                className='text-dark'
                alt=""
                href={"https://etherscan.io/address/" + this.props.account}
              >
                {this.props.account ? this.props.account.substring(0,6) : "0x" }...{this.props.account ? this.props.account.substring(38,42) : "0" }
              </a>
            </small>
            {this.props.account ? 
              <img
                alt=""
                style={{ borderRadius: "100%", border: "2px solid #50aaff" }}
                className='ml-2'
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;