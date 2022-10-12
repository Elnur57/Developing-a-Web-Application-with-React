import React, { useState, useEffect } from "react";
import { getHoaxes, getNewHoaxes, getOlHoaxes, getNewHoaxCount } from '../api/apiCalls';
import { useTranslation } from "react-i18next";
import HoaxView from "./HoaxView";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const HoaxFeed = () => {
    const [ hoaxPage, setHoaxPage ] = useState({ 
        content: [], 
        last: true, 
        number: 0 
    });
    const  [ newHoaxCount, setNewHoaxCount ] = useState(0);
    const { username } = useParams();

    const { t } = useTranslation();

    const path = username ? `/api/1.0/users/${username}/hoaxes?page= ` : '/api/1.0/hoaxes?page=';
    const initialHoaxLoadProgress = useApiProgress('get', path);
    
    
    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if(hoaxPage.content.length > 0) {
        firstHoaxId = hoaxPage.content[0].id;

        const lastHoaxIndex = hoaxPage.content.length - 1;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    };
    const oldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes${lastHoaxId}`; 
    const loadOlHoaxesProgress = useApiProgress('get', oldHoaxPath, true);

    const newHoaxPath = username 
    ? `/pi/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after` 
    : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;
    const loadNewHoaxesProgress = useApiProgress('get', newHoaxPath, true);

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewHoaxCount(firstHoaxId, username);
            setNewHoaxCount(response.data.count);
        }
        //js de olan tekrar-tekrar cagirmaq ucun
        let looper = setInterval( getCount, 1000);
        return function cleanup() {
            clearInterval(looper);
        };
    },[firstHoaxId, username]);

    useEffect(()=> {
        const loadHoaxes = async page => {
            try {
                const response = await getHoaxes(username, page);
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }));
            }catch(error){}
        };
        loadHoaxes();
    }, [username]);

    const loadOlHoaxes = async () => {
        const response = await getOlHoaxes(lastHoaxId, username);
        setHoaxPage(previousHoaxPage => ({
            ...response.data,
            content: [...previousHoaxPage.content, ...response.data.content]
        }));
    };

    const loadNewHoaxes = async () => {
        const response = await getNewHoaxes(lastHoaxId, username);
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: [...response.data, ...previousHoaxPage.content]
        }));
         setNewHoaxCount(0);
    };

    const onDeleteHoaxSuccess = id => {
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: previousHoaxPage.content.filter(hoax => hoax.id !== id)
        }))
    };

    const { content, last } = hoaxPage;

    if(content.length === 0) {
        return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress ? <Spinner/> : t('There are no hoaxes')}</div>
    }

    return (
        <div>
            {newHoaxCount > 0 && (
                <div 
                    className="alert alert-secondary text-center mb-1"
                    style={{cursor: loadNewHoaxesProgress ? 'not-allowed' : 'pointer'}} 
                    onClick={loadNewHoaxesProgress ? () => {} : loadNewHoaxes}
                > 
                   {loadNewHoaxesProgress ? <Spinner/> : t('There are new hoaxes')}
                </div>
            )}
            {content.map(hoax => {
                return <HoaxView hoax={hoax} key={hoax.id} onDeleteHoax={onDeleteHoaxSuccess}/>                
            })}
            {!last && (
                <div 
                    className="alert alert-secondary text-center" 
                    style={{cursor: loadOlHoaxesProgress ? 'not-allowed' : 'pointer'}} 
                    onClick={loadOlHoaxesProgress ? () => {} : loadOlHoaxes}
                >
                   {loadOlHoaxesProgress ? <Spinner/> : t('Load old hoaxes')}
                </div>
            )}
        </div>
    )
}
export default HoaxFeed;