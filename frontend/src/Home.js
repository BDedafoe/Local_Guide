import Carousel from 'react-bootstrap/Carousel';

function Home() {
    return (
      <><div className="homeContainer">
        <Carousel fade>
          <Carousel.Item>
            <div className="slideOne">
              <img
                className="d-block w-100"
                src="http://localhost:4000/images/cityIMG.jpg"
                alt="First slide" />
              <Carousel.Caption>
                <h2>Traveling?</h2>
                <h4>Checkout some places the local's recommend!</h4>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slideTwo">
              <img
                className="d-block w-100"
                src="http://localhost:4000/images/foodIMG.jpg"
                alt="Second slide" />
              <Carousel.Caption>
                <h2>Google giving too many options?</h2>
                <h4>This guide will help narrow down your choices</h4>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="http://localhost:4000/images/drinksIMG.jpg"
              alt="Third slide" />

            <Carousel.Caption>
              <h2>Leave some feedback</h2>
              <h4>Login or sign up to help out other travelers and their search for a spot to try!</h4>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div><>
          <div className="homePage">
              <p>This app is designed for the traveler in all of us</p>
              <p>Check out places that locals recommend to eat and drink</p>
              <p>View comments about these places or even leave your own!</p>
          </div>
        </></>
    );
  }

  export default Home;