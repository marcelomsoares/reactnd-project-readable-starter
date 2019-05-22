import React from 'react'
import { connect } from 'react-redux'
import { handleOrderPostsByVoteScoreAction } from '../actions/shared'
import { FaSortNumericUp, FaSortNumericDown } from 'react-icons/fa'

var Sorter = function Sorter(props) {
  return (
    <div>
      <span>Ordenar por pontuação: </span>
      <button onClick={(e) => orderAsc(e, 'ASC', props)}>
        Crescente <FaSortNumericDown />
      </button>
      <button onClick={(e) => orderAsc(e, 'DESC', props)}>
        Decrescente <FaSortNumericUp />
      </button>
    </div>
  )
}

function orderAsc(e, order, props) {
  e.preventDefault()
  const { dispatch, posts } = props
  dispatch(handleOrderPostsByVoteScoreAction(posts, order))
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

export default connect(mapStateToProps)(Sorter)