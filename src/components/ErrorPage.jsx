import React from "react";

const ErrorPage = ({ errorCode, errorDescription, errorImage }) => {
  return (
    <div className="text-center py-5">
      <img 
        src={errorImage} 
        alt={`Error ${errorCode}`} 
        style={{ width: "300px", marginBottom: "20px" }} 
      />
      <h1 className="display-1 fw-bold">{errorCode}</h1>
      <p className="lead">{errorDescription}</p>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Back to Safety
      </button>
    </div>
  );
};

export default ErrorPage;