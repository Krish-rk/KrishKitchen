import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {addCartItem} = value
      const {quantity, item} = props
      const {imageUrl, name, cost} = item
      const incrementQuantity = () => {
        const newQuantity = quantity + 1
        addCartItem({...item, quantity: newQuantity})
      }
      const decrementQuantity = () => {
        if (quantity > 0) {
          const newQuantity = quantity - 1
          addCartItem({...item, quantity: newQuantity})
        }
      }
      return (
        <li className="cart-item-container">
          <div className="image-cont">
            <img src={imageUrl} alt="cart-img" className="cart-item-image" />
            <p className="name">{name}</p>
          </div>
          <div className="quantity-box">
            <AiOutlineMinusSquare
              className="cart-item-quantity-icon"
              onClick={decrementQuantity}
            />
            <h4 className="cart-item-quantity">{quantity}</h4>
            <AiOutlinePlusSquare
              className="cart-item-quantity-icon"
              onClick={incrementQuantity}
            />
          </div>
          <div>
            <h1 className="cart-item-price">
              <BiRupee /> {quantity * cost}
            </h1>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
