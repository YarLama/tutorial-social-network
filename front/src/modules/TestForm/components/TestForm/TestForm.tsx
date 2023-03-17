import { FormikHelpers, useFormik } from 'formik';
import React from 'react';
import { Button, InputSelect, InputText } from '../../../../UI';
import './styles/style.scss';

interface IFormikFormProps {

}

interface IFormValues {
    firstName: string;
    color: string;
    optional: string;
}

interface IFormErrors {
    firstName?: string | null;
    color?: string | null;
}

const TestForm: React.FC<IFormikFormProps> = () => {

    const initialValues: IFormValues = {
        firstName: '',
        color: '',
        optional: ''
    };

    const handleSubmit = (values: IFormValues, actions: FormikHelpers<IFormValues>): void => {
        console.log('Submit', values)   
        actions.resetForm({values: initialValues})
    }

    const resetForm = () => {
        formik.resetForm();
    }

    const validateData = (data: IFormValues): IFormErrors => {
        const errors: IFormErrors = {};
        !data.firstName ? errors.firstName="Нужно ввести свою фамилию" : null; 
        !data.color ? errors.color="Нужно выбрать цвет" :  null; 
        return errors;
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateData,
        validateOnChange: false,
        onSubmit: handleSubmit,
    })

    const SelectValues = [
        { value: 'red', label: 'Красный'},
        { value: 'blue', label: 'Синий'},
        { value: 'black', label: 'Чернейший'},
    ]

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
                    <InputSelect 
                        name='color' 
                        onChange={formik.handleChange}
                        label='Выбрать цвет'
                        values={SelectValues}
                        valueDefault={''}
                        hasError={!!formik.errors.color}
                        contentError={formik.errors.color}
                    />
                    <InputText 
                        name='optional' 
                        value={formik.values.optional} 
                        onChange={formik.handleChange}
                        label='Необязательно'
                        hasError={!!formik.errors.optional}
                        contentError={formik.errors.optional}
                    />
                </div>
                <Button content='Submit' type='submit' size='s' disabled={formik.isSubmitting}/>
                <Button content='Reset' type='reset' onClick={resetForm} size='s'/>
            </form>
            <Button content='Test' size='m'/>
        </div>
    );
};

export {TestForm};