import React from "react";
import data from "./../response";
import Item from "./Item";

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mains: data.layers.filter(i => i.parentLayerId === -1),
      selectedItems: []
    };
  }

  changeSelectedItems = itemId => {
    const { selectedItems } = this.state;
    const index = selectedItems.includes(itemId);
    if(!index) {
      selectedItems.push(itemId);
    } else {
      const index = selectedItems.indexOf(itemId);
      if (index !== -1) selectedItems.splice(index, 1);
    }
    this.setState({selectedItems});
  };

  render() {
    const { mains, selectedItems } = this.state;
    return (
      <div className="item-list">
        <div> Selected Ids [{selectedItems.join(", ")}] </div>
        {mains.map(main => (
          <Item
            data={data.layers}
            root={main}
            key={main.id}
            selectedItems={selectedItems}
            changeSelectedItems={this.changeSelectedItems}
          />
        ))}
      </div>
    );
  }
}
