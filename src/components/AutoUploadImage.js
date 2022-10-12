import React from 'react'
import './AutoUploadImage.css';
const AutoUploadImage = (props) => {
    const { image, uploading } = props;
  return (
    <div style={{position:'relative'}}>
        <img className="img-thumbnail" src={image} alt=""/>
        <div className="overlay" style={{opacity: uploading ? 1 : 0}}>
            <div className="d-flex justify-content-center h-100">
                <div className="spinner-border text-light m-auto">
                    <span className="sr-only"></span>
                </div>
            </div>
        </div>
    </div>
  )
}
export default AutoUploadImage;
