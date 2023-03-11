import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { Button, InputText } from '../../../../UI';
import './styles/style.scss';

interface IFormikFormProps {

}

interface IFormValues {
    firstName: string;
    color: string;
}

const TestForm: React.FC<IFormikFormProps> = () => {

    const initialValues: IFormValues = {
        firstName: '',
        color: ''
    };

    const handleSubmit = (values: IFormValues, actions: FormikHelpers<IFormValues>): void => {
        console.log(values)
        actions.resetForm({values: initialValues})
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
    })

    const resetForm = () => {
        formik.resetForm();
    }

    return (
        <div className='test-form'>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className='test-form-content'>
                    <InputText 
                        name='firstName' 
                        value={formik.values.firstName} 
                        onChange={formik.handleChange} 
                        label='Имя'
                        hasError
                        contentError='Пароль должен содержать от 8 до 20 символов'
                        required={true}
                    />
                    <InputText 
                        name='color' 
                        value={formik.values.color} 
                        onChange={formik.handleChange}
                        label='Фамилия'
                    />
                </div>
                <Button content='Submit' type='submit' size='s'/>
                <Button content='Reset' type='reset' onClick={resetForm} size='s'/>
            </form>
            <Button content='Test' size='m'/>
        </div>
    );
};

export {TestForm};