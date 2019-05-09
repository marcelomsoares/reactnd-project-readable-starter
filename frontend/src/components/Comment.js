import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVoteOnCommentAction, downVoteOnCommentAction, deleteCommentAction } from '../actions/shared'
import { FaThumbsUp, FaThumbsDown, FaPencilAlt, FaTrash } from 'react-icons/fa'
import EditComment from './EditComment'

import '../css/comment.css'

class Comment extends Component {

  state = {
    voteScore: this.props.comment !== undefined ? this.props.comment.voteScore : 0,
    editing: false,
  }

  handleBeginEdit = () => {
    this.setState(() => ({
      editing: true,
    }))
  }

  handleEndEdit = () => {
    this.setState(() => ({
      editing: false,
    }))
  }

  handleUpVote = (comment) => {

    const { dispatch } = this.props

    dispatch(upVoteOnCommentAction(comment.id))
      .then(
        (response) => {
          if (response.comment.ok === true) {
            this.setState(() => ({
              voteScore: comment.voteScore
            }))
          } else {
            this.setState(() => ({
              voteScore: comment.voteScore - 1
            }))
          }
        }
      )
  }

  handleDownVote = (comment) => {

    const { dispatch } = this.props

    dispatch(downVoteOnCommentAction(comment.id))
      .then(
        (response) => {
          if (response.comment.ok) {
            this.setState(() => ({
              voteScore: comment.voteScore
            }))
          } else {
            this.setState(() => ({
              voteScore: comment.voteScore + 1
            }))
          }
        }
      )
  }

  handleCommentDelete = (commentId) => {

    const { dispatch } = this.props

    dispatch(deleteCommentAction(commentId))
    // .then(
    //   (response) => {
    //     if (response.comment.deleted === true) {
    //       alert('Comentário deletado com sucesso')
    //     }
    //   }
    // )
    // TODO: Tratar caso não seja possivel deletar o comentário
  }

  render() {
    const data = new Date(this.props.comment.timestamp)
    if (this.state.editing === true) {
      return (
        <EditComment id={this.props.comment.id} handleCancel={this.handleEndEdit} />
      )
    }
    return (
      <div className='comment-container'>
        <span className='comment-body'>
          {this.props.comment.body}
        </span>

        <span className='comment-details'>
          Comentário de {this.props.comment.author} | às {dateFormater(data)} | {this.props.comment.voteScore} pontos
        </span>
        <span> </span>
        <span title='Votar +1'>
          <FaThumbsUp onClick={() => this.handleUpVote(this.props.comment)} size='14' />
        </span>
        <span> </span>
        <span title='Votar -1'>
          <FaThumbsDown onClick={() => this.handleDownVote(this.props.comment)} size='14' />
        </span>
        <span> </span>
        <span title='Editar'>
          <FaPencilAlt onClick={() => this.handleBeginEdit()} size='14' />
        </span>
        <span> </span>
        <span title='Excluir'>
          <FaTrash onClick={() => this.handleCommentDelete(this.props.comment.id)} size='14' />
        </span>
      </div>
    )
  }
}

function dateFormater(date) {
  return date.toLocaleTimeString("pt-BR").concat(' de ').concat(date.toLocaleDateString("pt-BR"))
}

export default connect()(Comment)