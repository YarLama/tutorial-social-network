import { FormikProvider, useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { commentApi } from '../../../../app/api/commentApi';
import { CommentUpdateRequest } from '../../../../app/api/commentApi/types';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { commentSlice } from '../../../../app/store/reducers/CommentSlice';
import { Button, InputTextarea } from '../../../../UI';
import { validateUpdateCommentValues } from '../../helpers/validateUpdateCommentValues';

interface ICommentUpdateFormProps {
    id: number;
    userId: number;
    content: string;
    setShowModal?: Dispatch<SetStateAction<boolean>>;
}

const CommentUpdateForm: React.FC<ICommentUpdateFormProps> = ({id, userId, content, setShowModal}) => {

    const [isCommentUpdated, setisCommentUpdated] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [updateComment] = commentApi.useUpdateCommentMutation();

    const initialValues: CommentUpdateRequest = {
        userId: userId,
        content: content
    }

    const handleSubmit = async (values: CommentUpdateRequest, actions: any) => {
        try {
            actions.setSubmitting(true);
            const responce = await updateComment({data: values, id: id}).unwrap();
            dispatch(commentSlice.actions.updateComment(responce));
            actions.setSubmitting(false);
            if (setShowModal) setShowModal(false);
        } catch (error) {
            actions.setSubmitting(false);
            console.log(error)
        }
    }

    const handleUpdateField = () => {
        const updatedContent = values.content === initialValues.content;

        updatedContent ? setisCommentUpdated(false) : setisCommentUpdated(true)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateUpdateCommentValues,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    const { values, errors } = formik;

    useEffect(() => handleUpdateField(), [values]);

    return (
        <div className='comment-update-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='comment-update-form-toolkit'>
                        <InputTextarea name='content' value={values.content} contentError={errors.content}/>
                    </div>
                    <div className='comment-update-submit-btn'>
                        <Button content='Update Comment' type='submit' disabled={!isCommentUpdated || formik.isSubmitting}/>
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
};

export {CommentUpdateForm};