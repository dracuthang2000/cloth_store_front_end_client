import React, { useState } from "react";
import { AddShoppingCart } from '@mui/icons-material'
import './style/CardItem.css';
import CustomizedDialogs from "./CustomDialog";
import AddCartDetail from "./AddCartDetail";
const Card = (props: any) => {
    const [openDialogCart, setOpenDialogCart] = useState(false);
    return (
        <div className="card-item">
            <img src={props.img} className="card__img" />
            <div className="card__body">
                <h2 className="card_title">{props.title}</h2>
                <p className="card__description">{props.description}</p>
                <div className="priceContainer">
                    <div className="card_discount">{props.priceDiscount}</div>
                    <div className="card_price">{props.price}</div>
                </div>
                <div className="cardBtnContainer">
                    <button className="card__btn" onClick={() => setOpenDialogCart(true)}><AddShoppingCart /></button>
                </div>
            </div>
            <CustomizedDialogs open={openDialogCart} setOpen={setOpenDialogCart} title={'Add to cart'}><AddCartDetail price={props.price} /></CustomizedDialogs>
        </div>
    )
}
export default Card;