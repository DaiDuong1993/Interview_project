import React from "react";

const Images = (props) => {
  
  const handleClick = () => {
    props.openImagesMaxSceen();
  };
  return (
    <div className="modal">
      <span className="modal-close" onClick={()=>handleClick()}>&times;</span>
      <img className="modal-content" src={props.url} alt=""></img>
    </div>
  );
};

export default Images;
