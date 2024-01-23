import React from "react";
import { connect } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

function Wheel(props) {
  const { moveClockwise, moveCounterClockwise, activeCog } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`cog ${i === activeCog ? "active" : ""}`}
            style={{ "--i": i }}
          >
            {i === activeCog ? "B" : ""}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button onClick={moveCounterClockwise} id="counterClockwiseBtn">
          Counter clockwise
        </button>
        <button onClick={moveClockwise} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
}

// Map the state to props
const mapStateToProps = (state) => ({
  activeCog: state.wheel,
});

// Connect the component to the Redux store
export default connect(mapStateToProps, {
  moveClockwise,
  moveCounterClockwise,
})(Wheel);

