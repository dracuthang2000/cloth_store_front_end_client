import React, { useState } from "react";
import './style/ItemColor.css';
import { CircleOutlined, CheckCircle } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ItemColor = (props: any) => {
    const handleClickCheckBox = () => {
        props.setIsCheck(() => {
            return { check: true, id: props.id };
        })
    }
    console.log(props);
    return (
        <div className="container-item-color">
            <div className={`card ${props.isCheck ? 'is-select' : ''}`}>
                <img src={props.img} className="card-img" />
                <div className="card-color">
                    <label>{props.color}</label>
                </div>
            </div>
            <div className='card-checkbox' >
                <Checkbox
                    checked={props.isCheck}
                    onClick={() => { handleClickCheckBox() }}
                    {...label}
                    icon={<CircleOutlined />}
                    checkedIcon={<CheckCircle className="check-circle" />} />
            </div>
        </div >
    )
}

export default ItemColor;