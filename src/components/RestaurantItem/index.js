import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

const RestaurantItem = props => {
  const {item} = props
  const {name, cuisine, id} = item
  const {rating} = item.user_rating
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-item-nav-link">
      <li className="Restaurant-list-item" data-testid="restaurant-item">
        <div className="restaurant-details">
          <img
            src={item.image_url}
            alt="restaurant"
            className="restaurant-image-width"
          />
          <div className="restaurant-description">
            <p className="restaurant-name">{name}</p>
            <p className="cuisine-type">{cuisine}</p>
            <div className="rating">
              <p>
                {' '}
                <BsFillStarFill color="#F7931E" /> {rating}
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
