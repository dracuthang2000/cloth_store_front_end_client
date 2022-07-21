import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from '../../image/logo.png'
import './style/Header.css'
import NavigateBar from './NavigateBar'
import { Link } from "react-router-dom";
import { sizeHeight } from "@mui/system";

const Header = (props: any) => {
    return (
        <div className="content">
            <Row>
                <Col xl={1}></Col>
                <Col xl={1}>
                    <Link to={'/'}>
                        <img className="logo" src={logo} alt='logo' style={{ cursor: 'pointer' }} />
                    </Link>
                </Col>
                <Col xl={10}><div className="navigateBar"><NavigateBar size={props.size} cart={props.cart} /></div></Col>
            </Row>
        </div>
    )
}

export default Header;