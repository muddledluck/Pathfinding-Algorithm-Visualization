import React from "react";
import Node from "../Node/Node";
import { Navbars, wallOrWeight} from "../Navbars/Navbars";
import { bfs, getNodesInShortestPathOrderBFS } from "../../algorithms/BFS";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "../../algorithms/Dijkstra";
import {
  A_Star,
  getNodesInShortestPathOrderAStar,
} from "../../algorithms/A_Star";

import "./PathFindingVisualizer.css";

const TOTAL_ROW = 26;
const TOTAL_COL = 56;

const STARTING_ROW = 13;
const STARTING_COL = 10;

const ENDING_ROW = 13;
const ENDING_COL = 45;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < TOTAL_ROW; row++) {
    const currentRow = [];
    for (let col = 0; col < TOTAL_COL; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  
  return grid;
};

const createNode = (row, col) => {
  
  return {
    row,
    col,
    isStart: row === STARTING_ROW && col === STARTING_COL,
    isFinish: row === ENDING_ROW && col === ENDING_COL,
    isWeighted: false,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithWeight = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWeighted: !node.isWeighted }
  newGrid[row][col] = newNode;
  return newGrid;
}


class PathFindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  resetWeight = () => {
    const { grid } = this.state
    for (let row = 0; row < TOTAL_ROW; row++){
      for (let col = 0; col < TOTAL_COL; col++){
        grid[row][col].isWeighted = false;
      }
    }
    let resetWeights = document.querySelector(".node-weight")
    if (resetWeights === null) {
      resetWeights = []
    }
    for (let i = 0; i < resetWeights.length; i++){
      resetWeights[i].className = "node";
    }
    this.setState({ grid })
  }
  resetPath = () => {
    const { grid } = this.state;
    for (let row = 0; row < TOTAL_ROW; row++) {
      for (let col = 0; col < TOTAL_COL; col++) {
        grid[row][col].isVisited = false;
      }
    }
    const resetPathAnimation = document.querySelectorAll(".node-shortest-path");
    const resetVisitedAnimation = document.querySelectorAll(".node-visited");
    for (let i = 0; i < resetVisitedAnimation.length; i++) {
      if (resetVisitedAnimation[i].classList[2] === "node-weight") {
        resetVisitedAnimation[i].className = "node node-weight";
      } else {
        resetVisitedAnimation[i].className = "node";
      }
    }
    for (let i = 0; i < resetPathAnimation.length; i++) {
      if (resetPathAnimation[i].classList[2] === "node-weight") {
        resetPathAnimation[i].className = "node node-weight";
      } else {
        resetPathAnimation[i].className = "node";
      }
    }

    document.getElementById(`node-${STARTING_ROW}-${STARTING_COL}`).className =
      "node node-start";
    document.getElementById(`node-${ENDING_ROW}-${ENDING_COL}`).className =
      "node node-finish";
  };

  resetGrid = () => {
    const grid = getInitialGrid();
    this.setState({ grid });
    this.resetPath();
  };

  handleMouseDown = (row, col) => {
    if (wallOrWeight === "wall") {
      if (!this.state.grid[row][col].isFinish) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
      }
    } else if (wallOrWeight === "weight") {
      if (!this.state.grid[row][col].isFinish) {
        const newGrid = getNewGridWithWeight(this.state.grid, row, col);
        this.setState({ gird: newGrid, mouseIsPressed: true });
      }
    }
  };

  handleMouseEnter = (row, col) => {
    if (wallOrWeight === "wall") {
      if (this.state.mouseIsPressed && !this.state.grid[row][col].isFinish) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
      }
    } else if (wallOrWeight === "weight") {
      if (this.state.mouseIsPressed && !this.state.grid[row][col].isFinish) {
        const newGrid = getNewGridWithWeight(this.state.grid, row, col);
        this.setState({ grid: newGrid });
      }
    }
  };

  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };

  animateShortestPath(nodesInShortestOrder) {
    for (let i = 0; i < nodesInShortestOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        if (node.isWeighted) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path node-weight";
        }
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path node-start";
        } else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path node-finish";
        }
      }, 50 * i);
    }
  }

  animateAlgo(visitedNodesInOrder, nodesInShortestOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
          if (node.isWeighted) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-visited node-weight";
          }
          if (node.isStart) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path node-start";
          } else if (node.isFinish) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path node-finish";
          }
        }, 5);
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-at";
      }, 5 * i);
    }
  }

  visualizeAStar = () => {
    this.resetPath();
    let { grid } = this.state;
    const startNode = grid[STARTING_ROW][STARTING_COL];
    const endNode = grid[ENDING_ROW][ENDING_COL];

    const [forPathReconstruction, visitedNodesInOrder] = A_Star(
      grid,
      startNode,
      endNode
    );
    const nodesInShortestOrder = getNodesInShortestPathOrderAStar(
      grid,
      forPathReconstruction,
      startNode,
      endNode
    );
    this.animateAlgo(visitedNodesInOrder, nodesInShortestOrder);
  };
  visualizeDijkstra = () => {
    this.resetPath();
    let { grid } = this.state;
    const startNode = grid[STARTING_ROW][STARTING_COL];
    const endNode = grid[ENDING_ROW][ENDING_COL];
    const [dist, forPathReconstruction, visitedNodesInOrder] = dijkstra(
      grid,
      startNode
    );
    // console.log([dist, forPathReconstruction, visitedNodesInOrder])
    const nodesInShortestOrder = getNodesInShortestPathOrderDijkstra(
      grid,
      dist,
      forPathReconstruction,
      startNode,
      endNode
    );
    this.animateAlgo(visitedNodesInOrder, nodesInShortestOrder);
  };

  visualizeBFS = () => {
    this.resetPath();
    
    let { grid } = this.state;
    const startNode = grid[STARTING_ROW][STARTING_COL];
    const endNode = grid[ENDING_ROW][ENDING_COL];
    const [visitedNodesInOrder, forPathReconstruction] = bfs(grid, startNode);
    const nodesInShortestOrder = getNodesInShortestPathOrderBFS(
      grid,
      forPathReconstruction,
      startNode,
      endNode
    );
    this.animateAlgo(visitedNodesInOrder, nodesInShortestOrder);
  };

  render() {
    const { grid } = this.state;
    return (
      <div>
        <Navbars
          visualizeBfs={this.visualizeBFS}
          visualizeDijkstra={this.visualizeDijkstra}
          visualizeAStar={this.visualizeAStar}
          resetGrid={this.resetGrid}
          resetPath={this.resetPath}
          resetWeight={this.resetWeight}
          
        ></Navbars>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isWall,
                    isWeighted,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isWeighted={isWeighted}
                      onMouseDown={this.handleMouseDown}
                      onMouseEnter={this.handleMouseEnter}
                      onMouseUp={this.handleMouseUp}
                      row={row}
                    />
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
