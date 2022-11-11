import React, { PureComponent } from "react";

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  next = (length) => {
    if (this.state.currentIndex < length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    } else if (this.state.currentIndex === length - 1) {
      this.setState({ currentIndex: 0 });
    }
  };

  prev = (length) => {
    if (this.state.currentIndex > 0 && this.state.currentIndex <= length - 1) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    } else if (this.state.currentIndex === 0) {
      this.setState({ currentIndex: length - 1 });
    }
  };

  render() {
    const { children } = this.props;
    const length = children.length;
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <button className="left-arrow" onClick={() => this.prev(length)}>
            &lt;
          </button>
          <div className="carousel-content-wrapper">
            {children[Object.keys(children)[this.state.currentIndex]]}
          </div>
          <button className="right-arrow" onClick={() => this.next(length)}>
            &gt;
          </button>
        </div>
      </div>
    );
  }
}
export default Carousel;
