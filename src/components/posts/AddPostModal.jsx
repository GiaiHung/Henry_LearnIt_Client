import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { savePosts } from '../../redux/postsSlice'
import { getAllPosts } from '../../apiRequests/getAllPosts'
import { apiUrl } from '../../config/constantsURL'
import setAuthToken from '../../utils/setAuthToken'

function AddPostModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state) => state.auth.user)
  const [post, setPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN',
  })
  const { title, description, url } = post
  const onChangePostCreate = (e) => setPost({ ...post, [e.target.name]: e.target.value })
  const handleCreatePost = async (e) => {
    e.preventDefault()

    try {
      setAuthToken(accessToken)
      const { data } = await axios.post(`${apiUrl}/post`, post)
      if (data.success) {
        getAllPosts(dispatch, accessToken, savePosts)
      }
      toast.success(data.message)
      setIsOpen(false)
      setPost({ title: '', description: '', url: '', status: 'TO LEARN' })
    } catch (error) {
      toast.error(error.message)
      setIsOpen(false)
      setPost({ title: '', description: '', url: '', status: 'TO LEARN' })
    }
  }

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreatePost}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangePostCreate}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangePostCreate}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangePostCreate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreatePost}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddPostModal
