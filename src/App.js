import React, { useState, useLayoutEffect, useRef } from "react";
import Panel from "./components/Panel";
import Board from "./components/Board";
import styled from "styled-components";
import { findWinner } from "./utils.js";

const Wrap = styled.div`
  width: 800px;
  height: 800px;
  margin: 20px auto 0;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h1`
  font-size: 36px;
  position: absolute;
  top: 20px;
  left: 300px;
  transform: translateX(-50%);
`;

const PlayAgain = styled.div`
  text-align: center;
  line-height: 40px;
  position: absolute;
  width: 100px;
  height: 40px;
  border: 2px solid rgba(20, 20, 20, 0.5);
  border-radius: 10px;
  top: 30px;
  right: 8%;

  &:hover {
    border: none;
    cursor: pointer;
    color: white;
    background: rgba(20, 20, 20, 0.5);
  }
`;

function App() {
  const [history, setHistory] = useState([
    {
      board: Array(19).fill(Array(19).fill(null)),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [winner, setWinner] = useState("");
  const [isBlackNext, setIsBlackNext] = useState(true);
  const lastStep = useRef({ y: "", x: "" });

  useLayoutEffect(() => {
    if (history.length <= 1) return;
    setWinner(() => {
      if (!lastStep.current.y && !lastStep.current.x) return;
      return findWinner(
        history[stepNumber].board,
        lastStep.current.y,
        lastStep.current.x
      );
    });
  }, [history, stepNumber]);

  return (
    <Wrap>
      <Name>五子棋</Name>
      <Board
        winner={winner}
        isBlackNext={isBlackNext}
        setIsBlackNext={setIsBlackNext}
        history={history}
        setHistory={setHistory}
        stepNumber={stepNumber}
        setStepNumber={setStepNumber}
        lastStep={lastStep}
      />
      <Panel
        winner={winner}
        isBlackNext={isBlackNext}
        history={history}
        setStepNumber={setStepNumber}
        setIsBlackNext={setIsBlackNext}
      />
      {winner && (
        <PlayAgain onClick={() => window.location.reload()}>再玩一次</PlayAgain>
      )}
    </Wrap>
  );
}

export default App;
