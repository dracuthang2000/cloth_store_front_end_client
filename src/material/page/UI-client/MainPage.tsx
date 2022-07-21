import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import CartDetail from './CartDetail/CartDetail';
import Error from './Error';
import NavigateHeader from './Header';
import ScreenCard from './ScreenShowCard';
interface CartTP {
    name: '',
    afterDiscountPrice: '',
    beforeDiscountPrice: '',
    id_product_color_size: ''
    quantity: '',
    color: '',
    size: ''
};
const MainPage = () => {
    const [cart, setCart] = useState<CartTP[]>([])
    useEffect(() => {
        if (cart.length !== 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart])
    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            setCart(JSON.parse(localStorage.getItem('cart') as any));
        }
    }, [])
    const handleClick = (item: any) => {
        let flag = true;
        setCart(cart.map((data: any) => {
            if (data.id_product_color_size === item.id_product_color_size) {
                data.quantity_cart = item.quantity_cart;
                flag = false;
            }
            return data;
        }))
        if (flag) {
            setCart([...cart, item]);
        }
    };
    return (
        <div className="main">
            <div>
                <NavigateHeader size={cart.length} cart={cart} />
            </div>
            <Container fluid style={{ paddingTop: '80px' }}>
                <Row>
                    <Routes>
                        <Route path='/shop/:tag_label/:tag' element={<Error />} />
                        <Route path='/' element={<ScreenCard handleClick={handleClick} />} />
                        <Route path='/cart' element={<CartDetail />} />
                    </Routes>
                </Row>
            </Container>
        </div>)
}

export default MainPage;