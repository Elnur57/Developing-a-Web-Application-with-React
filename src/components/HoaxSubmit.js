import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProfilImageWithDefaults from "./profilImageWithDefaults";
import { postHoax, postHoaxAttachment } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from './ButtonWithProgress';
import Input from "./Input";
import AutoUploadImage from './AutoUploadImage';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({image: store.image}));
    const [ focused, setFocused ] = useState(false);
    const [ hoax, setHoax ] = useState('');
    const [ errors, setErrors ] = useState({});
    const [ newImage, setNewImage ] = useState();
    const [ attachmentId, setAttachmentId ] = useState();
    const { t } = useTranslation();

    // cancel olanda legv olur. 
    useEffect(() => {
        if(!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    },[hoax]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
    const pendingFileUpload = useApiProgress('ppst', '/api/1.0/hoax-attachments', true);

    const onClickHoaxify = async () => {
        const body = {
            content: hoax,
            attachmentId
        };

        try{
            await postHoax(body)
        }catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors);
            }
        }
    };

    const onChangeFile = event => {
        if(event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    };
    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file)
        const response = await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id)
    };

    let textAreaClass = 'form-control';
    if(errors.content) {
        textAreaClass += ' is-invalid'
    }

    return (
        <div className="card p-1 flex-row">
            <ProfilImageWithDefaults image={image} width="32" height="32" className="rounded-circle mr-1"/>
            <div className="flex-fill">
                <textarea 
                    className={textAreaClass} 
                    rows={focused ? '3' : '1'} 
                    onFocus={() => setFocused(true)}
                    onChange={event => setHoax(event.target.value)}
                    value={hoax}
                />
                <div className="invalid-feedback">{errors.content}</div>
                {focused && (
                    <>
                    {!newImage && <Input type="file" onChange={onChangeFile}/>}
                    {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload}/>}
                    <div className="text-end mt-1">
                        <ButtonWithProgress 
                            className="btn btn-primary" 
                            onClick={onClickHoaxify} 
                            text={t('Write')}
                            pendingApiCall={pendingApiCall}
                            disabled={pendingApiCall || pendingFileUpload}
                        />
                        <button 
                            className="btn btn-light d-inline-flex ml-1" 
                            onClick={() => setFocused(false)}
                            disabled={pendingApiCall || pendingFileUpload}
                        >
                            <i className="material-icons">close</i>
                            {t('Cancel')}
                        </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default HoaxSubmit;