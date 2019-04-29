import React, { Component } from 'react'
import { addPostAction, removePostFromState } from '../actions/shared'
import { connect } from 'react-redux'

import '../css/post.css'

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: ''
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

    const uuidv1 = require('uuid/v1');
    const id = uuidv1()
    const timestamp = new Date().getTime()

    const { title, body } = this.state

    const author = this.props.author.authorization

    const category = document.getElementById('categoryId').value

    const post = {
      id,
      title,
      body,
      author,
      category,
      timestamp,
      voteScore: 1,
      commentCount: 0,
      deleted: false,
    }

    const { dispatch } = this.props

    dispatch(addPostAction(post))
      .then(
        (response) => {
          if (response.post.ok) {
            this.setState(() => ({
              title: '',
              body: '',
              author: '',
              category: ''
            }))
          } else {
            dispatch(removePostFromState(post))
            alert('Ocorreu um erro ao cadastrar o novo post. Tente novamente mais tarde.')
          }
        }
      )
  }

  render() {
    const { title, body } = this.state

    return (
      <div className='new-post-container'>
        <form className='new-post-form' onSubmit={this.handleSubmit}>
          <h3>Novo Post</h3>

          <input type='text' value={title} onChange={this.handleTitleChange}
            placeholder='Título' />

          <textarea value={body} placeholder='Conteúdo'
            onChange={this.handleBodyChange} />

          <label>Categoria:</label>
          <select id='categoryId'>
            {this.props.categories != null && (
              this.props.categories.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))
            )}
          </select>

          <button
            type='submit'
            disabled={body === '' || title === ''}>
            Criar
          </button>
        </form>
      </div>
    )
  }
}

function mapStatetoProps({ categories, authorization }) {
  return {
    categories: Object.values(categories),
    author: authorization
  }
}

export default connect(mapStatetoProps)(NewPost)