import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserMessagesQuery } from '../../../../app/api/messageApi';
import { useGetUserByIdQuery } from '../../../../app/api/userApi';
import { getLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import MessageDialogue from '../MessageDialogue/MessageDialogue';
import MessageUserList from '../MessageUsersList/MessageUserList';
import './styles/style.scss'

const token = getLocalToken();

const MessagePage = () => {

    const {id} = useParams();
    
    const {data: userData, error: userError, isLoading: userLoading} = useGetUserByIdQuery(Number(id), { skip: id === undefined});
    const {data, refetch} = useGetUserMessagesQuery('', {pollingInterval: 10000});
    const navigate = useNavigate();
    const {currentPenPalUserInfo} = useAppSelector(state => state.messageReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(messageSlice.actions.resetMessages())
        refetch()
    }, [])

    useEffect(() => {
        if (data) dispatch(messageSlice.actions.setMessages(data))
    }, [data])

    useEffect(() => {
        if (id && userData) dispatch(messageSlice.actions.setCurrentPenPalUserInfo({
            id: Number(id),
            name: userData.first_name
        }))
    }, [userData, id, data])

    useEffect(() => {
        if ((userError as AxiosError)?.status === 500) navigate(RoutePaths.MESSAGE_PAGE);
    }, [userLoading])

    return (
        <div className='message-page'>
            <MessageUserList currentUserId={currentPenPalUserInfo.id}/>
            <MessageDialogue penPalUserId={currentPenPalUserInfo.id}/>
        </div>
    );
};

export {MessagePage};