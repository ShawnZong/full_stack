import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import { Blog, LikesButton, NewBlogForm } from '../components/Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    likes: 999,
    author: 'authorTest',
    title: 'titleTest',
    url: 'urlTest',
    user: { name: 'userTest' },
  }
  const user = {
    id: 'idTest',
  }
  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />)
  })

  test('renders content', () => {
    // component.debug()
    expect(component.container).toHaveTextContent('authorTest')
    expect(component.container).toHaveTextContent('titleTest')
    const toggleDiv = component.container.querySelector('.togglableContent')

    // console.log(prettyDOM(toggleDiv))
    expect(toggleDiv).toHaveStyle('display: none')
  })

  test('after click show, url and likes of blog are shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const toggleDiv = component.container.querySelector('.togglableContent')
    expect(toggleDiv).not.toHaveStyle('display: none')
    expect(toggleDiv).toHaveTextContent(blog.likes)
    expect(toggleDiv).toHaveTextContent(blog.url)
  })
})
test('test like button', () => {
  const mockHandler = jest.fn()
  const likesComponent = render(<LikesButton handleLikes={mockHandler} />)
  const button = likesComponent.getByText('like')
  console.log(prettyDOM(button))

  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<NewBlogForm /> input and calls onSubmit', () => {
  const addBlog = jest.fn()
  const component = render(<NewBlogForm addBlog={addBlog} />)
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'titleTest' } })
  fireEvent.change(authorInput, { target: { value: 'authorTest' } })
  fireEvent.change(urlInput, { target: { value: 'urlTest' } })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('titleTest')
  expect(addBlog.mock.calls[0][0].author).toBe('authorTest')
  expect(addBlog.mock.calls[0][0].url).toBe('urlTest')
})
