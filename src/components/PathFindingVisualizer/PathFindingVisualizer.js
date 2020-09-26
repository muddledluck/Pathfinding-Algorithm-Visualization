import React from "react";
import Node from "../Node/Node";
import Navbars from "../Navbars/Navbars";
import "./PathFindingVisualizer.css";
class PathFindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const node = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 56; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 5 && col === 25,
          isFinish: row === 10 && col === 46,
        };

        currentRow.push(currentNode);
      }
      node.push(currentRow);
    }
    this.setState({ nodes: node });
  }

  render() {
    const { nodes } = this.state;
    return (
      <div>
        <Navbars></Navbars>
        <div className="grid">
          {nodes.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((col, colIdx) => {
                  const { isStart, isFinish } = col;
                  return (
                    <Node
                      key={colIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default PathFindingVisualizer;
