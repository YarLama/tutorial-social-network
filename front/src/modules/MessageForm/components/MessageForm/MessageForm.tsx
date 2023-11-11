import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { MessageCreateRequest } from '../../../../app/api/messageApi/types';
import { ImageUploadPreview } from '../../../../components';
import { IconButton, InputFile, InputTextarea } from '../../../../UI';
import './styles/style.scss'

interface IMessageFormProps {
    from: number;
    to: number;
}

const MessageForm: React.FC<IMessageFormProps> = ({from, to}) => {

    const initialValues: MessageCreateRequest = {
        from_userId: from,
        to_userId: to,
        content: '',
        image: undefined
    }

    const handleSubmit = async (values: MessageCreateRequest, actions: FormikHelpers<MessageCreateRequest>) => {
        try {
            console.log(values);
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