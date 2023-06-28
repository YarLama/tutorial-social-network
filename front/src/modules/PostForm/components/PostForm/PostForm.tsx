import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { ImageUploadPreview } from '../../../../components';
import { Button, IconButton, InputFile, InputTextarea } from '../../../../UI';
import './styles/style.scss'

const PostForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');

    const initialValues = {
        content: '',
        image: null
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
                        <InputFile name='image'/>
                        <InputTextarea name='content' value={values.content}/>
                        <button type='submit'>
                            <IconButton icon='send'/>
                        </button>
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