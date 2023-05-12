import { AxiosError } from 'axios';
import { Formik, FormikHelpers, FormikProvider, useFormik, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../app/api/authApi';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { Button, FormError, InputPhone, InputText } from '../../../../UI';
import { prepareRegistrationData } from '../../helpers/prepareSubmit';
import { RegistrationFormValues } from '../../helpers/types';
import { validateRegistrationValues } from '../../helpers/validateRegistrationValues';

const RegistrationForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [registration] = authApi.useRegistrationMutation();

    // const initialValues: RegistrationFormValues = {
    //     first_name: '',
    //     last_name: '',
    //     phone: '79023342365',
    //     email: '',
    //     password: '',
    //     confirm_password: ''
    // }

    const initialValues: RegistrationFormValues = {
        first_name: '',
        last_name: '',
        phone: '79023342365',
        email: '',
        password: '',
        confirm_password: ''
    }

    const handleSubmit = async (values: RegistrationFormValues, actions: FormikHelpers<RegistrationFormValues>) => {
        
        try {
            setErrorForm('')
            actions.setSubmitting(true)
            console.log('Отправка на регистрацию', values, prepareRegistrationData(
                values.first_name, 
                values.last_name, 
                values.phone,
                values.email,
                values.password
            ))
        } catch (e) {
            setErrorForm((e as AxiosError).status === 400 ? 'Такой пользователь уже существует' : 'Что-то пошло не так')
        }
        actions.setSubmitting(false);
        actions.resetForm();
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateRegistrationValues,
        validateOnChange: false,
        onSubmit: handleSubmit,
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='registration-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <InputText 
                        name='first_name'
                        label='First name'
                        value={values.first_name}
                        onChange={formik.handleChange}
                        hasError={!!errors.first_name}
                        contentError={errors.first_name}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='last_name'
                        label='Last name'
                        value={values.last_name}
                        onChange={formik.handleChange}
                        hasError={!!errors.last_name}
                        contentError={errors.last_name}
                        readonly={formik.isSubmitting}
                    />
                    <InputPhone 
                        name='phone'
                        label='Phone'
                        value={values.phone}
                        hasError={!!errors.phone}
                        contentError={errors.phone}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='email' 
                        label='E-mail'
                        value={values.email} 
                        onChange={formik.handleChange}
                        hasError={!!errors.email}
                        contentError={errors.email}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='password' 
                        label='Password'
                        type='password'
                        value={values.password} 
                        onChange={formik.handleChange}
                        hasError={!!errors.password}
                        contentError={errors.password}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='confirm_password' 
                        label='Confirm Password'
                        type='password'
                        value={values.confirm_password} 
                        onChange={formik.handleChange}
                        hasError={!!errors.confirm_password}
                        contentError={errors.confirm_password}
                        readonly={formik.isSubmitting}
                    />
                    {!errorForm ? null : <FormError content={errorForm}/>}
                    <Button content='Registration' type='submit' disabled={formik.isSubmitting}/>
                </form>
            </FormikProvider>
        </div>
    );
};

export {RegistrationForm};