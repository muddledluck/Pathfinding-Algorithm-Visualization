import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbars = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand>PathFinding Visulizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Algorithm" id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={(event) => {
                const algo = document.getElementById("Dijkstra");
                algo.innerHTML = "Dijkstra Algrithm";
              }}
            >
              Dijkstra's Shortest Path
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Maze" id="basic-nav-dropdown">
            <NavDropdown.Item>Generate Ranodm Maze</NavDropdown.Item>
          </NavDropdown>
          <Button id="Dijkstra" variant="info">
            Algorithm
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbars;
