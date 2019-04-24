import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sorter from './Sorter'

import '../css/menu.css'

class Menu extends Component {
  render() {
    return (
      <div className='menu-container'>
        <div className='nav-half'>
          <ul className='nav-menu'>
            {this.props.categories
              ? (this.props.categories.map((category) => (
                <li key={category.path} className='nav-menu-item'>{category.name}</li>
              )))
              : null
            }
          </ul>
        </div>
        <div className='sorter-half'>
          <Sorter />
        </div>
      </div>
    )
  }
}

function mapStatetoProps({ categories }) {
  return {
    categories: Object.values(categories)
  }
}

export default connect(mapStatetoProps)(Menu)