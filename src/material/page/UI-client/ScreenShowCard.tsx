import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardItem from './CardItem';
import './style/ScreenCard.css'
const ScreenCard = () => {
    const arr = [
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1200$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '' }
        , { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '1500$' },
        { img: require('../../image/clothing.png'), title: 'clothes', price: '1000$', priceDiscount: '' }
    ]
    return (
        <Container>
            <div className="wrapper-item">
                {arr.map(a => (<CardItem
                    img={a.img}
                    title={a.title}
                    priceDiscount={a.priceDiscount}
                    price={a.price}
                />))}
            </div>
        </Container>
    )
}

export default ScreenCard;