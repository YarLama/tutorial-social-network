import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { Button, IconButton, InputTextarea } from '../../../../UI';
import './styles/style.scss';

const CommentForm: React.FC = () => {

    const { isMobile } = useWindowSize();

    const initialValues = {
        content: ''
    }

    const handleSubmit = async () => {

    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='comment-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='comment-form-toolkit'>
                        <InputTextarea name='content' value={values.content}/>
                        {!isMobile ? 
                            <button className='create-btn' type='submit'>
                                <IconButton icon='send'/>
                            </button>
                            : <Button content='Send Comment' type='submit'/>
                        }
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {CommentForm};