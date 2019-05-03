import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    let item = null;
    if (this.props && this.props.data.length) {
      item = this.props.data.find(i => i.id === props.subItemId);
    }
    this.state = {
      item
    };
  }

  checkMe = (e, subItemId) => {
    this.props.changeSelectedItems(subItemId);
    console.log("hi===", subItemId);
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    const { item } = this.state;
    const { subItemId, selectedItems } = this.props;
    const isChecked = selectedItems.includes(subItemId);

    if (!item) {
      return null;
    }

    return (
      <div className="sub-item">
        <div className="check">
          {isChecked ? (
            <FaCheck
              onClick={e => {
                this.checkMe(e, subItemId);
              }}
            />
          ) : (
            <FaTimes
              onClick={e => {
                this.checkMe(e, subItemId);
              }}
            />
          )}
        </div>

        <div> {item.name}</div>
      </div>
    );
  }
}
