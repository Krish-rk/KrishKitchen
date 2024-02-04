import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  onclickIsShow: () => {},
  onIncrementbtn: () => {},
  onDecrementbtn: () => {},
  removeCartItem: () => {},
})

export default CartContext
