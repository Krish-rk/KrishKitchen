import CartContext from '../../context/CartContext'
import EmptyCartListView from '../EmptyCartListView'
import CartListView from '../CartListView'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <>
          <Header />
          <div>
            {showEmptyView ? (
              <EmptyCartListView />
            ) : (
              <>
                <div className="cart-items-box">
                  <div className="t-header">
                    <h1 className="t-h-item">Item</h1>
                    <h1 className="t-h-item">Quantity</h1>
                    <h1 className="t-h-item">Price</h1>
                  </div>
                  <CartListView cartList={cartList} />
                  <hr />
                </div>
                <Footer />
              </>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
