import React, { PureComponent } from "react";
import SwatchAttribute from "./SwatchAttribute";
import { setAttributes } from "../../redux/products-reducer";
import { connect } from "react-redux";

class Attribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {},
    };
  }
  changeHandler = (id) => {
    this.setState({
      selectedId: id,
    });
  };
  render() {
    const { attribute } = this.props;
    return (
      <span key={attribute.name}>
        <p className="attributes-tittle">
          {" "}
          {`${attribute.name.toUpperCase()} :`}{" "}
        </p>
        <div key={attribute.id} className="attributes">
          {attribute.items.map((item) => {
            return (
              <span key={item.displayValue}>
                <div
                  onClick={() =>
                    this.props.setAttributes({ [attribute.name]: item.value })
                  }
                  className="attribute-box"
                >
                  <SwatchAttribute
                    key={item.id}
                    onSelect={this.changeHandler}
                    itemValue={item.value}
                    selectedId={this.state.selectedId}
                    itemId={item.id}
                    attributeType={attribute.type}
                  />
                </div>
              </span>
            );
          })}
        </div>
      </span>
    );
  }
}

const mapDispatchToProps = { setAttributes };

export default connect(null, mapDispatchToProps)(Attribute);
