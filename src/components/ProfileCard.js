import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfilImageWithDefaults from './profilImageWithDefaults';
import { useTranslation } from 'react-i18next';
import Input from "../components/Input";
import { updateUser } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from './ButtonWithProgress';
import { logoutSuccess, udateSuccess } from '../redux/authActions';
import  Modal  from './Modal';
import { deleteUser } from '../api/apiCalls';

const ProfileCard = props => {
    const [ inEditMode, setInEditMode ] = useState(false);
    const [ updateDisplayName, setuUdateDisplayName ] = useState();
    const { username : loggedInUsername } = useSelector((store) => ({username:store.username}));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [ user, setUser ] = useState({});
    const [ editTable, setEditTable ] = useState(false);
    const [ newImage, setNewImage ] = useState();
    const [ validationErrors, setValidationErrors ] = useState({});
    const [ modalVisible, setModalVisible ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditTable(pathUsername === loggedInUsername)
    }, [pathUsername, loggedInUsername]);
    useEffect(() => {
        setValidationErrors((previousValidationErrors) => ({
            ...previousValidationErrors,
            displayName: undefined
        })
        );
    },[updateDisplayName]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => ({
            ...previousValidationErrors,
            image: undefined
        })
        );
    },[newImage]);

    const { t } = useTranslation();
    const { username, displayName, image } = user;

    const pendingApiCallDeleteuser = useApiProgress('delete', `/api/1.0/users/${username}`, true);

    useEffect(() => {
        if(!inEditMode) {
            setuUdateDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setuUdateDisplayName (displayName)
        }
    }, [inEditMode, displayName]);

    const onClickSave = async () => {
        let image;
        if(newImage){
            image = newImage.split(',')[1]
        }

        const body = {
            displayName: updateDisplayName,
            image
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(udateSuccess(response.data));
        } catch (error){
            setValidationErrors(error.response.data.validationErrors);
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
        }
        fileReader.readAsDataURL(file);
    };
    
    const onClickCancel = () => {
        setModalVisible(false);
    };

    const onClickDeleteUser = async () => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push('/');
    };

    const pendingApiCall = useApiProgress('put', '/api/1.0/users' + username);

    const { displayName : displayNameError, image: imageError } = validationErrors;

    return (
       <div className="card text-center">
            <div className="card-header">
                <ProfilImageWithDefaults 
                    className="rounded-circle shadow" 
                    width="200" height="200"
                    alt={`${username}`} 
                    image={image}
                    temimage={newImage}
                />
            </div>
            <div className="card-body">
              {!inEditMode && (
                <>
                    <h3>
                        {displayName}@{username}
                    </h3>
                    {editTable && (
                        <>
                            <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                <i className="material-icons">edit</i>
                                {t('Edit')}
                            </button>
                            <div className="pt-2">
                                <button className="btn btn-danger d-inline-flex" onClick={() => setModalVisible(true)}>
                                    <i className="material-icons">directions_run</i>
                                    {t('Delete My Account')}
                                </button>
                            </div>
                        </>
                    )}
                </>
              )}
              {inEditMode && (
                <div>
                    <Input 
                        label={t("Change Display name")} 
                        defaultValue={displayName}
                        onChange={(event) => {setuUdateDisplayName(event.target.value)}}
                        error={displayNameError}
                    />
                    <Input type="file" onChange={onChangeFile} error={imageError}/>
                    <div>
                        <ButtonWithProgress 
                            className="btn btn-primary d-inline-flex" 
                            onClick={onClickSave}
                            disabled={pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={
                                <>
                                    <i className="material-icons">save</i>
                                    {t('Save')}
                                </>
                            }
                        />
                        <button 
                            className="btn btn-light d-inline-flex ml-1" 
                            onClick={() => setInEditMode(false)}
                            disabled={pendingApiCall}
                        >
                            <i className="material-icons">close</i>
                            {t('Cancel')}
                        </button>
                    </div>
                </div>
              )}
            </div>
            <Modal 
                visible={modalVisible} 
                onClickCancel={onClickCancel}
                onClickOk={onClickDeleteUser}
                pendingApiCall={pendingApiCallDeleteuser}
                message ={t('Are you sure to delete your account?')}  
                title={t('Delete My Account')}
                okButton={t('Delete My Account')}   
            />
        </div>
    );
};
export default ProfileCard;