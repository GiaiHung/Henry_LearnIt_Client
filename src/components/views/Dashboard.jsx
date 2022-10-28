import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePosts } from '../../redux/postsSlice'
import SinglePost from '../posts/SinglePost'
import AddPostModal from '../posts/AddPostModal'
import addIcon from '../../assets/plus-circle-fill.svg'
import { getAllPosts } from '../../apiRequests/getAllPosts'
import EditPostModal from '../posts/EditPostModal'

function Dashboard() {
  const { posts, postsLoading } = useSelector((state) => state.posts)
  const { username, accessToken } = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  let body
  useEffect(() => {
    getAllPosts(dispatch, accessToken, savePosts)
  }, [])

  if (posts?.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>Click the button below to track your first skill to learn</Card.Text>
            <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>LearnIt!</Button>
          </Card.Body>
        </Card>
      </>
    )
  } else if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col className="my-2" key={post._id}>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        <OverlayTrigger placement='left' overlay={<Tooltip>Create a new post</Tooltip>}>
          <Button className="btn-floating" onClick={() => setIsAddModalOpen(true)}>
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <EditPostModal />
    </>
  )
}

export default Dashboard
