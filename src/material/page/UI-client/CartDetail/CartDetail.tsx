import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FormControlLabel } from "@mui/material";
import BpCheckbox from "./BbCheckBox";
import './CardDetail.css'
import CartItem from "./CartItem";
import { Delete, LocationOn, Settings } from "@mui/icons-material";
import LoginDialog from "../login/LoginDialog";
import DialogPayMent from "./DialogPayment";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../Axios";
import Header from "../Header";
import { ObjectFlags } from "typescript";

interface initialCustomer {
    id: string,
    first_name: string,
    last_name: string,
    mail: string,
    phone_number: string,
    address: string
}

interface initialReceiver {
    receiver: initialCustomer
}

interface items {
    id: number,
    afterDiscountPrice: number,
    beforeDiscountPrice: number,
    name: string,
    quantity: number,
    size: string,
    color: string,
    img: string,
    select: false
}

const CartDetail = (props: any) => {
    const [cartItems, setCartItems] = useState<Partial<items>[]>([]);
    const [productIsChoose, setProductIsChoose] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [checkOut, setCheckOut] = useState(false);
    const [customer, setCustomer] = useState<Partial<initialCustomer>>();
    const redirect = useNavigate();
    const location = useLocation();
    const handleSelectItem = (item: items) => {
        console.log(item);
        setCartItems(cartItems.map((data) => {
            if (item.id === data.id) {
                data.select = item.select;
                if (item.select === false) {
                    setProductIsChoose(productIsChoose - 1);
                    setSelectAll(false);
                } else {
                    setProductIsChoose(productIsChoose + 1);
                }
            }
            return data;
        }));
    }
    const handleChangeSelectAll = (e: any) => {
        setSelectAll(e.target.checked);
        if (e.target.checked === true) {
            setProductIsChoose(cartItems.length)
        } else {
            setProductIsChoose(0)
        }
        setCartItems(cartItems.map((data: any) => {
            data.select = e.target.checked;
            return data;
        }));
    }
    useEffect(() => {
        let listCart = JSON.parse(localStorage.getItem('cart')!);
        if (listCart) {
            setCartItems(listCart.map((data: any) => {
                return {
                    id: data.id_product_color_size,
                    afterDiscountPrice: data.afterDiscountPrice,
                    beforeDiscountPrice: data.beforeDiscountPrice,
                    name: data.name,
                    quantity: data.quantity,
                    size: data.size,
                    color: data.color,
                    img: data.img,
                    select: false
                }
            }))
        }
    }, []);
    useEffect(() => {
        var flag = true;
        cartItems.forEach((data: any) => {
            if (data.select === false) {
                flag = false;
                return;
            }
        });
        setSelectAll(flag);
        setTotal(totalPrice);
    }, [cartItems])

    useEffect(() => {
        if (location.state === null) {
            Axios.get("customer/information/me", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then(res => {
                    let customerTemp = res.data;
                    setCustomer({
                        ...customer,
                        id: customerTemp.id,
                        first_name: customerTemp.first_name
                        , last_name: customerTemp.last_name,
                        address: customerTemp.address,
                        mail: customerTemp.mail,
                        phone_number: customerTemp.phone_number
                    })
                }).catch(error => {
                    console.log(error);
                })
        } else {
            const receiver = location.state as initialReceiver
            setCustomer(receiver.receiver);
        }
    }, [localStorage.getItem("accessToken")])

    const totalPrice = () => {
        let totalTemp = 0;
        cartItems.forEach((cart: any) => {
            if (cart.select) {
                if (cart.afterDiscountPrice) {
                    totalTemp = cart.quantity * cart.afterDiscountPrice + totalTemp;
                } else {
                    totalTemp = cart.quantity * cart.beforeDiscountPrice + totalTemp;
                }
            }
        });
        return totalTemp;
    }
    const handleChangeQuantity = (item: any) => {
        setCartItems(cartItems.map((data: any) => {
            if (data.id === item.id) {
                data.quantity = item.quantity;
            }
            return data;
        }))
    }
    const handleRemove = (item: any) => {
        props.setCart(cartItems.filter((data: any) => data.id !== item.id));
        setCartItems(cartItems.filter((data: any) => data.id !== item.id));
        if (cartItems.length === 1) {
            props.setCart([])
            localStorage.removeItem('cart');
        }
        setProductIsChoose(productIsChoose > 0 ? productIsChoose - 1 : productIsChoose);
    }
    const handleBuy = () => {
        if (localStorage.getItem('accessToken') === null) {
            setCheckLogin(true);
        } else {
            // getExchange();
            // console.log('abc', exchangeValue);
            setOpenPayment(true);
        }
    }
    const handleEditInfoReceiver = () => {
        redirect(`edit-receiver-information`,
            {
                state:
                {
                    receiver: customer
                }
            });
    }
    const customerOrder = (cart: any) => {
        let arrTemp = [{}];
        arrTemp = cartItems.filter((data: any) => data.select === true);
        let arrBill = [{}] as any;
        console.log('log', arrTemp);
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth() + 1 < 10 ? `0${current.getMonth() + 1}` : `${current.getMonth() + 1}`}-${current.getDate() < 10 ? `0${current.getDate()}` : `${current.getDate()}`}`;
        console.log(date);

        arrBill = arrTemp.map(function (data: any) {
            return {
                id_product_color_size: data.id,
                quantity: data.quantity,
                unit_price: data.afterDiscountPrice ? data.afterDiscountPrice : data.beforeDiscountPrice,
            }
        });
        Axios.post("bill/create-bill", {
            bill_product_details: arrBill,
            date: date,
            id_customer: customer?.id,
            is_payment: true,
            note: "string",
            receiver: customer,
            state: "PRO",
            total: total,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (arrTemp.length < cartItems.length) {
                    props.setCart(cartItems.filter((data: any) => data.select === false));
                }
                else {
                    localStorage.removeItem('cart');
                    props.setCart([]);
                }
                alert("success");
                redirect('/order/delivery-status');
            }).catch(error => {
                console.log(error);
            })
    }
    const handelRemoveSelect = () => {
        setCartItems(cartItems.filter((data: any) => data.select === false));
        props.setCart(cartItems.filter((data: any) => data.select === false));
        setProductIsChoose(0);
    }
    return (
        <Container>
            <div id='cartDetailContainer'>
                <div className="cart-top" >
                    {localStorage.getItem("accessToken") ?
                        <div className="navBarCartInfo">
                            <div className="nav-noti">
                                <FormControlLabel className="nav-noti-text" control={<LocationOn />} label={`Address received`} />
                            </div>
                            <div></div>
                            <div className="info" title={customer?.last_name + " " + customer?.first_name + ", " + customer?.phone_number + ", " + customer?.address + ", " + customer?.mail}>
                                <div>
                                    <p style={{ paddingLeft: '5px' }}>{customer?.last_name}{" "}{customer?.first_name}, {customer?.phone_number}, {customer?.address}, {customer?.mail}</p>
                                </div>
                                <FormControlLabel id="setting" control={<Settings />} label={`Setting`} onClick={handleEditInfoReceiver} />
                            </div>
                            <div></div>
                        </div> : <></>}
                </div>
                <div className="cart-top">
                    <div className="navBarCartDetail">
                        <div></div>
                        <div className="nav-item">
                            <FormControlLabel control={<BpCheckbox checked={selectAll} onChange={handleChangeSelectAll} />} label={'Select all'} />
                            {productIsChoose > 0 ? <FormControlLabel className="delete-item-select" control={<Delete />} onClick={handelRemoveSelect} label={`Remove ${productIsChoose} items`} /> : <></>}
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="cart-main">
                    {
                        cartItems.map((item, index: number) =>
                            <CartItem
                                key={index}
                                item={item}
                                handleSelectItem={handleSelectItem}
                                handleChangeQuantity={handleChangeQuantity}
                                handleRemove={handleRemove}
                            />)
                    }
                </div>
                <div className="cart-bottom">
                    <div className="navBarBottom">
                        <div className="detail">
                            <div></div>
                            <div className="detail-center">
                                <div>
                                    <p>Total price {`(${productIsChoose} products): `}<span>{new Intl.NumberFormat().format(total)}</span></p>
                                </div>

                            </div>
                            <div></div>
                        </div>
                        <div className="btn">
                            <Button variant="contained" disabled={productIsChoose <= 0 ? true : false} onClick={handleBuy} style={{ backgroundColor: 'orange', width: '100px', textAlign: 'center' }}>BUY</Button>
                            <LoginDialog open={checkLogin} setOpen={setCheckLogin} title={'Login'} setAccessToken={props.setAccessToken} />
                            <DialogPayMent customerOrder={customerOrder} cartItems={cartItems} setOpen={setOpenPayment} open={openPayment} setCheckOut={setCheckOut} totalPay={(total / 23000).toFixed(2)} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default CartDetail;