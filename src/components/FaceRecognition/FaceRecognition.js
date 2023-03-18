import React from "react";
import '../../App.css'

const FaceRecognition = ({ imageUrl, faceCount }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputimage' src={imageUrl} alt="" width='500px' height='auto'/>
                <p className="white f3">{faceCount}</p>
            </div>
            
        </div>
    );
}

export default FaceRecognition;
