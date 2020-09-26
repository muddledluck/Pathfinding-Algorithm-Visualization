import React from "react";
import "./Node.css";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isStart, isFinish } = this.props;
    if (isStart) {
      console.log("isStart");
    } else if (isFinish) {
      console.log("isFinish");
    }
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : "";
    return <div className={`node ${extraClassName}`}></div>;
  }
}

export default Node;
