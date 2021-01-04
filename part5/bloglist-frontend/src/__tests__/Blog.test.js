import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import { Blog } from '../components/Blog'

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

    console.log(prettyDOM(toggleDiv))
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
