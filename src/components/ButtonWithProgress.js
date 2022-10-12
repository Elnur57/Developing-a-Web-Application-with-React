import React from "react";

const ButtonWithProgress = props => {
    const { onClick, pendingApiCall, disabled, text, className } = props;
    
    return(
        <button 
          className={className || "btn btn-primary"}
          onClick={onClick}
          disabled = {disabled}
          //disabled = {pendingApiCall || passwordRefeat !== undefined}
         > 
        {text}
        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}            
        </button>
    );
};
export default ButtonWithProgress;