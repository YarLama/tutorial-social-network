import { FormikProvider, useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { postApi } from '../../../../app/api/postApi';
import { PostUpdateRequest } from '../../../../app/api/postApi/types';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { postSlice } from '../../../../app/store/reducers/PostSlice';
import { ImageUploadPreview } from '../../../../components';
import { Button, InputFile, InputTextarea, InputToggle } from '../../../../UI';
import { preparePostUpdateData } from '../../helpers/prepareSubmit';
import { validatePostUpdateValues } from '../../helpers/validatePostUpdateValues';
import './styles/style.scss'

interface IPostUpdateFormProps {
    postId: number;
    content: string;
    image: File | string | undefined | null;
    isCommentable: boolean;
    setShowModal?: Dispatch<SetStateAction<boolean>>;
}

const PostUpdateForm: React.FC<IPostUpdateFormProps> = ({postId, content, image, isCommentable = false, setShowModal}) => {

    const [isPostUpdated, setIsPostUpdated] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [updatePost] = postApi.useUpdatePostMutation();

    const initialValues: PostUpdateRequest = {
        title: '',
        content: content,
        updatedImage: image ?? undefined,
        isCommentable: isCommentable
    }

    const handleSubmit = async (values: PostUpdateRequest, actions: any) => {
        try {
            actions.setSubmitting(true);
            const body = preparePostUpdateData(
                values.content,
                values.updatedImage,
                values.isCommentable
            );
            const responce = await updatePost({data: body, id: postId}).unwrap();
            dispatch(postSlice.actions.updatePost(responce))
            actions.setSubmitting(false);
            if (setShowModal) setShowModal(false);
        } catch (e) {
            actions.setSubmitting(false);
            console.log(e);
        }
    }

    const handleUpdateField = () => {
        const initialFileName = initialValues.updatedImage ? (initialValues.updatedImage as string).split('/').slice(-1)[0] : "";
        const valuesFileName = values.updatedImage ? (values.updatedImage as File).name : "";
        const updatedContent = values.content === initialValues.content;
        const updatedImage = (!!values.updatedImage === !!initialValues.updatedImage) && (valuesFileName === initialFileName);
        const updatedCommentable = values.isCommentable === initialValues.isCommentable;

        updatedContent && updatedImage && updatedCommentable ? setIsPostUpdated(false) : setIsPostUpdated(true);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validatePostUpdateValues,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    useEffect(() => {
        handleUpdateField();
    }, [values])

    return (
        <div className='post-update-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='post-update-form-toolkit'>
                        <InputTextarea name='content' value={values.content ?? ''} contentError={errors.content}/>
                    </div>
                    <div className='post-update-form-comment-toggle'>
                        <InputToggle name='isCommentable' isChecked={values.isCommentable} label={'is post commentable?'}/>
                    </div>
                    <div className='post-update-form-preview'>
                        <InputFile name='updatedImage' value={values.updatedImage} content={'Attach Image'}/>
                        {values.updatedImage ? <ImageUploadPreview image={values.updatedImage} inputFileName='updatedImage'/> : null}
                    </div>
                    <div className='post-update-submit-btn'>
                        <Button content='Update Post' type='submit' disabled={!isPostUpdated || formik.isSubmitting}/>
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {PostUpdateForm};