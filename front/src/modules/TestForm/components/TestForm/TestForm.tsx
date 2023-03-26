import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { ImageUploadPreview } from '../../../../components';
import { Button, InputFile, InputText, InputTextarea } from '../../../../UI';
import './styles/style.scss';

interface IFormikFormProps {

}

interface IFormValues {
    firstName: string;
    optional: string;
    image_file: File | null;
}

interface IFormErrors {
    firstName?: string | null;
    optional?: string | null;
    image_file?: string | null;
}

const TestForm: React.FC<IFormikFormProps> = () => {

    const initialValues: IFormValues = {
        firstName: '',
        optional: '',
        image_file: null
    };

    const handleSubmit = (values: IFormValues, actions: FormikHelpers<IFormValues>): void => {
        
        console.log('Submit', values)   
        actions.resetForm({values: initialValues})
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        formik.setFieldValue(e.target.name, e.target.files[0])  
    }

    const handlePreviewCancel = () => {
        formik.setFieldValue('image_file', initialValues.image_file)
    }

    const resetForm = () => {
        formik.resetForm();
    }

    const validateData = (data: IFormValues): IFormErrors => {
        const errors: IFormErrors = {};
        !data.firstName ? errors.firstName="Нужно ввести свою фамилию" : null; 
        !data.optional ? errors.optional="Я хз че тут вписать" :  null; 
        !data.image_file ? errors.image_file="Нужно выбрать фото" :  null;
        console.log(errors) 
        return errors;
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateData,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    return (
        <div className='test-form'>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className='test-form-content'>
                    <InputText 
                        name='firstName' 
                        value={formik.values.firstName} 
                        onChange={formik.handleChange} 
                        label='Имя'
                        hasError={!!formik.errors.firstName}
                        contentError={formik.errors.firstName}
                        
                    />
                    <InputTextarea 
                        name='optional' 
                        value={formik.values.optional} 
                        onChange={formik.handleChange}
                        label='Сообщение'
                        hasError={!!formik.errors.optional}
                        contentError={formik.errors.optional}
                    />
                    <InputFile 
                        name='image_file' 
                        onChange={handleFileUpload}
                        hasError={!!formik.errors.image_file}
                    />
                    <ImageUploadPreview image={formik.values.image_file} onCancelClick={handlePreviewCancel}/>
                </div>
                <Button content='Submit' type='submit' size='s' disabled={formik.isSubmitting}/>
                <Button content='Reset' type='reset' onClick={resetForm} size='s'/>
            </form>
            <Button content='Test' size='m'/>
        </div>
    );
};

export {TestForm};