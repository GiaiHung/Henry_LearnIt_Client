import axios from 'axios'
import { apiUrl } from '../config/constantsURL'
import setAuthToken from '../utils/setAuthToken'

export const getAllPosts = async (dispatch, accessToken, actions) => {
  setAuthToken(accessToken)
  try {
    const { data } = await axios.get(`${apiUrl}/post`)
    if (data.success) {
      dispatch(actions(data.posts))
    }
  } catch (error) {}
}
