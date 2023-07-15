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
    const [attachedImage, setAttachedImage] = useState<File>();
    const { isMobile } = useWindowSize();

    useEffect(() => {
        console.log(['FROM FORM START', image , attachedImage])
        if (image) {
            image instanceof File ? setAttachedImage(image)
            : axios.get(image, {responseType: "blob"}).then(responce => {
                let file = new File([responce.data], 'image.jpg', {type: 'image/jpeg'})
                console.log(['FROM FORM ', responce.data, file])
                setAttachedImage(file)
            }).catch(err => console.log(err));
        }
        console.log(['FROM FORM END', image , attachedImage])
    }, [])

    // const getFileFromUrl = async (url: string): File => {
    //     axios.get(url, {responseType: "blob"}).then(responce => {
    //         let file = new File([responce.data], 'image.jpg', {type: 'image/jpeg'})
    //         console.log(['FROM FORM ', responce.data, file])
    //         return file
    //     }).catch(err => console.log(err));
    // }

    const initialValues = {
        title: '',
        content: content,
        image: attachedImage,
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
        <div className='post-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <div className='post-form-toolkit'>
                        <InputFile name='image' value={values.image} content={isMobile ? 'Attach Image' : ''}/>
                        <InputTextarea name='content' value={values.content}/>
                        {!isMobile ? 
                            <button className='update-btn' type='submit'>
                                <IconButton icon='send'/>
                            </button>
                            : <Button content='Update Post' type='submit'/>
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

export {PostUpdateForm};