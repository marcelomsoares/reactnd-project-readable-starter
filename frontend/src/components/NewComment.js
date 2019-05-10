import React, { Component } from 'react'
import { addCommentAction, removeCommentFromState, incrementCommentCountAction } from '../actions/shared'
import { connect } from 'react-redux'

import '../css/comment.css'

class NewComment extends Component {

  state = {
    body: '',
  }

  handleBodyChange = (e) => {
    const body = e.target.value

    this.setState(() => ({
      body,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const uuidv1 = require('uuid/v1');
    const id = uuidv1()
    const timestamp = new Date().getTime()

    const { body } = this.state

    const author = this.props.author.authorization

    const comment = {
      id,
      timestamp,
      body,
      author,
      parentId: this.props.postId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
    }

    const { dispatch } = this.props

    dispatch(addCommentAction(comment))
      .then(
        (response) => {
          if (response.comment.ok === true) {
            this.setState(() => ({
              body: '',
            }))
          dispatch(incrementCommentCountAction(comment.parentId))
          } else {
            dispatch(removeCommentFromState(comment.parentId))
            alert('Ocorreu um erro ao cadastrar o novo comentário. Tente novamente mais tarde.')
          }
        }
      )
  }

  render() {
    const { body } = this.state

    return (
      <div className='new-comment-container'>
        <form className='new-comment-form' onSubmit={this.handleSubmit}>
          <h3>Novo Comentário</h3>

          <textarea value={body} placeholder='Conteúdo'
            onChange={this.handleBodyChange} />

          <button
            type='submit'
            disabled={body === ''}>
            Adicionar
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authorization }, props) {
  return {
    author: authorization,
    postId: props.id
  }
}

export default connect(mapStateToProps)(NewComment)