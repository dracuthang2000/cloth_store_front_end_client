import React, { useState, useEffect } from "react";
import './DeliveryItem.css'
import { LocalShipping, HelpOutlineOutlined, PaidOutlined } from '@mui/icons-material'
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";
function Items(props: any) {
    return (
        <div className="main">
            <div className="left">
                <img src={require('../../../image/clothing.png')} alt="" />
            </div>
            <div className="center">
                <div className="title">{props.item.product_color_size.color.product.product_name}</div>
                <div className="detail">
                    <span>Product classification: {`${props.item.product_color_size.color.color.color}, `}{`Size ${props.item.product_color_size.size.size}`}</span>
                </div>
                <div className="quantity">{"X" + props.item.quantity}</div>
            </div>
            <div className="right">
                <div></div>
                <div className="center-price">
                    <div className="price-after-discount">
                        <span>{Intl.NumberFormat().format(props.item.quantity * props.item.unit_price)}</span>
                    </div>
                </div>
                <div></div>
            </div>
        </div >
    )
}
const DeliveryItem = (props: any) => {
    const navigate = useNavigate();
    const handleClickDetail = () => {
        navigate('/order/delivery-detail', {
            state: {
                id_bill: props.item.id,
            }
        });
    }
    return (
        <div className="container-delivery-card">
            <div className="card-deliver">
                <div className="header">
                    <div></div>
                    <div className="card-delivery-status">
                        <div className="notify-status">
                            <LocalShipping style={{ paddingRight: '5px' }} />
                            <span>{props.item.state === 'PRO' ? 'Order is processing' :
                                props.item.state === 'FIN' ? 'Order is finishing' :
                                    props.item.state === 'DEL' ? 'Order is delivering' :
                                        'Order is canceling'}</span>
                        </div>
                        <span>
                            <Tooltip title={`Date: ${props.item.date}`} arrow>
                                <HelpOutlineOutlined style={{ paddingLeft: '5px', fontSize: '22px' }} />
                            </Tooltip>
                            |
                        </span>
                        <span className="status">{
                            props.item.state === 'PRO' ? 'PROCESSING' :
                                props.item.state === 'FIN' ? 'FINISHING' :
                                    props.item.state === 'DEL' ? 'DELIVERING' :
                                        'CANCELING'}</span>
                    </div>
                    <div></div>
                </div>
                <div className="items">
                    {props.item.bill_product_details.map((item: any) => <Items item={item} />)}
                </div>
            </div>
            <div className="card-deliver-footer">
                <div className="right">
                    <div className="total">
                        <div></div>
                        <div></div>
                        <div>
                            <PaidOutlined sx={{ paddingRight: '5px', fontSize: '24px' }} />
                            <span>Total: </span>
                            <span className='price'>{Intl.NumberFormat().format(props.item.total)}</span>
                        </div>
                    </div>
                </div>
                <div className="left">
                    <Button style={{ backgroundColor: '#ee4d2d', color: 'white' }}>BUY AGAIN</Button>
                    <Button>CANCELING</Button>
                    <Button onClick={handleClickDetail}>ORDER DETAIL</Button>
                </div>
            </div>
        </div>
    )
}
export default DeliveryItem;