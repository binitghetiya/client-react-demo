import React from "react";
import data from "../response";
import Item from "./Item";

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mains: data.layers,
      selectedItems: [],
      currentlyOpened: [-1] // -1 will always be there becuase it's root and we want to see all root items
    };
  }

  handleChangeCurrentlyOpened = itemId => {
    const { currentlyOpened } = this.state;
    const index = currentlyOpened.includes(itemId);
    if (!index) {
      currentlyOpened.push(itemId);
    } else {
      const index = currentlyOpened.indexOf(itemId);
      if (index !== -1) currentlyOpened.splice(index, 1);
    }
    this.setState({ currentlyOpened });
  };

  handleChangeSelectedItems = itemId => {
    const { selectedItems } = this.state;
    const index = selectedItems.includes(itemId);
    if (!index) {
      selectedItems.push(itemId);
    } else {
      const index = selectedItems.indexOf(itemId);
      if (index !== -1) selectedItems.splice(index, 1);
    }
    this.setState({ selectedItems });
  };

  renderSingleView = main => {
    const { currentlyOpened, selectedItems } = this.state;
    return (
      <Item
        item={main}
        key={main.id}
        isOpen={currentlyOpened.includes(main.id)}
        isChecked={selectedItems.includes(main.id)}
        onChangeSelectedItems={this.handleChangeSelectedItems}
        onChangeCurrentlyOpened={this.handleChangeCurrentlyOpened}
      >
        {main.subLayerIds && main.subLayerIds.length
          ? this.getRenderedViewForItems(main.id)
          : null}
      </Item>
    );
  };

  getRenderedViewForItems = parentLayerId => {
    const { currentlyOpened, mains } = this.state;
    if (!currentlyOpened.includes(parentLayerId)) {
      return null;
    }

    const allSiblings = mains.filter(i => i.parentLayerId === parentLayerId);
    if (!allSiblings.length) {
      return null;
    }

    return allSiblings.map(main => this.renderSingleView(main));
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <div className="item-list">
        <div> Selected Ids [{selectedItems.join(", ")}] </div>
        {this.getRenderedViewForItems(-1, 0)}
      </div>
    );
  }
}
