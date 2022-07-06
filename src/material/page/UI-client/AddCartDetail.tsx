import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Add, Remove } from "@mui/icons-material";
import './style/AddCartDetail.css'
import ItemColor from './ItemColor';
import ItemSize from './ItemSize'
const AddCartDetail = (props: any) => {

    const arr = [
        { id: '1', img: require('../../image/clothing.png'), color: 'white', select: true },
        { id: '2', img: require('../../image/clothing.png'), color: 'Green', select: false },
        { id: '3', img: require('../../image/clothing.png'), color: 'Red', select: false },
        { id: '4', img: require('../../image/clothing.png'), color: 'Blue', select: false },
    ]
    const arrSize = [
        { id: '1', size: 'XS', quantity: 100, select: true },
        { id: '2', size: 'S', quantity: 95, select: false },
        { id: '3', size: 'M', quantity: 1000, select: false },
        { id: '4', size: 'L', quantity: 50, select: false },
        { id: '5', size: 'XL', quantity: 60, select: false },
        { id: '6', size: 'XXL', quantity: 10, select: false }];
    const [colors, setColors] = useState(arr);
    const [sizes, setSizes] = useState(arrSize);
    const [quantity, setQuantity] = useState(1);
    const [isCheck, setIsCheck] = useState({ check: false, id: '' });
    const [isSelectSize, setIsSelectSize] = useState({ select: false, id: '' })
    const [quantityClotheIsSelect, setQuantityClotheIsSelect] = useState(0);
    const setQuantityClothe = () => {
        sizes.forEach(s => {
            if (isSelectSize.id !== '') {
                if (s.id === isSelectSize.id) {
                    setQuantityClotheIsSelect(s.quantity);
                }
            }
        });
    }
    const handleIncrease = () => {
        setQuantityClothe()
        setQuantity(() => {
            if (quantity + 1 > quantityClotheIsSelect && quantityClotheIsSelect !== 0) {
                return quantity;
            } else {
                return quantity + 1;
            }
        });
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
    useEffect(() => {
        if (isCheck.id !== '') {
            arr.forEach(color => {
                if (color.id === isCheck.id && isCheck.check === true) {
                    color.select = true;
                    console.log('check');
                } else {
                    color.select = false;
                }
            })
        }
        setColors(arr);
        setQuantityClothe()
    }, [isCheck]);
    useEffect(() => {
        if (isSelectSize.id !== '') {
            arrSize.forEach(size => {
                if (size.id === isSelectSize.id && isSelectSize.select === true) {
                    size.select = true;
                } else {
                    size.select = false;
                }
            })
        }
        setSizes(arrSize);
        setQuantityClothe()
    }, [isSelectSize]);
    return (
        <Container style={{ width: '60vh', height: '50vh' }}>
            <Row>
                <div className='choose-color'>
                    <label>Choose color: </label>
                </div>
                <div className='wrapper-item-color'>
                    {colors.map((color) => (
                        <ItemColor
                            id={color.id}
                            img={color.img}
                            color={color.color}
                            isCheck={color.select}
                            setIsCheck={setIsCheck}
                        />
                    ))}

                </div>
            </Row>
            <Row>
                <div className='choose-color'>
                    <label>Choose size: </label>
                </div>
                <div className='wrapper-item-color'>
                    {sizes.map((s) => (
                        <ItemSize
                            id={s.id}
                            size={s.size}
                            quantity={s.quantity}
                            select={s.select}
                            setIsSelectSize={setIsSelectSize}
                        />
                    ))}

                </div>
            </Row>
            <Row>
                <Col>
                    <div className='quantity-container'>
                        <span style={{ paddingRight: '10px', fontWeight: 600 }}>Choose quantity:</span>
                        <label className={`input-group-prepend ${quantity === 1 ? 'disable' : ''}`}
                            style={{ borderRadius: '5px 0 0 5px', borderRight: 'none' }}
                            onClick={handleDecrease}><Remove /></label>
                        <label className='input-quantity'>{quantity}</label>
                        <label className={`input-group-prepend ${quantity + 1 > quantityClotheIsSelect && quantityClotheIsSelect !== 0 ? 'disable' : ''}`}
                            style={{ borderRadius: '0 5px 5px 0', borderLeft: 'none' }}
                            onClick={handleIncrease}><Add /></label>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}
export default AddCartDetail;