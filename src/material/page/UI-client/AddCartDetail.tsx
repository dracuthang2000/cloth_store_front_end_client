import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Add, Remove } from "@mui/icons-material";
import './style/AddCartDetail.css'
const AddCartDetail = (props: any) => {

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);

    }
    const handleDecrease = () => {
        setQuantity(() => {
            if (quantity === 1) {
                return quantity;
            } else {
                return quantity - 1;
            }
        });
    }
    return (
        <Container style={{ width: '60vh', height: '50vh' }}>
            <Row>
                <Col>check</Col>
            </Row>
            <Row>
                <Col>
                    <div className='price-container'>
                        <span>{props.price}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='quantity-container'>
                        <span style={{ paddingRight: '10px', fontFamily: 'sans-serif' }}>Choose quantity:</span>
                        <label className={`input-group-prepend ${quantity === 1 ? 'disable' : ''}`}
                            style={{ borderRadius: '5px 0 0 5px', borderRight: 'none' }}
                            onClick={handleDecrease}><Remove /></label>
                        <label className='input-quantity'>{quantity}</label>
                        <label className='input-group-prepend'
                            style={{ borderRadius: '0 5px 5px 0', borderLeft: 'none' }}
                            onClick={handleIncrease}><Add /></label>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default AddCartDetail;