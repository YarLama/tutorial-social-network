import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserMessagesQuery } from '../../../../app/api/messageApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import MessageUserList from '../MessageUsersList/MessageUserList';
import './styles/style.scss'

const MessagePage = () => {

    const {id} = useParams();
    const [currentPenPalUser, setCurrentPenPalUser] = useState<number>(id ? Number(id) : 0);
    const {data, refetch} = useGetUserMessagesQuery('');
    const {penPalUsers} = useAppSelector(state => state.messageReducer)
    const dispatch = useAppDispatch();

    const handleCurrentPenPalUser = (id: number) => {
        setCurrentPenPalUser(id);
    }

    console.log(currentPenPalUser)

    useEffect(() => {
        dispatch(messageSlice.actions.setMessages(data ?? []))
    }, [data])

    useEffect(() => {
        refetch();
    }, [penPalUsers]);

    return (
        <div className='message-page'>
            <MessageUserList onPenPalUserClick={handleCurrentPenPalUser} currentUserId={currentPenPalUser}/>
        </div>
    );
};

export {MessagePage};