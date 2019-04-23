import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../css/menu.css'

class Menu extends Component {
  render() {
    return (
      <ul className='nav-menu'>
        {this.props.categories
          ? (this.props.categories.map((category) => (
            <li key={category.path} className='nav-menu-item'>{category.name}</li>
          )))
          : null
        }
      </ul>
    )
  }
}

function mapStatetoProps({ categories }) {
  return {
    categories: Object.values(categories)
  }
}

export default connect(mapStatetoProps)(Menu)