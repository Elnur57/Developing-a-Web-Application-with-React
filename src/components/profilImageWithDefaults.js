import React from 'react';
import defaultPicture from '../image/12.png';

const ProfilImageWithDefaults = props => {
    
    const { image, temimage } = props;
    
    let imageSource = defaultPicture;
    if(image) {
        imageSource = 'images/profile/' + image;
    }

    return <img 
                src={temimage || imageSource }
                alt={`Profile`} 
                {...props}
                onError={(event)=> {
                    event.target.src = defaultPicture
                }}
            />
}
export default ProfilImageWithDefaults;