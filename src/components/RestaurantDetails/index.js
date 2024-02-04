import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import FoodDetails from '../FoodDetails'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getdetails()
  }

  getdetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        foodItems: data.food_items,
        reviewsCount: data.reviews_count,
      }

      this.setState({
        restaurantData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {restaurantData} = this.state
    const {
      imageUrl,
      location,
      costForTwo,
      rating,
      reviewsCount,
      name,
      cuisine,
      foodItems,
    } = restaurantData
    console.log(restaurantData)

    return (
      <>
        <Header />
        <div className="top-container">
          <div className="restaurent-back-image">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-image-size"
            />

            <div className="restaurant-details-view">
              <h1>{name}</h1>
              <p>{location}</p>
              <p>{cuisine}</p>
              <div className="rating-cost-container">
                <div>
                  <div className="icon-flex-row">
                    <BsFillStarFill />
                    <p>{rating}</p>
                  </div>
                  <p>{reviewsCount} + Ratings</p>
                </div>
                <div className="vl"> </div>
                <div>
                  <div className="icon-flex-row">
                    <BiRupee />
                    <p>{costForTwo}</p>
                  </div>
                  <p>Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-list-container-element">
          {foodItems.map(food => (
            <FoodDetails food={food} key={food.id} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantDetails()}</>
  }
}

export default RestaurantDetails
