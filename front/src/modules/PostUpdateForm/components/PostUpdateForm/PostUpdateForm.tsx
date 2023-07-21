import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { ImageUploadPreview } from '../../../../components';
import { Button, InputFile, InputTextarea, InputToggle } from '../../../../UI';
import './styles/style.scss'

interface IPostUpdateFormProps {
    postId: number;
    content: string;
    image: File | string | undefined | null;
    isCommentable: boolean;
}

const PostUpdateForm: React.FC<IPostUpdateFormProps> = ({postId, content, image, isCommentable = false}) => {

    const [errorForm, setErrorForm] = useState<string>('');
    const { isMobile } = useWindowSize();

    const initialValues = {
        title: 'post',
        content: content,
        updateImage: image,
        commentable: isCommentable
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
                        <InputTextarea name='content' value={values.content}/>
                    </div>
                    <div className='post-update-form-comment-toggle'>
                        <InputToggle name='commentable' isChecked={values.commentable} label={'is post commentable?'}/>
                    </div>
                    <div className='post-update-form-preview'>
                        <InputFile name='updateImage' value={values.updateImage} content={'Attach Image'}/>
                        {values.updateImage ? <ImageUploadPreview image={values.updateImage instanceof File ? values.updateImage : null} inputFileName='updateImage'/> : null}
                    </div>
                    <div className='post-update-submit-btn'>
                        <Button content='Update Post' type='submit'/>
                        <Button content='Delete Post' type='submit'/>
                    </div>
                </form>
            </FormikProvider>
            
        </div>
    );
};

export {PostUpdateForm};