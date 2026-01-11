import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 

const Footer = () => {
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>© 2026 Notes App</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
