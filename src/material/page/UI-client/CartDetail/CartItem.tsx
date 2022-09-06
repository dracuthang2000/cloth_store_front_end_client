import { Button } from "@mui/material";
import { Delete, Remove, Add, PowerInputSharp } from '@mui/icons-material'
import BpCheckbox from "./BbCheckBox";
import React, { useEffect, useState } from "react";
import './CartItem.css'
import Axios from "../../../Axios";
const CartItem = (props: any) => {
    const [quantity, setQuantity] = useState(props.item.quantity);
    const [quantityInStock, setQuantityInStock] = useState('' as any);
    const [loadingQuantityStock, setLoadingQuantityStock] = useState(true);
    const loadQuantityInStock = () => {
        if (loadingQuantityStock) {
            Axios.get(`product/get-quantity-in-stock`, {
                params: {
                    id: props.item.id
                }
            }).then(res => {
                setQuantityInStock(res.data);
                setLoadingQuantityStock(false);
            }).catch(e => {

            })
        }
    }
    useEffect(() => {
        loadQuantityInStock();
    }, [loadingQuantityStock])
    const handleDecrease = () => {
        setQuantity(() => {
            if (quantity <= 1) {
                return quantity;
            } else {
                return quantity - 1;
            }
        });
    }
    const handleIncrease = () => {
        setQuantity(() => {
            if (quantity !== 0) {
                if (quantity + 1 > quantityInStock) {
                    alert("Over stock")
                    return quantity;
                } else {
                    return quantity + 1;
                }
            };
            return quantity;
        });
        // setShoppingCart({ ...[shoppingCart], quantity_cart: quantity })
    }
    useEffect(() => {
        props.item.quantity = quantity;
        props.handleChangeQuantity(props.item);
    }, [quantity])
    const handleSelect = () => {
        props.item.select = !props.item.select;
        props.handleSelectItem(props.item);
    }
    return (
        <div className="card-item" id='cart-card-item'>
            <div className="left">
                <div></div>
                <div><BpCheckbox checked={props.item.select} onClick={handleSelect} /></div>
                <div></div>
            </div>
            <div className="center">
                <div className="top">
                    <img src={`http://localhost:8081/api/product/image/load/${props.item.img}`} />
                </div>
                <div className="bottom">
                    <div className="priceAfterDiscount"><span>{props.item.afterDiscountPrice ? new Intl.NumberFormat().format(props.item.afterDiscountPrice) :
                        new Intl.NumberFormat().format(props.item.beforeDiscountPrice)}</span></div>
                    {props.item.afterDiscountPrice ?
                        <div className="priceBeforeDiscount"><span>{new Intl.NumberFormat().format(props.item.beforeDiscountPrice)}</span></div> : <></>
                    }
                </div>
            </div>
            <div className="right">
                <div className='title'><span>{props.item.name}</span></div>
                <div className='detail'>
                    <span>Color: {props.item.color}</span>
                    <span>Size: {props.item.size}</span>
                </div>
                <div className='quantity-container'>
                    <label className={`input-group-prepend ${quantity <= 1 ? 'disable' : ''}`}
                        style={{ borderRadius: '5px 0 0 5px', borderRight: 'none' }}
                        onClick={handleDecrease}><Remove /></label>
                    <label className='input-quantity'>{quantity}</label>
                    <label className={`input-group-prepend ${quantity === 0 ? 'disable' : ''}`}
                        style={{ borderRadius: '0 5px 5px 0', borderLeft: 'none' }}
                        onClick={handleIncrease}><Add /></label>
                </div>
                <div className="total">
                    <p>Total: </p>
                    <span>{props.item.afterDiscountPrice ? new Intl.NumberFormat().format(quantity * props.item.afterDiscountPrice)
                        : new Intl.NumberFormat().format(quantity * props.item.beforeDiscountPrice)}</span>
                </div>
                <div className="btn-item">
                    <Button
                        onClick={() => props.handleRemove(props.item)}
                        style={{ width: '50px', position: 'absolute', right: '0px', top: '-40px' }}>
                        <Delete />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default CartItem;