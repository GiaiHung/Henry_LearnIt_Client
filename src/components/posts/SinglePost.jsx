import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import ActionsButton from './ActionsButton'

function SinglePost({ post: { _id, url, title, status, description } }) {
  return (
    <Card
      className="shadow"
      border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
    >
      <Card.Body>
        <Card.Title>
          <div className="collumn">
            <div>
              <p className="post-title">{title}</p>
              <Badge
                pill
                bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
              >
                {status}
              </Badge>
            </div>
            <div className="margin-right">
              <ActionsButton url={url} _id={_id} />
            </div>
          </div>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SinglePost
