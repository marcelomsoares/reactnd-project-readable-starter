import React, { Component } from 'react'
import { addPostAction, removePostFromState } from '../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getValues } from '../utils/myUtils'

import '../css/post.css'

class NewPost extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    redirect: false
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

  handleAuthorChange = (e) => {
    const author = e.target.value

    this.setState(() => ({
      author
    }))
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const uuidv1 = require('uuid/v1');
    const id = uuidv1()
    const timestamp = new Date().getTime()

    const { title, body, author } = this.state

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
          if (response.post.ok === true) {
            this.setState(() => ({
              title: '',
              body: '',
              author: '',
              category,
              redirect: true
            }))
          } else {
            dispatch(removePostFromState(post))
            alert('Ocorreu um erro ao cadastrar o novo post. Tente novamente mais tarde.')
          }
        }
      )
  }

  render() {
    const { title, body, author, category, redirect } = this.state

    if (redirect === true) {
      return <Redirect to={`/${category}`} />
    }

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

          <input type='text' value={author} onChange={this.handleAuthorChange}
            placeholder='Autor' />

          <button
            type='submit'
            disabled={body === '' || title === '' || author === ''}>
            Criar
          </button>
        </form>
      </div>
    )
  }
}

function mapStatetoProps({ categories, authorization }) {
  return {
    categories: getValues(categories),
    author: authorization
  }
}

export default connect(mapStatetoProps)(NewPost)