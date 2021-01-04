import React, { useState } from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showLabel="view" hideLabel="hide">
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button>like</button>
        </p>
        <p>{blog.user.name}</p>
      </Togglable>
    </div>
  );
};
const NewBlogForm = ({ blogs, setBlogs, setNotification, addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    addBlog({
      title: title,
      author: author,
      url: url
    });
  };

  return (
    <div>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button onClick={handleCreate}>create</button>
    </div>
  );
};
export { Blog, NewBlogForm };
