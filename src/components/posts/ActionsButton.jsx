import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { apiUrl } from '../../config/constantsURL'
import { getAllPosts } from '../../apiRequests/getAllPosts'
import setAuthToken from '../../utils/setAuthToken'
import { openModal } from '../../redux/modal'
import { savePosts } from '../../redux/postsSlice'

function ActionsButton({ url, _id }) {
  const { accessToken } = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      setAuthToken(accessToken)
      const { data } = await axios.delete(`${apiUrl}/post/${_id}`)
      if (data.success) {
        getAllPosts(dispatch, accessToken, savePosts)
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleOpenEditModal = () => {
    dispatch(openModal(_id))
  }

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button" onClick={handleOpenEditModal}>
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={handleDelete}>
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  )
}

export default ActionsButton
