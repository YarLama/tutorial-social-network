import React, { useEffect } from 'react';
import { useGetUserMessagesQuery } from '../../../../app/api/messageApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import MessageUserList from '../MessageUsersList/MessageUserList';

const MessagePage = () => {

    const {data, refetch} = useGetUserMessagesQuery('');
    const {penPalUsers} = useAppSelector(state => state.messageReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(messageSlice.actions.setMessages(data ?? []))
    }, [data])

    useEffect(() => {
        refetch();
    }, [penPalUsers]);

    console.log(penPalUsers)

    return (
        <div className='message-page'>
            <MessageUserList />
        </div>
    );
};

export {MessagePage};