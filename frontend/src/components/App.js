import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getAllInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Menu from './Menu'
import PostPage from './PostPage'
import NewPost from './NewPost'

import LoadingBar from 'react-redux-loading'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            {this.props.loading === true
              ? null
              : (<div>
                <Menu />
                <Route path='/' exact component={Dashboard} />
                <Route path='/newPost' exact component={NewPost} />
                <Route path='/:category/:id' component={PostPage} />
              </div>)
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: posts === null
  }
}

export default connect(mapStateToProps)(App);
