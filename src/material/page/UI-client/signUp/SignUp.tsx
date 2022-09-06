import React, { useEffect, useState } from "react";
import './SignUp.css'
import {
    TextField
    , Avatar
    , Autocomplete
    , Box
    , Button,
    Switch,
    FormControlLabel,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Axios from "../../../Axios";


const SignUp = (props: any) => {
    const initialUser = {
        "address": "",
        "birth_date": "",
        "first_name": "",
        "gender": "",
        "id": 0,
        "id_card": "",
        "last_name": "",
        "mail": "",
        "phone_number": "",
        "version": 0
    }
    const initialAccount = {
        "is_active": true,
        "password": "",
        "role": {
            "id": 1,
            "role": "ROLE_CUSTOMER",
            "version": 0
        },
        "username": "",
        "version": 0
    }
    const [user, setUser] = useState(initialUser);
    const [account, setAccount] = useState(initialAccount)
    const navigate = useNavigate();
    const handleChange = (e: any) => {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSave = () => {
        Axios.post(`customer/create`, {
            "account": account,
            "address": user.address,
            "birth_date": user.birth_date,
            "first_name": user.first_name,
            "gender": user.gender,
            "id_card": user.id_card,
            "last_name": user.last_name,
            "mail": user.mail,
            "phone_number": user.phone_number,
        }).then(res => {
            loginApi()
        }).catch(e => {
            console.log(e);
            alert("is error");
        })
        console.log(user);

    }
    const handleCancel = () => {

    }
    const loginApi = () => {
        Axios.post('customer/login', {
            username: account.username,
            password: account.password,
        }).then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            props.setAccessToken(localStorage.getItem('accessToken'));
            navigate("/");
        }).catch((error) => {
            alert("is error");
        })
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4>
                        Sign Up
                    </h4>
                    <hr />
                </div>
                <div className="main1">
                    <div className="left1">
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={handleChange}
                                    value={`${user.first_name}`}
                                    label={'First name *'}
                                    name="first_name" />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={handleChange}
                                    value={`${user.last_name}`}
                                    label={'Last name *'}
                                    name="last_name" />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={handleChange}
                                    value={`${user.id_card}`}
                                    label={'Id cart *'}
                                    name="id_card" />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={handleChange}
                                    value={`${user.mail}`}
                                    label={'Mail *'}
                                    name="mail" />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={handleChange}
                                    value={`${user.phone_number}`}
                                    label={'Phone number *'}
                                    name="phone_number" />
                            </div>
                        </div>
                    </div>
                    <div className="right1" >
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={handleChange}
                                    value={`${user.address}`}
                                    label={'Address *'}
                                    name="address" />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={user.birth_date}
                                        onChange={(value: any) => setUser({ ...user, birth_date: value })}
                                        label='Date of birth *'
                                        inputFormat="MM/dd/yyyy"
                                        renderInput={(params: any) => <TextField {...params} />} />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <FormControl sx={{ width: 200 }}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={user.gender}
                                        label="Gender"
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                    >
                                        <MenuItem value={""}>none</MenuItem>
                                        <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
                                        <MenuItem value={"MALE"}>MALE</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={(e) => setAccount({ ...account, username: e.target.value })}
                                    value={`${account.username}`}
                                    label={'Username *'}
                                    name="username" />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom1">
                                <TextField sx={{ width: '100%' }}
                                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                    value={`${account.password}`}
                                    label={'password *'}
                                    type='password'
                                    name="password" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnContainer">
                    <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button sx={{ width: '150px' }} variant="outlined" onClick={handleSave}>Sign up</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;