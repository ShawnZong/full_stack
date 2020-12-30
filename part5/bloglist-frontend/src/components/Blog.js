import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);
const NewBlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const savedBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      });
      setBlogs(blogs.concat(savedBlog));
    } catch (error) {
      console.log(error);
    }
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
