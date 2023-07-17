import axios from 'axios';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { ImageUploadPreview } from '../../../../components';
import { Button, IconButton, InputFile, InputTextarea } from '../../../../UI';
import './styles/style.scss'

interface IPostUpdateFormProps {
    postId: number;
    content: string;
    image: File | string | undefined;
    isCommentable: boolean;
}

const PostUpdateForm: React.FC<IPostUpdateFormProps> = ({postId, content, image, isCommentable}) => {

    const [errorForm, setErrorForm] = useState<string>('');
    const { isMobile } = useWindowSize();

    const initialValues = {
        title: '',
        content: content,
        updateImage: image,
        isCommentable: isCommentable
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
        <div className='post-update-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='post-update-form-toolkit'>
                        <InputFile name='updateImage' value={values.updateImage} content={isMobile ? 'Attach Image' : ''}/>
                        <InputTextarea name='content' value={values.content}/>
                        {!isMobile ? 
                            <button className='update-btn' type='submit'>
                                <IconButton icon='send'/>
                            </button>
                            : <Button content='Update Post' type='submit'/>
                        }
                    </div>
                    <div className='post-update-form-preview'>
                        {values.updateImage ? <ImageUploadPreview image={values.updateImage instanceof File ? values.updateImage : null} inputFileName='updateImage'/> : null}
                    </div>
                </form>
            </FormikProvider>
            
        </div>
    );
};

export {PostUpdateForm};