import "./style.scss";

const LoadingSlider = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingSlider