import React, { useState, useEffect, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import CardItem from './CardItem';
import Axios from '../../Axios';
import Slider from "react-slick";
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import './style/ScreenCard.css';
import { Link } from 'react-router-dom';

const SampleNextArrow = (props: any) => {
  const { className, style, onClick
  } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: '15px' }}
      onClick={onClick}
    ><ArrowForwardIos style={{ fontSize: '24px', color: 'black' }} /></div>
  );
};

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: '-12px', zIndex: 1 }}
      onClick={onClick}
    ><ArrowBackIos style={{ fontSize: '24px', color: 'black' }} /></div>
  );
};
const ScreenCard = (props: any) => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [productsDiscount, setProductsDiscount] = useState([]);
  useEffect(() => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Axios.get('product/get-list-product-new')
      .then((res) => {
        const listProduct = res.data;
        setNewProducts(
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
  }, []);
  useEffect(() => {
    Axios.get('product/get-list-product-discount') // best seller
      .then((res) => {
        const listProduct = res.data;
        setProductsDiscount(
          listProduct.map((p: any) => {
            return {
              id: p.id,
              img: p.img,
              title: p.product_name,
              price_current: p.price,
              is_new: p.is_new,
              discount_percent: p.discount,
              tag: p.tag,
              tag_label: p.label.tag_label
              ,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <div className='container'>
        <div className='design new'>
          <div className='clearfix'>
            <strong className='design-title'>
              New clothes
            </strong>
          </div>
          <Slider
            infinite={(newProducts.length > 5)}
            slidesToShow={5}
            slidesToScroll={1}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {newProducts.map((p: any) =>
            (<CardItem
              key={p.id}
              img={require('../../image/' + p.img)}
              title={p.title}
              discount_percent={p.discount_percent ? (p.discount_percent.percent) : null}
              price_current={p.price_current}
              is_new={p.is_new}
              id={p.id}
              tag={p.tag}
              cart={props.cart}
              tag_label={p.tag_label}
              handleClick={props.handleClick}
            />))}
          </Slider>
          <div className='btn-seeMore'>
            <Button title='see more'>See more</Button>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='design seller'>
          <div className='clearfix'>
            <strong className='design-title'>
              Best seller
            </strong>
          </div>
          <Slider
            infinite={productsDiscount.length > 5}
            slidesToShow={5}
            slidesToScroll={1}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {productsDiscount.map((p: any) => p.discount_percent ?
              (<CardItem
                key={p.id}
                img={require('../../image/' + p.img)}
                title={p.title}
                discount_percent={p.discount_percent ? (p.discount_percent.percent) : null}
                price_current={p.price_current}
                is_new={p.is_new}
                id={p.id}
                tag={p.tag}
                cart={props.cart}
                tag_label={p.tag_label}
                handleClick={props.handleClick}
              />) : null)}
          </Slider>
          <div className='btn-seeMore'>
            <Button title='see more'>See more</Button>
          </div>
        </div>
      </div>
      <Container>
        <div className='container clearfix'>
          <h4 className='float-start'>CLOTHES</h4>
        </div>
        <div className="wrapper-item">
          {products.map((p: any) => (
            <CardItem
              key={p.id}
              img={require('../../image/' + p.img)}
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
};

export default ScreenCard;
