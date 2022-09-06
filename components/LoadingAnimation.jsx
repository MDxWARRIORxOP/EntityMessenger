import PropTypes from "prop-types";

function LoadingAnimation(props) {
  if (props.show) {
    return (
      <video
        autoPlay
        loop
        muted
        src="/EntityLoading.mp4"
        className="loadingAnimation"
      />
    );
  } else {
    return "";
  }
}

LoadingAnimation.defaultProps = {
  show: PropTypes.bool,
};

export default LoadingAnimation;
