import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Add, Flag, Remove } from "@mui/icons-material";
import Axios from '../../Axios';
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
    const [colors, setColors] = useState([] as any);
    const [sizes, setSizes] = useState([] as any);
    const [quantity, setQuantity] = useState(1);
    const [isCheck, setIsCheck] = useState({ check: false, id: '' });
    const [isSelectSize, setIsSelectSize] = useState({ select: false, id: '', quantity: 0 })
    const [quantityClotheIsSelect, setQuantityClotheIsSelect] = useState(0);
    useEffect(() => {
        Axios.get('product/get-product-by-id?id= ' + props.id_product)
            .then((res) => {
                const Product = res.data;
                const tempArr = [] as any;
                let index = 0;
                Product.color.map((c: any) => {
                    tempArr[index] = {
                        id: c.color.id,
                        img: c.img,
                        color: c.color.color,
                        select: false
                    }
                    index++;
                })
                tempArr.sort((a: any, b: any) => {
                    return a.id - b.id;
                })
                tempArr[0].select = true;
                setColors(tempArr);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const setQuantityClothe = () => {
        let flag = true;
        sizes.forEach((s: any) => {
            if (isSelectSize.id !== '') {
                if (s.id === isSelectSize.id && isSelectSize.quantity !== 0) {
                    setQuantityClotheIsSelect(s.quantity);
                }
                if (s.select === true) {
                    flag = false;
                    if (quantity === 0) {
                        setQuantity(1);
                    }
                }
            }
        });
        if (flag && isSelectSize.id !== '') {
            setQuantity(0);
        }

    }
    const handleIncrease = () => {
        setQuantityClothe()
        setQuantity(() => {
            if (quantity !== 0) {
                if (quantity + 1 > quantityClotheIsSelect && quantityClotheIsSelect !== 0) {
                    return quantity;
                } else {
                    return quantity + 1;
                }
            };
            return quantity;
        });
    }
    const handleDecrease = () => {
        setQuantity(() => {
            if (quantity <= 1) {
                return quantity;
            } else {
                return quantity - 1;
            }
        });
    }
    useEffect(() => {
        if (isCheck.id !== '') {
            setColors(
                colors.map((color: any) => {
                    if (color.id === isCheck.id && isCheck.check === true) {
                        color.select = true;
                    } else {
                        color.select = false;
                    }
                    return color;
                })
            )
        }
        setQuantityClothe()
    }, [isCheck]);
    useEffect(() => {
        if (isSelectSize.id !== '' && isSelectSize.quantity !== 0) {
            setSizes(
                sizes.map((size: any) => {
                    if (size.id === isSelectSize.id) {
                        size.select = isSelectSize.select;
                    } else {
                        size.select = false;
                    }
                    return size;
                })
            )
        }
        setQuantityClothe()
    }, [isSelectSize]);
    return (
        <Container style={{ width: '60vh', height: '50vh' }}>
            <Row>
                <div className='choose-color'>
                    <label>Choose color: </label>
                </div>
                <div className='wrapper-item-color'>
                    {colors.map((color: any) => (
                        <ItemColor
                            id={color.id}
                            img={require('../../image/' + color.img)}
                            color={color.color}
                            isCheck={color.select}
                            setIsCheck={setIsCheck}
                            setSizes={setSizes}
                            setIsSelectSize={setIsSelectSize}
                        />
                    ))}

                </div>
            </Row>
            <Row>
                <div className='choose-color'>
                    <label>Choose size: </label>
                </div>
                <div className='wrapper-item-color'>
                    {sizes.map((s: any) => (
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
                        <label className={`input-group-prepend ${quantity <= 1 ? 'disable' : ''}`}
                            style={{ borderRadius: '5px 0 0 5px', borderRight: 'none' }}
                            onClick={handleDecrease}><Remove /></label>
                        <label className='input-quantity'>{quantity}</label>
                        <label className={`input-group-prepend ${(quantity + 1 > quantityClotheIsSelect && quantityClotheIsSelect !== 0) || quantity == 0 ? 'disable' : ''}`}
                            style={{ borderRadius: '0 5px 5px 0', borderLeft: 'none' }}
                            onClick={handleIncrease}><Add /></label>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}
export default AddCartDetail;