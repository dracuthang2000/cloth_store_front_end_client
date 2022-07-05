import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'
import { ExpandMore, Search } from '@mui/icons-material'
import { Row, Col, Container, Form } from 'react-bootstrap'
import './style/Navigate.css'
import CustomizedDialogs from "./CustomDialog";



const Navigate = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showUser, setShowUser] = useState(false);
    return (
        <Container>
            <div className="navbar-design">
                <Row>
                    <Col xl={5}>
                        <Nav className="me-auto">
                            <Nav.Link style={{ paddingTop: '0px' }} href="#home">HOME</Nav.Link>
                            <Nav.Link style={{ paddingTop: '0px' }} href="#features">PRODUCT</Nav.Link>
                            <Nav.Link style={{ paddingTop: '0px' }} href="#pricing">GENDER<ExpandMore /></Nav.Link>
                            <Nav.Link style={{ paddingTop: '0px' }} href="#pricing">LABEL <ExpandMore /></Nav.Link>
                        </Nav>
                    </Col>
                    <Col xl={3}>
                        {showSearch ? (<input className="form-control" style={{ marginTop: '20px' }} placeholder={"search clothes ..."}></input>) : <></>}
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
                            <Nav.Link style={{ paddingTop: '0px' }} onClick={() => { setShowUser(true) }}><FaUser /></Nav.Link>
                            <CustomizedDialogs open={showUser} setOpen={setShowUser} title={'Login'}>Hey</CustomizedDialogs>
                            <Nav.Link style={{ paddingTop: '0px' }} href="#pricing"><FaShoppingCart /></Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Navigate;