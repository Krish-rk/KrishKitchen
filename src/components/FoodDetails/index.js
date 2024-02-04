import {Component} from 'react'
import {BsPlusSquare, BsDashSquare, BsFillStarFill} from 'react-icons/bs'

import CartContext from '../../context/CartContext'
import './index.css'

class FoodDetails extends Component {
  state = {
    quantity: 0,
  }

  renderAdd = () => (
    <div>
      <button onClick={this.onIncrementQuantity} type="button">
        Add
      </button>
    </div>
  )

  renderMoreQuantity = () => {
    const {quantity} = this.state
    return (
      <div className="quantity-container">
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onDecrementQuantity}
          data-testid="minus"
        >
          <BsDashSquare className="quantity-controller-icon" />
          plus
        </button>
        <p className="quantity">{quantity}</p>
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onIncrementQuantity}
          data-testid="plus"
        >
          <BsPlusSquare className="quantity-controller-icon" />-
        </button>
      </div>
    )
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {food} = this.props
          const {quantity} = this.state

          const updatedFood = {
            name: food.name,
            cost: food.cost,
            imageUrl: food.image_url,
            id: food.id,
            foodType: food.food_type,
            rating: food.rating,
          }
          const {name, cost, imageUrl, rating} = updatedFood
          const {addCartItem} = value
          const onClickAddToCart = () => {
            addCartItem({...updatedFood, quantity})
          }

          return (
            <li data-testid="foodItem" className="food-list-item-container">
              <div>
                <img
                  src={imageUrl}
                  alt="foodItem"
                  className="food-image-size"
                />
              </div>
              <div className="food-item-details-view">
                <h1 className="food-title">{name}</h1>
                <div className="rupee-name-rating-container">
                  <p className="cost-of-food">Rs. {cost}</p>
                </div>
                <p>
                  {' '}
                  <BsFillStarFill color="#F7931E" /> {rating}{' '}
                </p>
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                  >
                    {' '}
                    -
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                  >
                    {' '}
                    +
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD
                </button>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodDetails
