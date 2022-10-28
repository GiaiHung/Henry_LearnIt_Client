import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <h2 className='text-center'>About</h2>
        <p className='text'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum natus quasi non
          necessitatibus nesciunt et voluptate a est aliquam id, esse, ratione inventore
          reprehenderit. Odit qui ratione consequatur voluptates tempora eum repudiandae omnis minus
          sint illum architecto animi, vero rerum molestias hic fugiat ipsum? Doloremque deleniti
          aspernatur iusto esse. Doloremque porro obcaecati architecto aut vel autem.
        </p>
        <Button variant="primary" href="https://www.youtube.com/c/HenryWebDev" size="lg">
          Visit my channel for more tutorials
        </Button>
      </Col>
    </Row>
  )
}

export default About
