import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        <Navigation />
        <main>{children}</main>
      </Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;
