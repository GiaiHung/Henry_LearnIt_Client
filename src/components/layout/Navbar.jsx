import axios from 'axios'
import toast from 'react-hot-toast'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import logo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { logout } from '../../redux/authSlice'

function NavbarMenu() {
  const { username } = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
    delete axios.defaults.headers.common['Authorization']
    toast.success('Log out successfully!')
  }
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand
        className="font-weight-bolder text-white logo"
        onClick={() => navigate('/dashboard')}
      >
        <img src={logo} alt="learnItLogo" width="32" height="32" className="mr-2" />
        LearnIt
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="margin-left">
          <Nav.Link className="font-weight-bolder text-white" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className="font-weight-bolder text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="logoutIcon" width="32" height="32" className="mr-2" />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarMenu
