import React, { Component } from 'react'
import { editCommentAction, addCommentAction } from '../actions/shared'
import { connect } from 'react-redux'

import '../css/comment.css'

class EditComment extends Component {

  state = {
    body: '',
  }

  componentDidMount() {
    this.setState(() => ({
      body: this.props.comment.body,
    }))
  }

  handleBodyChange = (e) => {
    const body = e.target.value

    this.setState(() => ({
      body
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { body } = this.state

    const { comment, dispatch } = this.props

    const { author, parentId, voteScore, deleted, parentDeleted } = this.props.comment

    let editedComment = {
      id: this.props.comment.id,
      body,
      timestamp: new Date().getTime(),
      author,
      parentId,
      voteScore,
      deleted,
      parentDeleted,
    }

    dispatch(editCommentAction(editedComment))
      .then(
        (response) => {
          if (response.comment.ok === true) {
            this.props.handleCancel()
          } else {
            dispatch(addCommentAction(comment))
            alert('Ocorreu um erro ao editar o comentário. Tente novamente mais tarde.')
          }
        })
  }

  render() {
    const { body } = this.state

    return (
      <div className='comment-container'>
        <form className='edit-comment-form' onSubmit={this.handleSubmit}>
          <textarea value={body} placeholder='Conteúdo'
            onChange={this.handleBodyChange} />
          <button
            type='submit'
            disabled={body === ''}>
            Editar
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ comments }, { id, handleCancel }) {
  const comment = Object.values(comments).find(c => c.id === id)
  return {
    comment,
    handleCancel,
  }
}

export default connect(mapStateToProps)(EditComment)

