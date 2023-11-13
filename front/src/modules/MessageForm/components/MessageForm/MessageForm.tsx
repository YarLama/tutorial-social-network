import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { MessageCreateRequest, MessageUpdateRequest } from '../../../../app/api/messageApi/types';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { ImageUploadPreview } from '../../../../components';
import { IconButton, InputFile, InputTextarea } from '../../../../UI';
import './styles/style.scss'

interface IMessageFormProps {
    from: number;
    to: number;
    purpose: 'create' | 'update';
    updatedMessage?: MessageModelType;
}

const MessageForm: React.FC<IMessageFormProps> = ({from, to, purpose}) => {

    let selectedMessage: MessageModelType | undefined;
    type MessageFormValuesType = MessageCreateRequest | MessageUpdateRequest;

    const {selectedMessages, penPalUsers} = useAppSelector(state => state.messageReducer);

    const scrollRef = useRef<boolean>(true);

    if (purpose === 'update') {
        penPalUsers.map(penPal => {
            if (penPal.id === from || penPal.id === to) {
                const message = penPal.messages.find(message => message.id === selectedMessages[0])
                selectedMessage = message;
            }
        });
    }

    let initialValues: MessageCreateRequest | MessageUpdateRequest = purpose === 'create' ? 
    {
        from_userId: from,
        to_userId: to,
        content: '',
        image: undefined
    }
    : {
        from_userId: from,
        to_userId: to,
        content: selectedMessage?.content ?? '',
        image: selectedMessage?.image === null ? undefined : selectedMessage?.image
    }

    const handleSubmit = async (values: MessageFormValuesType, actions: FormikHelpers<MessageFormValuesType>) => {
        try {
            console.log(purpose, values);
        } catch (e) {
            console.log(e);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: false,
        onSubmit: handleSubmit,
        enableReinitialize: true
    })

    useEffect(() => {
        if (purpose === 'update') {
            if (scrollRef.current) {
                const form = document.querySelector('.message-form-toolkit');
                if (form) {
                    const textarea = form.querySelector('textarea');
                    if (textarea) {
                        //textarea.scrollIntoView({block: 'end'});
                        textarea.focus();
                        textarea.scrollTo(0, textarea.scrollHeight)
                        scrollRef.current = false;
                        console.log('render', textarea.scrollHeight)
                    }
                    
                }
            }
        }

        () => scrollRef.current = true
    }, [formik.values.content])

    const {errors, values} = formik;

    return (
        <div className='message-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='message-form-toolkit'>
                        <InputFile name='image' value={values.image} iconSize='s'/>
                        <InputTextarea name='content' extraClassName='message-textarea' value={values.content} contentError={errors.content}/>
                        <button className='create-btn' type='submit'>
                            <IconButton icon='send' size='s'/>
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