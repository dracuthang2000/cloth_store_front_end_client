import React from "react";
import './DeliveryItem.css'
import { LocalShipping, HelpOutlineOutlined, PaidOutlined } from '@mui/icons-material'
import { Button } from "@mui/material";
import { AnyPtrRecord } from "dns";
function Items(props: any) {
    return (
        <div className="main">
            <div className="left">
                <img src={require('../../../image/clothing.png')} alt="" />
            </div>
            <div className="center">
                <div className="title">Balo du lịch Arctic Hunter chất liệu Oxford chống thấm nước - B00227</div>
                <div className="detail">
                    <span>Product classification: {"Black, "}{"Size: XXL"}</span>
                </div>
                <div className="quantity">x10</div>
            </div>
            <div className="right">
                <div></div>
                <div className="center-price">
                    <div className="price-after-discount">
                        <span>100000</span>
                    </div>
                </div>
                <div></div>
            </div>
        </div >
    )


}
const DeliveryItem = (props: any) => {
    return (
        <div className="container-delivery-card">
            <div className="card-deliver">
                <div className="header">
                    <div></div>
                    <div className="card-delivery-status">
                        <div className="notify-status">
                            <LocalShipping style={{ paddingRight: '5px' }} />
                            <span>Done delivery</span>
                        </div>
                        <span><HelpOutlineOutlined style={{ paddingLeft: '5px', fontSize: '22px' }} />|</span>
                        <span className="status">FINISHING</span>
                    </div>
                    <div></div>
                </div>
                <div className="items">
                    <Items

                    />
                    <Items />
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
                            <span className='price'>{100000}</span>
                        </div>
                    </div>
                </div>
                <div className="left">
                    <Button style={{ backgroundColor: '#ee4d2d', color: 'white' }}>BUY AGAIN</Button>
                    <Button>CANCELING</Button>
                    <Button>ORDER DETAIL</Button>
                </div>
            </div>
        </div>
    )
}
export default DeliveryItem;