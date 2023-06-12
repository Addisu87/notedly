import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaBook, FaStar } from "react-icons/fa";

const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <li>
          <Link to="/">
            <FaHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/mynotes">
            <FaBook />
            My Notes
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <FaStar />
            Favorites
          </Link>
        </li>
      </NavList>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;
  // nesting styling
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`;
