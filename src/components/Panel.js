import styled from "styled-components";

const PanelContainer = styled.div`
  width: 180px;
  height: 570px;
  margin-right: 20px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PanelStatus = styled.div`
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  width: 80%;
  height: 40px;
`;

const TimeContainer = styled.ol`
  width: 80%;
  height: 520px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const TimeSlot = styled.li`
  line-height: 40px;
  text-align: center;
  margin-top: 8px;
  width: 100%;
  height: 40px;
  background: #cdcdcd
  border: none;
  cursor: pointer;

  &:hover {
    color: white;
    background: grey;
  }
`;

export default function Panel({
  winner,
  isBlackNext,
  history,
  setStepNumber,
  setIsBlackNext,
}) {
  const jumpTo = (step) => {
    setStepNumber(step);
    setIsBlackNext(step % 2 === 0);
  };
  return (
    <PanelContainer>
      <PanelStatus>
        {winner
          ? winner === "draw"
            ? "平手"
            : winner === "b"
            ? "黑棋勝利 😎"
            : "白棋勝利 😎"
          : isBlackNext
          ? "換黑棋下"
          : "換白棋下"}
      </PanelStatus>
      <TimeContainer>
        {history.map((time, index) => {
          return (
            <TimeSlot
              onClick={() => {
                jumpTo(index);
              }}
              key={index}
            >
              Back to #{index}
            </TimeSlot>
          );
        })}
      </TimeContainer>
    </PanelContainer>
  );
}
