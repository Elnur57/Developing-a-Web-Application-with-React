import React from "react";
import { useTranslation } from 'react-i18next';
//import {changeLanguage} from '../api/apiCalls';
import azerbaijan from '../image/azerbaijan.png';
import English from '../image/united-kingdom.png';

const LanguageSelector = (props) => {
    const {i18n} = useTranslation();

    const onChangeLanguage = language => {
    //i18n.ChangeLanguage(language);
        i18n.changeLanguage(language);
    };

    return (
        <div className="container">
            <img src={azerbaijan} alt="Azerbaijan flag"  className="img-thumbnail" onClick={() => onChangeLanguage('az')}/>
            <img src={English} alt= "English flag"  className="img-thumbnail" onClick={() => onChangeLanguage('en')}/>
        </div>
    );
};
export default LanguageSelector;