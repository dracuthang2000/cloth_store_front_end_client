import React, { useState, useEffect, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import CardItem from '../CardItem';
import Axios from '../../../Axios';
import Slider from "react-slick";
import '../style/ScreenCard.css';
import { Link, useParams } from 'react-router-dom';
import { Alert } from '@mui/material';

const SearchScreen = (props: any) => {
    const { keyword } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        Axios.get('product/find-product-by-name', {
            params: {
                keyword: keyword
            }
        })
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
            })
            .catch((error) => {
                console.log(error);
            });
    }, [keyword]);
    return (
        <Container>
            {products.length === 0 ? <Alert severity="error">This not found product with name: {keyword}</Alert> :
                <Container>
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
            }
        </Container >
    );
}

export default SearchScreen;