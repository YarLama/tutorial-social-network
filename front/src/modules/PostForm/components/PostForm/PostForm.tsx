import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { postApi } from '../../../../app/api/postApi';
import { PostCreateRequest } from '../../../../app/api/postApi/types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { postSlice } from '../../../../app/store/reducers/PostSlice';
import { ImageUploadPreview } from '../../../../components';
import { Button, IconButton, InputFile, InputTextarea } from '../../../../UI';
import { preparePostCreateData } from '../../helpers/prepareSubmit';
import { validatePostCreateValues } from '../../helpers/validatePostCreateValues';
import './styles/style.scss'

const PostForm: React.FC = () => {

    const { isMobile } = useWindowSize();
    const { user } = useAppSelector(state => state.authReducer);
    const [createPost] = postApi.useCreatePostMutation();
    const dispatch = useAppDispatch();
    

    const initialValues: PostCreateRequest = {
        title: '',
        content: '',
        image: undefined,
        userId: Number(user.id)
    }

    const handleSubmit = async (values: PostCreateRequest, actions: FormikHelpers<PostCreateRequest>) => {
        try {
            actions.setSubmitting(true);
            const body = preparePostCreateData(
                values.content,
                values.image,
                (values.userId).toString()
            );
            const responce = await createPost(body).unwrap();
            dispatch(postSlice.actions.addPost(responce))
            actions.resetForm();
        } catch (e) {
            console.log(e);
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validatePostCreateValues,
        validateOnChange: false,
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
                        <InputTextarea name='content' value={values.content ?? ''} contentError={errors.content}/>
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