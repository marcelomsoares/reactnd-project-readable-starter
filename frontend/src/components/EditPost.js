import React, { Component } from 'react'
import { editPostAction, addPostAction } from '../actions/shared'
import { connect } from 'react-redux'
import { getValues } from '../utils/myUtils'

import '../css/post.css'

class EditPost extends Component {

  state = {
    title: '',
    body: '',
  }

  componentDidMount() {
    this.setState(() => ({
      title: this.props.post.title,
      body: this.props.post.body,
    }))
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title
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

    const { title, body } = this.state

    const { post, dispatch } = this.props

    const { author, category, timestamp, voteScore, commentCount, deleted } = this.props.post

    let editedPost = {
      id: this.props.post.id,
      title,
      body,
      author,
      category,
      timestamp,
      voteScore,
      commentCount,
      deleted,
    }

    dispatch(editPostAction(editedPost))
      .then(
        (response) => {
          if (response.post.ok === true) {
            this.props.handleCancel()
          } else {
            dispatch(addPostAction(post))
            alert('Ocorreu um erro ao editar o post. Tente novamente mais tarde.')
          }
        })

  }

  render() {

    const { title, body } = this.state

    return (
      <div className='new-post-container'>
        <form className='new-post-form' onSubmit={this.handleSubmit}>
          <h3>Editar Post</h3>

          <input type='text' value={title} onChange={this.handleTitleChange}
            placeholder='Título' />

          <textarea value={body} placeholder='Conteúdo'
            onChange={this.handleBodyChange} />

          <button
            type='submit'
            disabled={body === '' || title === ''}>
            Editar
          </button>

          <button onClick={this.props.handleCancel}
            type='button'>
            Cancelar
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts }, { id, handleCancel }) {
  const post = getValues(posts).find(p => p.id === id)
  return {
    post,
    handleCancel,
  }
}

export default connect(mapStateToProps)(EditPost)