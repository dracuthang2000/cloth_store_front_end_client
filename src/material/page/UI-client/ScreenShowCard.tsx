import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import CardItem from './CardItem';
import Axios from '../../Axios';
import './style/ScreenCard.css';
const ScreenCard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get('product/get-list-product')
      .then((res) => {
        const listProduct = res.data;
        setProducts(
          listProduct.map((p: any) => {
            return {
              img: p.img,
              title: p.product_name,
              price: p.price,
              priceDiscount: '',
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
      <div className="wrapper-item">
        {products.map((p: any) => (
          <CardItem
            img={require('../../image/' + p.img)}
            title={p.title}
            priceDiscount={p.priceDiscount}
            price={p.price}
          />
        ))}
      </div>
    </Container>
  );
};

export default ScreenCard;
