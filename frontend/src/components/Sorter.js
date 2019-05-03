import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleOrderPostsByVoteScoreAction } from '../actions/shared'
import { FaSortNumericUp, FaSortNumericDown } from 'react-icons/fa'

class Sorter extends Component {
  orderAsc = (e, order) => {
    e.preventDefault()
    const { dispatch, posts} = this.props
    dispatch(handleOrderPostsByVoteScoreAction(posts, order))
  }

  render() {
    return (
      <div>
        <span>Ordenar por pontuação: </span>
        <button onClick={(e) => this.orderAsc(e, 'ASC')}>
          Crescente <FaSortNumericDown />
        </button>
        <button onClick={(e) => this.orderAsc(e, 'DESC')}>
          Decrescente <FaSortNumericUp />
        </button>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

export default connect(mapStateToProps)(Sorter)