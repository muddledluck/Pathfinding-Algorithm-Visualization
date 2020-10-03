import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

let currentAlgo = "";
const Navbars = ({ visualizeBfs, resetGrid }) => {
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
                algo.innerHTML = "Dijkstra Algrithm";
              }}
            >
              Dijkstra's Shortest Path
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                const algo = document.getElementById("Vizu");
                currentAlgo = "BFS";
                algo.innerHTML = "Visualize BFS Algorithm";
              }}
            >
              BFS Shortest Path
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Maze" id="basic-nav-dropdown">
            <NavDropdown.Item>Generate Ranodm Maze</NavDropdown.Item>
          </NavDropdown>
          <Button
            id="Vizu"
            variant="info"
            onClick={() => {
              if (currentAlgo === "") {
                document.getElementById("Vizu").innerHTML = "Select Algorithm";
              } else if (currentAlgo === "BFS") {
                visualizeBfs();
              }
            }}
          >
            Algorithm
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbars;
