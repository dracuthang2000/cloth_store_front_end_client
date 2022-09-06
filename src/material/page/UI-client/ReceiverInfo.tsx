import React, { useState, useEffect } from "react";
import Axios from '../../Axios';
import { Container } from "react-bootstrap";
import './style/ReceiverInfo.css';
import {
    TextField
    , Button,
    FormControl,
    FormHelperText
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
    const initialError = {
        first_name: false,
        last_name: false,
        address: false,
        phone_number: false,
        mail: false
    }
    const initialMessageError = {
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        mail: ''
    }
    const [error, setError] = useState(initialError);
    const [messageError, setMessageError] = useState(initialMessageError);
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
        if (!valid()) {
            navigate('/cart', { state: { receiver: customer } });
        }
    }
    const valid = () => {
        let flag = false;
        let error = initialError;
        let messageError = initialMessageError;

        if (customer?.first_name === undefined || customer.first_name === '') {
            error.first_name = true;
            messageError.first_name = 'First name is not null';
            flag = true;
        } else {
            error.first_name = false;
            messageError.first_name = '';
        }

        if (customer?.last_name === undefined || customer.last_name === '') {
            error.last_name = true;
            messageError.last_name = 'Last name is not null';
            flag = true;
        } else {
            error.last_name = false;
            messageError.last_name = '';
        }

        if (customer?.phone_number === undefined || customer.phone_number === '') {
            error.phone_number = true;
            messageError.phone_number = 'Phone number is not null';
            flag = true;
        } else {
            error.phone_number = false;
            messageError.phone_number = '';
        }

        if (customer?.address === undefined || customer.address === '') {
            error.address = true;
            messageError.address = 'Address is not null';
            flag = true;
        } else {
            error.address = false;
            messageError.address = '';
        }

        if (customer?.mail === undefined || customer.mail === '') {
            error.mail = true;
            messageError.mail = 'Mail name is not null';
            flag = true;
        } else {
            error.mail = false;
            messageError.mail = '';
        }
        return flag;
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
                                <TextField label={'Last name receiver*'} className={'form-control'}
                                    name={"last_name"}
                                    value={`${customer?.last_name}`}
                                    error={error.last_name}
                                    onChange={handleChange} />
                                {error.last_name && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.last_name}</FormHelperText>
                                </FormControl>}
                            </div>
                            <div className="container-input">
                                <TextField label={'Name receiver*'}
                                    className={'form-control'}
                                    name={"first_name"}
                                    onChange={handleChange}
                                    error={error.first_name}
                                    value={`${customer?.first_name}`} />
                                {error.first_name && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.first_name}</FormHelperText>
                                </FormControl>}
                            </div>
                            <div className="container-input">
                                <TextField label={'Address receiver*'}
                                    onChange={handleChange}
                                    name={"address"}
                                    className={'form-control'}
                                    error={error.address}
                                    value={`${customer?.address}`} />
                                {error.address && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.address}</FormHelperText>
                                </FormControl>}
                            </div>
                            <div className="container-input">
                                <TextField label={'Number phone receiver*'}
                                    className={'form-control'}
                                    name={"phone_number"}
                                    onChange={handleChange}
                                    error={error.phone_number}
                                    value={`${customer?.phone_number}`} />
                                {error.phone_number && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.phone_number}</FormHelperText>
                                </FormControl>}
                            </div>
                            <div className="container-input">
                                <TextField label={'Email receiver *'}
                                    onChange={handleChange}
                                    className={'form-control'}
                                    name={"mail"}
                                    error={error.mail}
                                    value={`${customer?.mail}`} />
                                {error.mail && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.mail}</FormHelperText>
                                </FormControl>}
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