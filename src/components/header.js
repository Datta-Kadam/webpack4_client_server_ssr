import React, { Component } from 'react';
import {Navbar,Nav,MenuItem,NavDropdown,NavItem,Header} from 'react-bootstrap';
import SimulateForm from './simulate_form';
import './header.css';

 class Headers extends Component {
  render() {
    return (
      <div>
        <Navbar>	
          <Nav>
          <NavDropdown eventKey={3} title="Simulate" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/AddRequestResponse">Add_Request-Response</MenuItem>
              <MenuItem eventKey={3.2} href="/UpdateRequestResponse">Update_Request-response</MenuItem>            
            </NavDropdown>
            <NavItem eventKey={1} href="#">Projects-UrlDetails</NavItem>
            <NavItem eventKey={2} href="#">MyRequests-states</NavItem>          
          </Nav>
        </Navbar>  
      </div>
    );
  }
}

export default Headers;
