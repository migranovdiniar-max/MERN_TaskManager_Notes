import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className='main'>
        <Container>
            <Row>
                <div className='intro-text'>
                    <div>
                        <h1 className='title'>Welcome to Notes App</h1>
                        <p className='subtitle'>One Safe place for all your notes</p>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage