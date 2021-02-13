import blogService from '../services/blogs'

const initBlogs = () => {
  return async (dispatch) => {
    const blogsInDB = await blogService.getAll()
    blogsInDB.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch({ type: 'INIT_BLOGS', blogs: blogsInDB })
  }
}

const insertBlog = (newBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(newBlog)
    dispatch({ type: 'ADD_BLOG', blog: savedBlog })
  }
}

const removeBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      dispatch({ type: 'REMOVE_BLOG', id: blog.id })
    }
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'ADD_BLOG':
      return state.concat(action.blog)
    case 'REMOVE_BLOG': {
      const blogsTmp = state.filter((tmp) => tmp.id !== action.id)
      // const blogsTmp = [...state]
      // blogsTmp.splice(action.index, 1)
      return blogsTmp
    }
    default:
      return state
  }
}

export default blogsReducer
export { initBlogs, insertBlog, removeBlog }
