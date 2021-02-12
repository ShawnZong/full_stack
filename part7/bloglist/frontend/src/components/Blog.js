import React, { useState } from 'react'
import blogService from '../services/blogs'

// components
import Togglable from './Togglable'

// redux
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogsReducer'

// style
import { Button } from 'react-bootstrap'

const LikesButton = ({ likes, handleLikes }) => {
  return (
    <div>
      likes {likes}{' '}
      <Button id="likesButton" onClick={handleLikes}>
        like
      </Button>
    </div>
  )
}
const Blog = ({ index, blog, user }) => {
  const dispatch = useDispatch()
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLikes = async () => {
    await blogService.update(blog.id, {
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
    setBlogLikes(blogLikes + 1)
  }
  const handleRemove = async () => {
    dispatch(removeBlog(blog, index))
  }
  return (
    <div className="blogDetail" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showLabel="view" hideLabel="hide">
        <p>{blog.url}</p>
        <LikesButton likes={blogLikes} handleLikes={handleLikes} />
        <p>{blog.user.name}</p>
        {blog.user.id === user.id ? (
          <Button onClick={handleRemove}>remove</Button>
        ) : blog.user === user.id ? (
          <Button onClick={handleRemove}>remove</Button>
        ) : (
          ''
        )}
      </Togglable>
    </div>
  )
}
const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id="newBlogButton" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}
export { Blog, NewBlogForm, LikesButton }
