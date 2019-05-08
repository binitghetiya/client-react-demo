import React from "react";
import { FaPlus, FaMinus, FaCheck, FaTimes } from "react-icons/fa";

export default class Item extends React.PureComponent {
  onSelected = () => {
    const { item, onChangeSelectedItems } = this.props;
    onChangeSelectedItems(item.id);
  };

  onExpand = () => {
    const { item, onChangeCurrentlyOpened } = this.props;
    onChangeCurrentlyOpened(item.id);
  };

  render() {
    const { isOpen } = this.props;
    const { item, isChecked } = this.props;
    return (
      <div className={item.parentLayerId === -1 ? "main" : "main"}>
        {item.subLayerIds && item.subLayerIds.length ? (
          <div className="expand">
            {isOpen === false ? (
              <FaPlus onClick={this.onExpand} />
            ) : (
              <FaMinus onClick={this.onExpand} />
            )}
          </div>
        ) : (
          <div className="expand">&nbsp; </div>
        )}
        <div className="check">
          {isChecked ? (
            <FaCheck onClick={this.onSelected} />
          ) : (
            <FaTimes onClick={this.onSelected} />
          )}
        </div>

        <div> {item.name}</div>
        <div className="childrens">{this.props.children}</div>
      </div>
    );
  }
}
