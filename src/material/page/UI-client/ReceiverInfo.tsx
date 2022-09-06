import React, { useState, useEffect } from "react";
import Axios from '../../Axios';
import { Container } from "react-bootstrap";
import './style/ReceiverInfo.css';
import {
    TextField
    , Button
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface initialReceiver {
    first_name: string,
    last_name: string,
    address: string,
    phone_number: string,
    mail: string
}
const ReceiverInfo = () => {
    const [customer, setCustomerInfo] = useState<Partial<initialReceiver>>();
    const location = useLocation();
    const navigate = useNavigate();
    const getCustomerInfo = () => {
        console.log(location);
        if (location != null) {
            let reciever: any = location.state;
            setCustomerInfo(reciever.receiver);
        }
    }

    useEffect(() => {
        getCustomerInfo();

    }, []);
    const handleChange = (event: any) => {
        console.log(event.target);
        setCustomerInfo({ ...customer, [event.target.name]: event.target.value })
    }
    const handleSave = () => {
        navigate('/cart', { state: { receiver: customer } });
    }
    return (
        <Container>
            <div className="container">
                <div className="updateClothesContainer">
                    <div className="header">
                        <h4>
                            Update profile of receiver
                        </h4>
                        <hr />
                    </div>
                    <div className="main">
                        <div className="left">
                            <div className="container-input">
                                <div className="bottom">
                                    <TextField label={'Last name receiver*'} className={'form-control'}
                                        name={"last_name"}
                                        value={`${customer?.last_name}`}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="container-input">
                                <div className="bottom">
                                    <TextField label={'Name receiver*'}
                                        className={'form-control'}
                                        name={"first_name"}
                                        onChange={handleChange}
                                        value={`${customer?.first_name}`} />
                                </div>
                            </div>
                            <div className="container-input">
                                <div className="bottom">
                                    <TextField label={'Address receiver*'}
                                        onChange={handleChange}
                                        name={"address"}
                                        className={'form-control'}
                                        value={`${customer?.address}`} />
                                </div>
                            </div>
                            <div className="container-input">
                                <div className="bottom">
                                    <TextField label={'Number phone receiver*'}
                                        className={'form-control'}
                                        name={"phone_number"}
                                        onChange={handleChange}
                                        value={`${customer?.phone_number}`} />
                                </div>
                            </div>
                            <div className="container-input">
                                <div className="bottom">
                                    <TextField label={'Email receiver *'}
                                        onChange={handleChange}
                                        className={'form-control'}
                                        name={"mail"}
                                        value={`${customer?.mail}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnContainer">
                        <Button onClick={handleSave} sx={{ width: '100px' }} variant="outlined">Save</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ReceiverInfo;