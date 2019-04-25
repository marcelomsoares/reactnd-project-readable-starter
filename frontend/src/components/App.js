import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Menu from './Menu'

import LoadingBar from 'react-redux-loading'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllInitialData())
  }


  render() {
    return (
      <div className="App">
        <LoadingBar />
        {this.props.loading === true
          ? null
          : (<div>
            <Menu />
            <Dashboard />            
          </div>)
        }
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: posts === null
  }
}

export default connect(mapStateToProps)(App);
