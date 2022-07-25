import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs, Typography } from "@mui/material";
import './DeliveryState.css';
import DeliveryItem from './DeliveryItem';
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
                        <DeliveryItem />
                        <DeliveryItem />
                        <DeliveryItem />
                        <DeliveryItem />
                        <DeliveryItem />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DeliveryItem />
                        <DeliveryItem />
                        <DeliveryItem />
                        <DeliveryItem />
                        <DeliveryItem />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Four
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
