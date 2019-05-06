import React from "react";
import { FaPlus, FaMinus, FaCheck, FaTimes } from "react-icons/fa";

export default class Item extends React.PureComponent {
  render() {
    const { isOpen } = this.props;
    const {
      item,
      onChangeSelectedItems,
      onChangeCurrentlyOpened,
      isChecked
    } = this.props;
    return (
      <div className={item.parentLayerId === -1 ? "main" : "main"}>
        {item.subLayerIds && item.subLayerIds.length ? (
          <div className="expand">
            {isOpen === false ? (
              <FaPlus onClick={onChangeCurrentlyOpened} />
            ) : (
              <FaMinus onClick={onChangeCurrentlyOpened} />
            )}
          </div>
        ) : (
          <div className="expand">&nbsp; </div>
        )}
        <div className="check">
          {isChecked ? (
            <FaCheck onClick={onChangeSelectedItems} />
          ) : (
            <FaTimes onClick={onChangeSelectedItems} />
          )}
        </div>

        <div> {item.name}</div>
        <div className="childrens">{this.props.children}</div>
      </div>
    );
  }
}
