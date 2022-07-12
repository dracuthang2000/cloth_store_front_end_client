import React, { useState } from "react";
import { AddShoppingCart } from '@mui/icons-material'
import './style/CardItem.css';
import CustomizedDialogs from "./CustomDialog";
import AddCartDetail from "./AddCartDetail";
import { Link, useNavigate } from "react-router-dom";
const Card = (props: any) => {
    const navigate = useNavigate();
    const [openDialogCart, setOpenDialogCart] = useState(false);
    const priceDiscount = (price: any, discount_percent: any) => {
        const priceAfterDiscount = price - ((price * discount_percent) / 100);
        return new Intl.NumberFormat().format(priceAfterDiscount);
    }
    return (
        <div className="card-item" title={props.title}>
            <img src={props.img} className="card__img" />
            <div className="card__body">
                <div className="card__title" >
                    <span onClick={() => { navigate(`/shop/${props.tag_label}/${props.tag}`) }}>{props.title}</span>
                </div>
                <div className="priceContainer">
                    <div className="card__price">{props.discount_percent ? (priceDiscount(props.price_current, props.discount_percent)) : new Intl.NumberFormat().format(props.price_current)}</div>
                    {props.discount_percent ? <div className="card__discount">{new Intl.NumberFormat().format(props.price_current)}</div> : null}
                </div>
                <div className="cardBtnContainer">
                    <button className="card__btn" onClick={() => setOpenDialogCart(true)}><AddShoppingCart /></button>
                </div>
            </div>
            {props.is_new ? (<div className="circle-notify">
                <span>NEW</span>
            </div>) : null}
            {props.discount_percent ? <div className="discount-notify">
                <span>{props.discount_percent}</span>
            </div> : null}
            <CustomizedDialogs open={openDialogCart}
                setOpen={setOpenDialogCart}
                price_discount={props.discount_percent ? (priceDiscount(props.price_current, props.discount_percent)) : new Intl.NumberFormat().format(props.price_current)}
                price_current={props.discount_percent ? new Intl.NumberFormat().format(props.price_current) : null}
                title={props.title}>
                <AddCartDetail id_product={props.id} />
            </CustomizedDialogs>
        </div>
    )
}
export default Card;