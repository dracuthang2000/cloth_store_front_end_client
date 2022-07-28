import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs, Typography } from "@mui/material";
import './DeliveryState.css';
import DeliveryItem from './DeliveryItem';
import Axios from '../../../Axios';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function CenteredTabs() {
    const [value, setValue] = useState(0);
    const bill = {
        id: '',
        date: '',
        note: '',
        total: 0,
        state: '',
        receiver: {
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            mail: ''
        },
        bill_product_details: [
            {
                id: '',
                quantity: 0,
                version: 0,
                unit_price: 1000,
                product_color_size: {
                    id: '',
                    size: {
                        size: '',
                    },
                    color: {
                        color: {
                            color: '',
                        },
                        product: {
                            id: '',
                            description: '',
                            product_name: '',
                            stuff: '',
                            label: '',
                            gender: '',
                            brand: '',
                        },
                        img: ''
                    }
                }
            },
        ],
        id_customer: ''
    }
    const [bills, setBills] = useState([bill])
    useEffect(() => {
        Axios.get("customer/bill/bill-by-me", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                let billTemp = res.data;
                setBills(billTemp);
            }).catch(error => {
                console.log(error);
            })
    }, [])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className='container-delivery'>
            <div className='container-delivery-status'>
                <div className='tablist'>
                    <Tabs className='tabs-delivery' sx={{ width: '100%' }} value={value} onChange={handleChange} centered>
                        <Tab sx={{ width: '20%' }} label="All" />
                        <Tab sx={{ width: '20%' }} label="Processing" />
                        <Tab sx={{ width: '20%' }} label="Delivering" />
                        <Tab sx={{ width: '20%' }} label="Finishing" />
                        <Tab sx={{ width: '20%' }} label="Canceling" />
                    </Tabs>
                </div>
                <div className='tab-details'>
                    <TabPanel value={value} index={0}>
                        {bills.map((item) => <DeliveryItem item={item} />)}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {bills.map((item) => item.state === 'PRO' ? <DeliveryItem item={item} /> : <></>)}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {bills.map((item) => item.state === 'DEL' ? <DeliveryItem item={item} /> : <></>)}
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        {bills.map((item) => item.state === 'FIN' ? <DeliveryItem item={item} /> : <></>)}
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        {bills.map((item) => item.state === 'CAN' ? <DeliveryItem item={item} /> : <></>)}
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
