import React from "react";
import styled from "@emotion/styled";

export const Loading = () => {
  return (
    <ProgressBar>
      <LoadingText>Loading ...</LoadingText>
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  position: relative;
  border: 3px solid grey;
  border-radius: 18px;
  padding: 10px 30px 10px 30px;
  background-color: grey;
  display: flex;
  justify-content: center;
  overflow: hidden;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 18px;
    background-color: orangered;
    animation: 2s popup linear;
    @keyframes popup {
      0% {
        transform: translateX(-200px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
`;

const LoadingText = styled.span`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  position: relative;
`;
