import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFilterRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {BiChevronRightSquare, BiChevronLeftSquare} from 'react-icons/bi'
import ReactSlick from '../ReactSlick'
import RestaurantItem from '../RestaurantItem'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    carousel: [],
    restaurentList: [],
    sortBy: '',
    offset: 0,
    limit: 9,
    count: 1,
    isLoading: true,
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
    this.getCorousel()
    this.getRestaurant()
  }

  onDecreasePageno = () => {
    const {count, limit} = this.state
    if (count > 1) {
      this.setState(
        {count: count - 1, offset: (count - 1) * limit},
        this.getRestaurant,
      )
    }
  }

  onIncreasePageno = () => {
    const {count, limit} = this.state
    if (count < 5) {
      this.setState(
        {count: count + 1, offset: (count - 1) * limit},
        this.getRestaurant,
      )
    }
  }

  getRestaurant = async () => {
    const {sortBy, offset, limit} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        restaurentList: data.restaurants,
        isLoading: true,
      })
    }
  }

  getCorousel = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      carousel: data.offers,
    })
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-list-loader"
      className="products-loader-container"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeSortby = event => {
    event.preventDefault()
    this.setState(
      {
        sortBy: event.target.value,
      },
      this.getRestaurant,
    )
  }

  renderRestaurants = () => {
    const {carousel, restaurentList, sortBy, count} = this.state
    return (
      <>
        <Header />
        <div className="home-cont">
          <ReactSlick carousel={carousel} />
        </div>
        <div className="sort-card">
          <div>
            <h1 className="card-head">Popular Restaurants</h1>
            <p>Select your special dish</p>
          </div>
          <div>
            <div className="sort-by-container">
              <BsFilterRight className="sort-by-icon" />
              <p className="sort-by">Sort by</p>
              <select
                className="sort-by-select"
                value={sortBy}
                onChange={this.onChangeSortby}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.optionId}
                    value={eachOption.optionId}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <ul className="list-container">
            {restaurentList.map(each => (
              <RestaurantItem item={each} key={each.id} />
            ))}
          </ul>
        </div>
        <div className="page-indicator">
          <button
            type="button"
            onClick={this.onDecreasePageno}
            data-testid="pagination-left-button"
          >
            <BiChevronLeftSquare size={40} />+
          </button>
          <p data-testid="active-page-number">{count} of 4</p>
          <button
            type="button"
            onClick={this.onIncreasePageno}
            data-testid="pagination-right-button"
          >
            -
            <BiChevronRightSquare size={40} />
          </button>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderRestaurants() : this.renderLoadingView
  }
}

export default Home
