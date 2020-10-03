import React from "react";
import Node from "../Node/Node";
import Navbars from "../Navbars/Navbars";
import { bfs, getNodesInShortestPathOrderBFS } from "../../algorithms/BFS";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "../../algorithms/Dijkstra";
import "./PathFindingVisualizer.css";

const TOTAL_ROW = 21;
const TOTAL_COL = 54;

const STARTING_ROW = 0;
const STARTING_COL = 1;

const ENDING_ROW = 20;
const ENDING_COL = 53;

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

  handleMouseDown = (row, col) => {
    if (!this.state.grid[row][col].isFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  };

  handleMouseEnter = (row, col) => {
    if (this.state.mouseIsPressed && !this.state.grid[row][col].isFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
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
      }, 50 * i);
    }
  }

  animateAlgo(visitedNodesInOrder, nodesInShortestOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  visualizeDijkstra = () => {
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
     
      endNode
    
    );
    console.log(nodesInShortestOrder);
    this.animateAlgo(visitedNodesInOrder, nodesInShortestOrder);
  };

  visualizeBFS = () => {
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
        
        
        ></Navbars>
        <button onClick={() => this.visualizeDijkstra()}>Viz</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
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
