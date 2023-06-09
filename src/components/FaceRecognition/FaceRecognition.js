import React from "react";
import '../../App.css'
import './FaceRecognition.css'
const FaceRecognition = ({ imageUrl, faceCount, box }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' src={imageUrl} alt="" width='500px' height='auto'/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                <p className="white f3">{faceCount}</p>
            </div>
            
        </div>
    );
}

export default FaceRecognition;
