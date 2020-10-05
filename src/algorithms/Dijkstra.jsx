import { PriortyQueue } from "./priortyQueue";

function gridIndexToArrayIndex(totalCol, currentRow, currentCol) {
  return totalCol * currentRow + currentCol;
}

export function dijkstra(grid, startNode) {
  const forPathReconstruction = new Array(grid.length * grid[0].length);
  const visitedNodesInOrder = [];

  const dist = new Array(grid.length * grid[0].length).fill(Infinity);
  dist[gridIndexToArrayIndex(grid[0].length, startNode.row, startNode.col)] = 0;
  const queue = new PriortyQueue();
  queue.enqueue([startNode.row, startNode.col], 0);
  while (queue.length) {
    let { val, priorty } = queue.dequeue();
    let index = gridIndexToArrayIndex(grid[0].length, val[0], val[1]);
    grid[val[0]][val[1]].isVisited = true;
    if (dist[index] < priorty) {
      continue;
    }

    let neibours = neiboursUnvisitedNode(grid, val, visitedNodesInOrder);
    for (let i = 0; i < neibours.length; i++) {
      let [idx, currDist] = neibours[i];
      let at = gridIndexToArrayIndex(grid[0].length, idx[0], idx[1]);
      if (grid[idx[0]][idx[1]].isVisited) {
        continue;
      }
      let newDist = dist[index] + currDist;
      if (newDist < dist[at]) {
        forPathReconstruction[at] = grid[val[0]][val[1]];
        visitedNodesInOrder.push(grid[val[0]][val[1]]);
        dist[at] = newDist;
        queue.enqueue(idx, newDist);
      }
      if (grid[val[0]][val[1]].isFinish) {
        return [dist, forPathReconstruction, visitedNodesInOrder];
      }
    }
  }
  return [dist, forPathReconstruction, visitedNodesInOrder];
}

function neiboursUnvisitedNode(grid, val, visitedNodesInOrder) {
  const direction = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const neibours = [];
  for (let i = 0; i < 4; i++) {
    let at = [val[0] + direction[i][0], val[1] + direction[i][1]];
    let weight;

    if (
      at[0] < 0 ||
      at[0] >= grid.length ||
      at[1] >= grid[0].length ||
      at[1] < 0
    ) {
      continue;
    } else if (grid[at[0]][at[1]].isWall) {
      continue;
    } else if (grid[at[0]][at[1]].isWeighted) {
      visitedNodesInOrder.push(grid[val[0]][val[1]]);
        weight = 15;
    } else {
      visitedNodesInOrder.push(grid[val[0]][val[1]]);
      weight = 1;
    }
    neibours.push([at, weight]);
  }
  return neibours;
}

export function getNodesInShortestPathOrderDijkstra(
  grid,
  dist,
  forPathReconstruction,
  startNode,
  endNode
) {
  const at = gridIndexToArrayIndex(grid[0].length, endNode[0], endNode[1]);
  if (dist[at] === Infinity) {
    return [];
  }
  const path = [];
  for (
    let i = endNode;
    i != null;
    i =
   
        forPathReconstruction[gridIndexToArrayIndex(grid[0].length, i.row, i.col)]
  ) {
    path.push(i);
  }
  path.reverse();
  if (path[0] === startNode) {
    return path;;
  } else {
    return [];;
  }
}
