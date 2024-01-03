import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { messageApi } from '../../../../app/api/messageApi';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import { ImageUploadPreview } from '../../../../components';
import { IconButton, InputFile, InputTextarea } from '../../../../UI';
import { prepareCreateMessageData, prepareUpdateMessageData } from '../../helpers/prepareSubmit';
import { MessageFormInitialValues, MessageFormValues } from '../../helpers/types';
import { validateMessageFormCreateValues, validateMessageFormUpdateValues } from '../../helpers/validateMessageFormValues';
import './styles/style.scss'

interface IMessageFormProps {
    from: number;
    to: number;
    purpose: 'create' | 'update';
    updatedMessage?: MessageModelType;
}

const MessageForm: React.FC<IMessageFormProps> = ({from, to, purpose}) => {

    let selectedMessage: MessageModelType | undefined;

    const dispatch = useAppDispatch();
    const {selectedMessages, penPalUsers} = useAppSelector(state => state.messageReducer);
    const [createMessage] = messageApi.useCreateMessageMutation();
    const [updateMessage] = messageApi.useUpdateMessageMutation();
    const scrollRef = useRef<boolean>(true);

    if (purpose === 'update') {
        penPalUsers.map(penPal => {
            if (penPal.id === from || penPal.id === to) {
                const message = penPal.messages.find(message => message.id === selectedMessages[0])
                selectedMessage = message;
            }
        });
    }

    const handleCreateSubmit = async (values: MessageFormValues, actions: FormikHelpers<MessageFormValues>) => {
        try {
            actions.setSubmitting(true)
            console.log('create', values);
            const body = prepareCreateMessageData(values);
            const responce = await createMessage(body).unwrap();
            dispatch(messageSlice.actions.addMessage(responce));
            actions.resetForm();
            actions.setSubmitting(false);
        } catch (e) {
            console.log(e);
        }
    }

    const handleUpdateSubmit = async (values: MessageFormValues, actions: FormikHelpers<MessageFormValues>) => {
        try {
            actions.setSubmitting(true)
            const body = await prepareUpdateMessageData(values);
            if (selectedMessage) {
                const responce = await updateMessage({id: selectedMessage.id, data: body}).unwrap();
                dispatch(messageSlice.actions.updateMessage(responce));
            }
            actions.resetForm();
            actions.setSubmitting(false);
        } catch (e) {
            console.log(e);
        }
    }

    const initialValues: MessageFormInitialValues = {
        'create': {
            from_userId: from,
            to_userId: to,
            content: '',
            image: undefined
        },
        'update': {
            from_userId: from,
            to_userId: to,
            content: selectedMessage?.content ?? '',
            image: selectedMessage?.image === null ? undefined : selectedMessage?.image
        }
    }

    const messageFormSubmit = {
        'create': handleCreateSubmit,
        'update': handleUpdateSubmit
    }

    const messageFormValidate = {
        'create': (values: MessageFormValues) => validateMessageFormCreateValues(values),
        'update': (values: MessageFormValues) => validateMessageFormUpdateValues(values, initialValues['update'])
    }

    const formik = useFormik({
        initialValues: initialValues[purpose],
        validate: messageFormValidate[purpose],
        validateOnChange: true,
        onSubmit: messageFormSubmit[purpose],
        enableReinitialize: true
    })

    const {errors, values, isSubmitting} = formik;

    useEffect(() => {
        if (purpose === 'update') {
            if (scrollRef.current) {
                const form = document.querySelector('.message-form-toolkit');
                const textarea = form?.querySelector('textarea');
                if (textarea) {
                    textarea.focus();
                    textarea.scrollTo(0, textarea.scrollHeight)
                    scrollRef.current = false;
                }
            }
        }

        () => scrollRef.current = true;
        
    }, [formik.values.content]);

    useEffect(() => {
        if (!scrollRef.current) scrollRef.current = true;    
    }, [purpose])

    return (
        <div className='message-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='message-form-toolkit'>
                        <InputFile name='image' value={values.image} iconSize='s'/>
                        <InputTextarea name='content' extraClassName='message-textarea' value={values.content} maxLength={254}/>
                        <button className='submit-btn' type='submit' disabled={Object.keys(errors).length !== 0 || isSubmitting}>
                            {purpose === 'create' ? <IconButton icon='send' size='s'/> : <IconButton icon='edit' size='s'/>}
                        </button>
                    </div>
                    <div className='message-form-preview'>
                        {values.image && <ImageUploadPreview image={values.image} inputFileName='image'/>}
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {MessageForm};