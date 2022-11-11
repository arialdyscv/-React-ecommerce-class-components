import React, { PureComponent } from "react";

class SwatchAttribute extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
    };
  }

  changeHandler = (value, id) => {
    if (value) {
      this.props.onSelect(id);
    } else {
      // option de-select.
    }
  };
  render() {
    const { itemId, selectedId, itemValue, attributeType } = this.props;
    const isChecked = itemId === selectedId;
    const style = {
      background: itemValue,
      color: itemValue,
      fontSize: "0.1px",
    };

    return (
      <div>
        <input
          type="checkbox"
          onChange={(e) => this.changeHandler(e.target.checked, itemId)}
          name={itemId}
          checked={isChecked}
        />
        {attributeType === "swatch" ? (
          <label className="swatch-attribute" style={style} htmlFor={itemValue}>
            {""}{" "}
          </label>
        ) : (
          <label className="attribute" htmlFor={itemValue}>
            {itemValue}{" "}
          </label>
        )}
      </div>
    );
  }
}

export default SwatchAttribute;
