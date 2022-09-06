import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import CardItem from '../CardItem';
import Axios from '../../../Axios';
import Slider from "react-slick";
import '../style/ScreenCard.css';
import { Link } from 'react-router-dom';
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, Table } from '@mui/material';
import { Filter, FilterAlt, RestartAlt } from '@mui/icons-material';

interface initialBrand {
    id: string,
    brand: string,
    image: string,
    version: number,
    tag_brand: string
}
interface initialLabel {
    id: number,
    label: string,
    version: number,
    tag_label: string
}
interface initialMaterial {
    id: number,
    material_name: string,
    version: number,
    tag_material: string
}
const ProductScreen = (props: any) => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState<Partial<initialBrand>[]>([]);
    const [brandFilter, setBrandFilter] = useState('');
    const [labels, setLabels] = useState<Partial<initialLabel>[]>([]);
    const [labelFilter, setLabelFilter] = useState('');
    const [materials, setMaterials] = useState<Partial<initialMaterial>[]>([]);
    const [materialsFilter, setMaterialsFilter] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            Axios.get('product/get-list-product')
                .then((res) => {
                    const listProduct = res.data;
                    setProducts(
                        listProduct.map((p: any) => {
                            return {
                                id: p.id,
                                img: p.img,
                                title: p.product_name,
                                price_current: p.price,
                                is_new: p.is_new,
                                discount_percent: p.discount,
                                tag: p.tag,
                                tag_label: p.label.tag_label,
                            };
                        })
                    );
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loading]);
    useEffect(() => {
        Axios.get(`brand/get-list-brand`)
            .then(res => {
                setBrands(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`label/get-list-label`)
            .then(res => {
                setLabels(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`material/get-list-material`)
            .then(res => {
                setMaterials(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    const handleClickFilter = () => {
        Axios.post(`product/findProductByCondition`, {
            tag_material: materialsFilter,
            tag_label: labelFilter,
            tag_brand: brandFilter,
        }).then(res => {
            const listProduct = res.data;
            setProducts(
                listProduct.map((p: any) => {
                    return {
                        id: p.id,
                        img: p.img,
                        title: p.product_name,
                        price_current: p.price,
                        is_new: p.is_new,
                        discount_percent: p.discount,
                        tag: p.tag,
                        tag_label: p.label.tag_label,
                    };
                })
            );
        }).catch(e => {
            console.log(e);
        })
    }
    const handleClickReset = () => {
        setLoading(true);
        setBrandFilter("");
        setLabelFilter("");
        setMaterialsFilter("");
    }
    return (
        <Container>
            <Container>
                <div className='container clearfix'>
                    <h4 className='float-start'>Filter</h4>
                </div>
                <Container>
                    <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-select-small">Label</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={labelFilter}
                            label="Label"
                            onChange={(e) => setLabelFilter(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {labels.map(data => <MenuItem value={data.tag_label}>{data.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-select-small">Brand</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={brandFilter}
                            label="Brand"
                            onChange={(e) => setBrandFilter(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {brands.map((data, index: number) =>
                                <MenuItem key={index} value={data.tag_brand}>
                                    <Table>
                                        <tr>
                                            <td style={{ width: 50 }}>
                                                <Avatar sx={{ width: 24, height: 24 }} src={`http://localhost:8081/api/brand/image/load/${data.image}`}></Avatar>
                                            </td>
                                            <td><span>{data.brand}</span></td>
                                        </tr>
                                    </Table>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-select-small">Material</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={materialsFilter}
                            label="Material"
                            onChange={(e) => setMaterialsFilter(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {materials.map(data => <MenuItem value={data.tag_material}>{data.material_name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 50 }}>
                        <Button onClick={handleClickFilter} variant='outlined' sx={{ height: '55px' }}><FilterAlt /></Button>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 50 }}>
                        <Button onClick={handleClickReset} variant='outlined' sx={{ height: '55px' }}><RestartAlt /></Button>
                    </FormControl>
                </Container>
                <div className='container clearfix'>
                    <h4 className='float-start'>CLOTHES</h4>
                </div>
                <div className="wrapper-item">
                    {products.map((p: any) => (
                        <CardItem
                            key={p.id}
                            img={p.img}
                            title={p.title}
                            discount_percent={p.discount_percent ? (p.discount_percent.percent) : null}
                            price_current={p.price_current}
                            is_new={p.is_new}
                            id={p.id}
                            tag={p.tag}
                            tag_label={p.tag_label}
                            cart={props.cart}
                            handleClick={props.handleClick}
                        />
                    ))}
                </div>
            </Container>
        </Container >
    );
}

export default ProductScreen;