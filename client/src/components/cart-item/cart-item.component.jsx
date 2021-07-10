import React from 'react';

import {
  CartItemContainer,
  ImageContainer,
  ItemDetailsContainer
} from "./cart-item.styles.jsx";

const CartItem = ({ item: { name, imageUrl, price, quantity } }) => (
  <CartItemContainer>
    <ImageContainer src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>
        {quantity} x R$ {price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;