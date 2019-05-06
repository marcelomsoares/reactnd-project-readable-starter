import React, { Component } from 'react'
import { connect } from 'react-redux'

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

    console.log(`editar post ${this.props.id}`)
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
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = Object.values(posts).find(p => p.id === id)
  return {
    post,
  }
}

export default connect(mapStateToProps)(EditPost)