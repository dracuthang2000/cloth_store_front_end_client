import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import CartDetail from './CartDetail/CartDetail';
import Error from './Error';
import NavigateHeader from './Header';
import ScreenCard from './ScreenShowCard';
import DeliveryState from './delivery/DeliveryState';
import DeliveryDetail from './delivery/DeliveryDetail';
import ChangeReceiver from './ReceiverInfo';
import ProductScreen from './product/ProductScreen';
import SearchScreen from './product/SearchScreen';
import SignUp from './signUp/SignUp';
interface CartTP {
    name: '',
    afterDiscountPrice: '',
    beforeDiscountPrice: '',
    id_product_color_size: ''
    quantity: '',
    color: '',
    size: '',
    img: '',
};
const MainPage = () => {
    const [cart, setCart] = useState<CartTP[]>([])
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    useEffect(() => {
        console.log(cart);
        if (cart.length !== 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
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
                <NavigateHeader size={cart.length} cart={cart} accessToken={accessToken} setAccessToken={setAccessToken} />
            </div>
            <Container fluid style={{ paddingTop: '80px' }}>
                <Row>
                    <Routes>
                        <Route path='/shop/:tag_label/:tag' element={<Error />} />
                        <Route path='/' element={<ScreenCard handleClick={handleClick} />} />
                        <Route path='/cart' element={<CartDetail setAccessToken={setAccessToken} setCart={setCart} />} />
                        <Route path='/product' element={<ProductScreen handleClick={handleClick} />}></Route>
                        <Route path='/search/:keyword' element={<SearchScreen handleClick={handleClick} />}></Route>
                        <Route path='/sign-up' element={<SignUp setAccessToken={setAccessToken} />} />
                        {accessToken && <><Route path='/order/delivery-status' element={<DeliveryState />} />
                            <Route path='/order/delivery-detail' element={<DeliveryDetail />} />
                            <Route path='/cart/edit-receiver-information' element={<ChangeReceiver />} /></>}
                    </Routes>
                </Row>
            </Container>
        </div>)
}

export default MainPage;