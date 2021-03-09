import React, { Component } from "react";
import { getItems } from "./../http/itemService";

class Test extends Component {
  state = {};

  async componentDidMount() {
    const { data: item } = await getItems();
    this.setState({ item });
  }
  render() {
    const { item } = this.state;
    console.log(item);
    return <div>{item && <img src={item[0].img} alt="" />}</div>;
  }
}

export default Test;
