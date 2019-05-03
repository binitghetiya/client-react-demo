import React from "react";
import data from "./response";
import { FaPlus, FaMinus, FaCheck, FaTimes } from "react-icons/fa";
import SubItem from "./SubItem";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  expandClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { root, data, selectedItems, changeSelectedItems } = this.props;
    const isChecked = selectedItems.includes(root.id);
    return (
      <div className="main">
        <div className="expand">
          {isOpen === false ? (
            <FaPlus onClick={this.expandClick} />
          ) : (
            <FaMinus onClick={this.expandClick} />
          )}
        </div>

        <div className="check">
          {isChecked ? (
            <FaCheck
              onClick={() => {
                changeSelectedItems(root.id);
              }}
            />
          ) : (
            <FaTimes
              onClick={() => {
                changeSelectedItems(root.id);
              }}
            />
          )}
        </div>

        <div> {root.name}</div>
        {isOpen === true && root.subLayerIds ? (
          <div>
            {root.subLayerIds.map(sub => (
              <SubItem
                key={sub}
                subItemId={sub}
                data={data}
                selectedItems={selectedItems}
                changeSelectedItems={changeSelectedItems}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
