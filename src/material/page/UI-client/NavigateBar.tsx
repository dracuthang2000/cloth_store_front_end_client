import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'
import { ExpandMore, Search } from '@mui/icons-material'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import './style/Navigate.css'
import LoginDialog from './login/LoginDialog'
import { Avatar } from "@mui/material";
import DropDownUser from "./dropdown/DropDownUser";




const Navigate = (props: any) => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [showUser, setShowUser] = useState(false);
    return (
        <div className="navbar-design">
            <Row>
                <Col xl={5}>
                    <Nav className="me-auto">
                        <Nav.Link style={{ paddingTop: '0px' }} as={Link} to={'/'}>HOME</Nav.Link>
                        <Nav.Link style={{ paddingTop: '0px' }} as={Link} to={'/error'}>PRODUCT</Nav.Link>
                        <Nav.Link style={{ paddingTop: '0px' }} href="#pricing">GENDER<ExpandMore /></Nav.Link>
                        <Nav.Link style={{ paddingTop: '0px' }} href="#pricing">LABEL <ExpandMore /></Nav.Link>
                    </Nav>
                </Col>
                <Col xl={3}>
                    {showSearch ? (<input className="form-control" style={{ position: 'absolute', top: '25px', width: '330px' }} placeholder={"search clothes ..."}></input>) : <></>}
                </Col>
                <Col xl={4}>
                    <Nav className="me-auto">
                        <Nav.Link style={{ paddingTop: '0px' }} onClick={() => {
                            if (showSearch === false) {
                                setShowSearch(true)
                            } else {
                                setShowSearch(false)
                            }
                        }} title='search'>
                            <Search />
                        </Nav.Link>
                        <Nav.Link style={{ paddingTop: '0px' }} onClick={() => navigate('/cart')} >
                            <div className="containerCart">
                                <FaShoppingCart />
                                {props.size > 0 ?
                                    <div className="iconCount">
                                        <span>{props.size}</span>
                                    </div> : <></>}
                            </div>
                        </Nav.Link>
                        {props.accessToken === null ?
                            <Nav.Link style={{ paddingTop: '0px' }} onClick={() => { setShowUser(true) }}><FaUser /></Nav.Link>
                            : <Nav.Link style={{ position: 'absolute', right: '60px', top: '-15px' }}><DropDownUser setAccessToken={props.setAccessToken} /></Nav.Link>}
                        <LoginDialog open={showUser} setOpen={setShowUser} title={'Login'} setAccessToken={props.setAccessToken} />
                    </Nav>
                </Col>
            </Row>
        </div>
    )
}

export default Navigate;