import React, { useState } from "react";
import ProfilImageWithDefaults from './profilImageWithDefaults';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteHoax } from "../api/apiCalls";
import Modal from "./Modal";
import { useApiProgress} from '../shared/ApiProgress';

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const { hoax, onDeleteHoax } = props;
    const { user, content, timestamp, fileAttachment, id } = hoax;
    const { username, displayName, image } = user;
    const [ modalVisible, setModalVisible ] = useState(false);

    const pendingApiCall = useApiProgress('delete',`/api/1.0/hoaxes/${id}`,true);

    const { i18n, t } = useTranslation();

    const onClickDelete = async () => {
        await deleteHoax(id);
        onDeleteHoax(id);
    };

    const onClickCancel = () => {
        setModalVisible(false);
    }

    const formatted = format(timestamp, i18n.language);

    const owneByLoggedInUser = loggedInUser === username;

    return (
        <>
            <div className=" card p-1">
                <div className="d-flex">
                    <ProfilImageWithDefaults 
                        image={image} 
                        width="32" 
                        height="32" 
                        className="rounded-circle pl-1"
                    />
                    <div className="flex-fill m-auto pl-2">
                    <Link className="text-dark" to={`/user/${username}`}>
                        <h6 className="d-inline">{displayName}@{username}</h6>
                        <span> - </span>
                        <span>{formatted}</span>
                    </Link>
                    {owneByLoggedInUser && (
                        <button className="btn btn-delete-link" onClick={()=> setModalVisible(true)}>
                            <i className="material-icons">delete_outline</i>
                        </button>
                    )}
                    </div>
                </div>
                <div className="pl-5"> 
                    {content}
                </div>
                {fileAttachment && (
                    <div className="pl-5">
                        {fileAttachment.fileType.startsWith('image') && (
                            <img alt="" src={'images/attachments' + fileAttachment.name} className="img-fluid"/>
                        )}
                        {!fileAttachment.fileType.startsWith('image') && (
                            <strong>Hoax has unkown attachment</strong>
                        )}
                    </div>
                )}
            </div>
            <Modal 
                visible={modalVisible} 
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                title= {t('Delete Hoax')}
                okButton={t('Delete Hoax')}
                message ={
                    <div>
                        <div>
                            <strong>{t('Are you sure to delete hoax?')}</strong>
                        </div>
                        <span>{content}</span>
                    </div>
                }     
            />
        </>
    );
};
export default HoaxView;