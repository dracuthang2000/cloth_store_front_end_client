import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './Error';
import NavigateHeader from './Header';
import ScreenCard from './ScreenShowCard';

const MainPage = () => {
    return (
        <div className="main">
            <div style={{ width: '100%', position: 'fixed' }}>
                <NavigateHeader />
            </div>
            <Container fluid style={{ paddingTop: '80px' }}>
                <BrowserRouter>
                    <Row>
                        <Routes>
                            <Route path='/error' element={<Error />} />
                            <Route path='/' element={<ScreenCard />} />
                        </Routes>
                    </Row>
                </BrowserRouter>
            </Container>
        </div>)
}

export default MainPage;