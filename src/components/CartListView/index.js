import {BiRupee} from 'react-icons/bi'
import {withRouter} from 'react-router-dom'
import CartItem from '../CartItem'

import './index.css'

const CartListView = props => {
  const {cartList} = props
  let finalPrice = 0
  const placeOrder = () => {
    const {history} = props
    history.replace('/placeOrder')
  }

  finalPrice = cartList.reduce(
    (acc, curr) => acc + curr.quantity * curr.cost,
    0,
  )
  console.log(finalPrice)
  return (
    <>
      <ul className="cart-list-container">
        {cartList.map(each => (
          <CartItem item={each} key={each.id} quantity={each.quantity} />
        ))}
      </ul>
      <div className="total-price-box">
        <h1 className="order-total-text">Order Total:</h1>
        <div className="box">
          <h1 className="total-price">
            <BiRupee /> {finalPrice}
          </h1>
          <div className="plaord-ref-btn-box">
            <button
              className="place-order-btn"
              type="button"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(CartListView)
