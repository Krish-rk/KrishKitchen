import Slider from 'react-slick'

const ReactSlick = props => {
  const {carousel} = props
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {carousel.map(each => (
          <img src={each.image_url} alt={each.id} />
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
