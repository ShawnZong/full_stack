import React, { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import blogService from '../services/blogs'

const CommentList = ({ comments }) => {
  return (
    <ListGroup>
      {comments.map((comment, index) => (
        <ListGroup.Item key={index}>{comment}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}
const NewCommentForm = ({ comments, setCommentsTmp }) => {
  const [comment, setComment] = useState('')
  const blogMatch = useRouteMatch('/blogs/:id')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await blogService.createComment(blogMatch.params.id, { comment: comment })
    setCommentsTmp(comments.concat(comment))
    setComment('')
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group>
          <Form.Control
            required
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}
const CommentSection = ({ comments }) => {
  const [commentsTmp, setCommentsTmp] = useState(comments)
  return (
    <div>
      <h2>Comments</h2>
      <NewCommentForm comments={commentsTmp} setCommentsTmp={setCommentsTmp} />
      <CommentList comments={commentsTmp} />
    </div>
  )
}

export { CommentSection, CommentList, NewCommentForm }
