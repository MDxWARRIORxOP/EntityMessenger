import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

let step = 3;
let step2Callback;

let joinSpaceship = () => {
  step = 2;
  step2Callback = "joinSpaceShip";
};

let createSpaceShip = () => {
  step = 2;
  step2Callback = "createSpaceShip";
};

const JoinSpaceShipModal = (props) => {
  if (props.show == "false") {
    return "";
  } else {
    while (step == 1) {
      return (
        <div className="container">
          <button onClick={joinSpaceship}>
            <h1 className="black">
              <span className="underline">Join server</span>
            </h1>
          </button>
          <h2>OR</h2>
          <button onClick={createSpaceShip}>
            <h1 className="black">
              <span className="underline">Create server</span>
            </h1>
          </button>
        </div>
      );
    }

    while (step == 2) {
      return (
        <div className="container">
          <form>
            <div className="pfpLogo"></div>
            <input type="text" />
            <button type="submit">
              <FontAwesomeIcon icon={faSquareArrowUpRight} /> Add rooms
            </button>
          </form>
        </div>
      );
    }

    while (step == 3) {
      return (
        <div className="container">
          <h1 style={{ position: "fixed", paddingLeft: "50px" }}>Add rooms</h1>
        </div>
      );
    }

    while (step == 4) {
      return <></>;
    }
  }
};

JoinSpaceShipModal.propTypes = {
  show: PropTypes.bool,
};

export default JoinSpaceShipModal;
