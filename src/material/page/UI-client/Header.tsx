import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from '../../image/logo.png'
import './style/Header.css'
import NavigateBar from './NavigateBar'

const Header = () => {
    return (
        <div className="content">
            <Container fluid className="container-header">
                <Row>
                    <Col xl={1}></Col>
                    <Col xl={1}>
                        <img className="logo" src={logo} alt='logo' style={{ cursor: 'pointer' }} />
                    </Col>
                    <Col xl={10}><div className="navigateBar"><NavigateBar /></div></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;