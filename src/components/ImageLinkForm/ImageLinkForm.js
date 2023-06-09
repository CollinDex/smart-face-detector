import React from "react";
import '../../App.css'
import './ImageLinkForm.css'

const ImageLinkFrorm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" name="url" onChange={onInputChange}/>
                    <button className="w-30 grow f4 ph3 pv2 dib white btn-grad r-bd" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkFrorm;
