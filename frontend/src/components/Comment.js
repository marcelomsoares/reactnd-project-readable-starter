import React, { Component } from 'react'

import '../css/comments.css'

class Comment extends Component {

  render() {
    const data = new Date(this.props.comment.timestamp)
    return (
      <div className='comment-container'>
        {this.props.comment.id}

        <span className='comment-body'>
          {this.props.comment.body}
        </span>

        <span className='comment-details'>
          Comentário de {this.props.comment.author} | às {dateFormater(data)} | {this.props.comment.voteScore} pontos
        </span>
      </div>
    )
  }
}

function dateFormater(date) {
  return date.toLocaleTimeString("pt-BR").concat(' de ').concat(date.toLocaleDateString("pt-BR"))
}

export default Comment