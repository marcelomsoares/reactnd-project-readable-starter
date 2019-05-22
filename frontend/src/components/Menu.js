import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Sorter from './Sorter'
import { getValues } from '../utils/myUtils'

import '../css/menu.css'

class Menu extends Component {
  render() {
    return (
      <div className='menu-container'>
        <div className='nav-half'>
          <ul className='nav-menu'>
            <li>
              <NavLink to='/' exact className='nav-menu-item'>
                Todos os posts
              </NavLink>
            </li>
            {this.props.categories
              ? (this.props.categories.map((category) => (
                <li key={category.path}>
                  <NavLink to={`/${category.path}`} exact className='nav-menu-item'>
                    {category.name}
                  </NavLink>
                </li>
              )))
              : null
            }
            <li>
              <NavLink to='/newPost' exact className='nav-menu-item'>
                Novo Post
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='sorter-half'>
          <Sorter props={this.props} />
        </div>
      </div>
    )
  }
}

function mapStatetoProps({ categories }) {
  return {
    categories: getValues(categories),
  }
}

export default connect(mapStatetoProps)(Menu)