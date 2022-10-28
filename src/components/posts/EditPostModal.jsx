import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { savePosts } from '../../redux/postsSlice'
import { getAllPosts } from '../../apiRequests/getAllPosts'
import { apiUrl } from '../../config/constantsURL'
import setAuthToken from '../../utils/setAuthToken'
import { closeModal } from '../../redux/modal'

function EditPostModal() {
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state) => state.auth.user)
  const { posts } = useSelector((state) => state.posts)
  const { isOpen, id } = useSelector((state) => state.modal)
  const postDefault = {
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN',
  }
  const currentPost = posts.find((post) => post._id === id) || postDefault
  const [post, setPost] = useState(postDefault)
  const { title, description, url, status, _id } = post
  const onChangePostEdit = (e) => setPost({ ...post, [e.target.name]: e.target.value })
  const handleEditPost = async (e) => {
    e.preventDefault()

    try {
      setAuthToken(accessToken)
      const { data } = await axios.put(`${apiUrl}/post/${currentPost._id}`, post)
      if (data.success) {
        getAllPosts(dispatch, accessToken, savePosts)
      }
      toast.success(data.message)
      dispatch(closeModal())
      setPost({ title: '', description: '', url: '', status: 'TO LEARN' })
    } catch (error) {
      toast.error(error.message)
      dispatch(closeModal())
      setPost({ title: '', description: '', url: '', status: 'TO LEARN' })
    }
  }

  useEffect(() => {
    setPost({
      title: currentPost?.title,
      description: currentPost?.description,
      url: currentPost?.url,
      status: currentPost?.status,
    })
  }, [isOpen])

  return (
    <Modal show={isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Update your progress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditPost}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangePostEdit}
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
              onChange={onChangePostEdit}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangePostEdit}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            name='status'
            value={status}
            onChange={onChangePostEdit}
          >
            <option>{post.status}</option>
            <option value="TO LEARN">TO LEARN</option>
            <option value="LEARNING">LEARNING</option>
            <option value="LEARNED">LEARNED</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditPost}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditPostModal
