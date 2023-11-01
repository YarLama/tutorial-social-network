import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserMessagesQuery } from '../../../../app/api/messageApi';
import { useGetUserByIdQuery } from '../../../../app/api/userApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import MessageDialogue from '../MessageDialogue/MessageDialogue';
import MessageUserList from '../MessageUsersList/MessageUserList';
import './styles/style.scss'

const MessagePage = () => {

    const {id} = useParams();
    const {data: userData} = useGetUserByIdQuery(id);
    const {data, refetch} = useGetUserMessagesQuery('');
    const {penPalUsers, currentPenPalUserInfo} = useAppSelector(state => state.messageReducer)
    const dispatch = useAppDispatch();

    console.log(currentPenPalUserInfo)

    useEffect(() => {
        if (data) dispatch(messageSlice.actions.setMessages(data))
    }, [data])

    useEffect(() => {
        refetch();
    }, [penPalUsers]);

    useEffect(() => {
        if (id && userData) dispatch(messageSlice.actions.setCurrentPenPalUserInfo({
            id: Number(id),
            name: userData.first_name
        }))
    }, [userData, id])

    useEffect(() => {
        if (data) dispatch(messageSlice.actions.setMessages(data))
    },[])

    return (
        <div className='message-page'>
            <MessageUserList currentUserId={currentPenPalUserInfo.id}/>
            <MessageDialogue penPalUserId={currentPenPalUserInfo.id}/>
        </div>
    );
};

export {MessagePage};