import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbars.css";

let currentAlgo = "";
export let wallOrWeight = "wall";
export let digonalPath = false;


export const Navbars = ({
  visualizeBfs,
  visualizeDijkstra,
  visualizeAStar,
  visualizeGreedyBFS,
  resetGrid,
  resetPath,
  resetWeight,
}) => {

  const onBtnClick = () => {
    if (currentAlgo === "") {
      document.getElementById("Vizu").innerHTML = "Select Algorithm";
    } else if (currentAlgo === "BFS") {
      resetPath();
      resetWeight();
      visualizeBfs();
      
  
    } else if (currentAlgo === "Dijkstra") {
      resetPath();
      visualizeDijkstra();
    } else if (currentAlgo === "AStar") {
      resetPath();
      visualizeAStar();
    } else if (currentAlgo === "GreedyBFS") {
      resetPath();
      visualizeGreedyBFS();
    }
    
  }

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand>PathFinding Visulizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Algorithm" id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => {
                const algo = document.getElementById("Vizu");
                currentAlgo = "Dijkstra";
                algo.innerHTML = "Visualize Dijkstra Algrithm";
              }}
            >
              Dijkstra's Shortest Path
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                const algo = document.getElementById("Vizu");
                currentAlgo = "BFS";
                algo.innerHTML = "Visualize BFS Algorithm (Unweighted)";
              }}
            >
              BFS Shortest Path
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                const algo = document.getElementById("Vizu");
                currentAlgo = "AStar";
                algo.innerHTML = "Visualize A* Algorithm";
              }}
            >
              A* Shortest Path
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                const algo = document.getElementById("Vizu");
                currentAlgo = "GreedyBFS";
                algo.innerHTML = "Visualize Greedy Algorithm";
              }}
            >
              Greedy Best First Search
            </NavDropdown.Item>
          </NavDropdown>
          <Button
            id="Vizu"
            className="btn"
            variant="info"
            onClick={() => onBtnClick()}
          >
            Algorithm
          </Button>
          <Button
            id="resetGrid"
            className="btn"
            variant="info"
            onClick={() => resetGrid()}
          >
            Clear Grid
          </Button>
          <Button
            id="resetPath"
            className="btn"
            variant="info"
            onClick={() => resetPath()}
          >
            Clear Path
          </Button>
          <NavDropdown title="Wall or Weight" id="basic-nav-dropdown1">
            <NavDropdown.Item
              onClick={() => {
                wallOrWeight = "wall";
              }}
            >
              Wall
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                wallOrWeight = "weight";
              }}
            >
              Weight
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Form>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Enable Digonal Path"
          onClick={() => {
            digonalPath = !digonalPath
            }}
       />
      </Form>
      
    </Navbar>
  );
};
