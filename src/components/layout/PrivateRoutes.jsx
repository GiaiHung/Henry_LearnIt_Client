import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />
}

export default PrivateRoutes
