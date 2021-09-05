import React from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  width: 570px;
  height: 570px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;

const Grid = styled.div`
  width: 30px;
  height: 30px;
  background: #f8de7e;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: "";
    height: 100%;
    border: 1px solid black;
    position: absolute;
    left: 50%;

    ${(props) => props.row === 0 && `top:50%`}

    ${(props) => props.row === 18 && `bottom:50%`}
  }

  &:before {
    content: "";
    width: 100%;
    border: 1px solid black;
    position: absolute;
    top: 50%;

    ${(props) => props.col === 0 && `left: 50%;`}

    ${(props) => props.col === 18 && `right: 50%;`}
  }
`;

const Chess = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  z-index: 2;

  ${(props) =>
    props.value === "b" &&
    `
      background: black;
      border: 1px solid grey;
    `}
  ${(props) =>
    props.value === "w" &&
    `
      background: white;
      border: 1px solid grey;
    `}

  &:hover {
    ${(props) =>
      props.winner || props.value
        ? ``
        : props.next
        ? `background: rgba(10,10,10,0.5); cursor: pointer`
        : `background: rgba(255,255,255,0.9); cursor: pointer`}
  }
`;

export default function Board({
  history,
  setHistory,
  stepNumber,
  setStepNumber,
  winner,
  lastStep,
  isBlackNext,
  setIsBlackNext,
}) {
  const handleChessClick = (y, x) => {
    // 把 history 裡的最後一個 board 拿出來當作處理的依據
    const tempHistory = history.slice(0, stepNumber + 1);
    const tempBoard = tempHistory[tempHistory.length - 1].board;

    if (winner || tempBoard[y][x]) return;

    lastStep.current.x = x;
    lastStep.current.y = y;
    const tempBoardChange = tempBoard.map((row, rowIndex) => {
      if (rowIndex !== y) return row;

      return row.map((col, colIndex) => {
        if (colIndex !== x) return col;
        return isBlackNext ? "b" : "w";
      });
    });

    // 處理完塞回去 history
    setHistory(tempHistory.concat([{ board: tempBoardChange }]));
    setStepNumber(stepNumber + 1);
    setIsBlackNext(!isBlackNext);
  };

  return (
    <BoardContainer>
      {history[stepNumber].board.map((row, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <Grid
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}
                  value={history[stepNumber].board[colIndex][rowIndex]}
                >
                  <Chess
                    winner={winner}
                    next={isBlackNext}
                    value={history[stepNumber].board[rowIndex][colIndex]}
                    onClick={() => handleChessClick(rowIndex, colIndex)}
                  />
                </Grid>
              );
            })}
          </Row>
        );
      })}
    </BoardContainer>
  );
}
