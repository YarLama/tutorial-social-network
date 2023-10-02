import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { commentApi } from '../../../../app/api/commentApi';
import { CommentCreateRequest } from '../../../../app/api/commentApi/types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { commentSlice } from '../../../../app/store/reducers/CommentSlice';
import { Button, IconButton, InputTextarea } from '../../../../UI';
import { validateCreateCommentValues } from '../../helpers/validateCreateCommentValues';
import './styles/style.scss';

interface ICommentFormProps {
    postId: number;
}

const CommentForm: React.FC<ICommentFormProps> = ({postId}) => {

    const { isMobile } = useWindowSize();
    const { id: userId } = useAppSelector(state => state.authReducer.authUserInfo) 
    const [createComment] = commentApi.useCreateCommentMutation();
    const dispatch = useAppDispatch();

    const initialValues: CommentCreateRequest = {
        postId: postId,
        userId: userId ?? 0,
        content: ''
    }

    const handleSubmit = async (values: CommentCreateRequest, actions: FormikHelpers<CommentCreateRequest>) => {
        try {
            actions.setSubmitting(true);
            const responce = await createComment(values).unwrap();
            dispatch(commentSlice.actions.addComment(responce));
            actions.resetForm();
        } catch (e) {
            console.log(e)
        }
        
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateCreateCommentValues,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='comment-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='comment-form-toolkit'>
                        <InputTextarea name='content' value={values.content} contentError={errors.content}/>
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