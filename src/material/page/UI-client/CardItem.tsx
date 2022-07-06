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
                <span className="card_title">{props.title}</span>
                <div className="priceContainer">
                    <div className="card_discount">{props.priceDiscount}</div>
                    <div className="card_price">{props.price}</div>
                </div>
                <div className="cardBtnContainer">
                    <button className="card__btn" onClick={() => setOpenDialogCart(true)}><AddShoppingCart /></button>
                </div>
            </div>
            <CustomizedDialogs open={openDialogCart}
                setOpen={setOpenDialogCart}
                price={props.price}
                priceDiscount={props.priceDiscount}
                title={props.title}>
                <AddCartDetail price={props.price} />
            </CustomizedDialogs>
        </div>
    )
}
export default Card;