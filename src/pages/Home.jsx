import React, { Component } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Images from "../components/images";
import loading from "../loading.svg";
const api_key = "2CF0hAZKrDWfvAkHT30oUbDJRB5HvEeS";

class Home extends Component {
  state = {
    imgTotal: 0,
    open: false,
    url: "",
    images: [],
    position: 0,
    isLoading: false,
  };

  componentDidMount() {
    this.loadImage(24, false, 0);
  }

  render() {
    const { imgTotal, isLoading } = this.state;
    return (
      <section className="container">
        <p className="header">
          Small GIF Garden
        </p>
        {this.renderImages()}
        {isLoading ? (
          <div className="loader">
            <img src={loading} alt="" />
          </div>
        ) : (
          <div className="button">
            <button
              className="load-more"
              onClick={() => this.loadImage(24, true, imgTotal)}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    );
  }

  loading = () => {

  }

  renderImages = () => {
    const { url, images } = this.state;
    if (images.length !== 0) {
      return (
        <div className="img-wrapper">
          {images.map((item, index) => {
            return (
              <div key={index} className="img-wrapper--item">
                <div className="content">
                  <LazyLoadImage
                    effect="blur"
                    src={item.images.original.url}
                    alt={item.images.original.hash}
                    onClick={(e) =>
                      this.openImagesMaxSceen(e, item.images.original.url)
                    }
                  />
                </div>
                <div className="title">
                  <a href={item.images.original.mp4} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </div>
              </div>
            );
          })}
          {this.state.open ? (
            <Images
              url={url}
              openImagesMaxSceen={this.openImagesMaxSceen}
            ></Images>
          ) : null}
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  };

  openImagesMaxSceen = (e, url) => {
    this.setState({
      url: url,
      open: !this.state.open,
    });
    if (!this.state.open) {
      this.setState({
        position: e.pageY,
      });
    }
    if (!this.state.open) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = this.state.position;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY - 250);
    }
  };

  loadImage = (limit, isLoad, offSet) => {
    this.setState({isLoading: true}, () => {
      axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}&offset=${offSet}`
      )
      .then((res) => {
        const images = res.data.data;
        if (isLoad) {
          this.setState({
            images: this.state.images.concat(images),
            imgTotal: this.state.imgTotal + limit,
            isLoading: false,
          });
        } else {
          this.setState({ images: images, imgTotal: limit, isLoading: false });
        }
      })
      .catch((error) => console.log(error));
    })
  };
}

export default Home;
