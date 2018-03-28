import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

export default function(ComposedComponent) {

  class Authentication extends Component {
    // static contextTypes = {
    //   router: React.PropTypes.object
    // }    
    componentWillMount() { 
        if(!cookie.load('userId')){
            cookie.save('userId', 'datta1', { path: '/' });
            console.log("componentWillMount cookie -",cookie.load('userId'));
        }    
    }
    componentWillReceiveProps(nextProps) {
        if(!cookie.load('userId')){
            cookie.save('userId', 'datta1', { path: '/' });
            console.log("componentWillReceiveProps cookie -",cookie.load('userId'));
        }
    }
     render() {
      return <ComposedComponent {...this.props} />
    }
  }

    return Authentication;
}