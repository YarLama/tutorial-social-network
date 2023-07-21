import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { userApi } from '../../../../app/api/userApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { ImageUploadPreview } from '../../../../components';
import { Button, IconButton, InputFile, InputTextarea } from '../../../../UI';
import './styles/style.scss'

const PostForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const { isMobile } = useWindowSize();
    

    const initialValues = {
        content: '',
        image: undefined
    }

    const handleSubmit = async (values: any, actions: any) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='post-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='post-form-toolkit'>
                        <InputFile name='image' content={isMobile ? 'Attach Image' : ''} value={values.image}/>
                        <InputTextarea name='content' value={values.content}/>
                        {!isMobile ? 
                            <button className='create-btn' type='submit'>
                                <IconButton icon='send'/>
                            </button>
                            : <Button content='Create Post' type='submit'/>
                        }
                    </div>
                    <div className='post-form-preview'>
                        {values.image ? <ImageUploadPreview image={values.image} inputFileName='image'/> : null}
                    </div>
                </form>
            </FormikProvider>
            
        </div>
    );
};

export {PostForm};