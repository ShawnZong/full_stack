/* eslint-disable import/order */
const config = require('../utils/config');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getDecodedToken = (request, response) => {
  const { token } = request;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid token' });
  }
  return decodedToken;
};
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: true,
    name: true,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: true,
    name: true,
  });
  response.json(blog.toJSON());
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog.comments) {
    blog.comments = [];
  }

  blog.comments = blog.comments.concat(request.body.comment);

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  return response.json(updatedBlog.toJSON());
});

blogsRouter.post('/', async (request, response) => {
  const decodedToken = getDecodedToken(request, response);
  const user = await User.findById(decodedToken.id);

  const blogTmp = request.body;
  if (!blogTmp.likes) {
    blogTmp.likes = 0;
  }

  // eslint-disable-next-line no-underscore-dangle
  blogTmp.user = user._id;

  const blog = new Blog(blogTmp);
  const savedBlog = await blog.save();

  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = getDecodedToken(request, response);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== decodedToken.id.toString()) {
    response.status(401).json({ error: 'token missing or invalid token' });
  }
  await Blog.findByIdAndRemove(request.params.id);
  // console.log(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = getDecodedToken(request, response);
  const blog = await Blog.findById(request.params.id);
  const tmpBlog = request.body;
  if (
    tmpBlog.likes !== blog.likes &&
    tmpBlog.title === blog.title &&
    tmpBlog.author === blog.author &&
    tmpBlog.url === blog.url
  ) {
    // console.log(tmpBlog);
    const newBlog = {
      title: tmpBlog.title,
      author: tmpBlog.author,
      url: tmpBlog.url,
      likes: tmpBlog.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      {
        new: true,
        runValidators: true,
        context: 'query',
      },
    );
    return response.json(updatedBlog.toJSON());
  }
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid token' });
  }

  // console.log(tmpBlog);
  const newBlog = {
    title: tmpBlog.title,
    author: tmpBlog.author,
    url: tmpBlog.url,
    likes: tmpBlog.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  return response.json(updatedBlog.toJSON());
});
module.exports = blogsRouter;
