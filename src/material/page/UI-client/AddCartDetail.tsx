import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Add, Flag, Remove } from "@mui/icons-material";
import Axios from '../../Axios';
import './style/AddCartDetail.css'
import ItemColor from './ItemColor';
import ItemSize from './ItemSize'

const AddCartDetail = (props: any) => {
    const [colors, setColors] = useState([] as any);
    const [sizes, setSizes] = useState([] as any);
    const [quantity, setQuantity] = useState(1);
    const [isCheckColor, setIsCheckColor] = useState({ check: false, id: '' });
    const [isSelectSize, setIsSelectSize] = useState({ select: false, id: '', quantity: 0 })
    const [quantityClotheIsSelect, setQuantityClotheIsSelect] = useState(0);
    useEffect(() => {
        props.setShoppingCart({ ...props.shoppingCart, quantity_cart: quantity })
    }, [quantity])
    useEffect(() => {
        console.log(props.id_product);
        Axios.get('product/get-product-by-id?id= ' + props.id_product)
            .then((res) => {
                const Product = res.data;
                const tempArr = [] as any;
                let index = 0;
                Product.color.map((c: any) => {
                    tempArr[index] = {
                        id: c.id,
                        colorId: c.color.id,
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
        if (isCheckColor.id !== '') {
            setColors(
                colors.map((color: any) => {
                    if (color.colorId === isCheckColor.id && isCheckColor.check === true) {
                        props.setShoppingCart({
                            ...props.shoppingCart,
                            color: color.color
                        });
                        color.select = true;
                    } else {
                        color.select = false;
                    }
                    return color;
                })
            )
        }
        setQuantityClothe()
    }, [isCheckColor]);
    useEffect(() => {
        if (isSelectSize.id !== '' && isSelectSize.quantity !== 0) {
            setSizes(
                sizes.map((size: any) => {
                    if (size.id === isSelectSize.id) {
                        size.select = isSelectSize.select;
                        props.setShoppingCart({
                            ...props.shoppingCart,
                            id_product_color_size: size.id,
                            quantity_cart: quantity,
                            size: size.size
                        });
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
                            key={color.id}
                            id={color.id}
                            colorId={color.colorId}
                            img={require('../../image/' + color.img)}
                            color={color.color}
                            isCheck={color.select}
                            setIsCheck={setIsCheckColor}
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
                            key={s.id}
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