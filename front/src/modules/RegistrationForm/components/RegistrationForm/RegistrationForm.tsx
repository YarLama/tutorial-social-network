import { AxiosError } from 'axios';
import { FormikHelpers, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../app/api/authApi';
import { authRegRequest } from '../../../../app/api/authApi/types';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { Button, FormError, InputText } from '../../../../UI';
import { validateRegistrationValues } from '../../helpers/validateRegistrationValues';

const RegistrationForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [registration] = authApi.useRegistrationMutation();

    const initialValues: authRegRequest = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: ''
    }

    const hadleSubmit = async (values: authRegRequest, actions: FormikHelpers<authRegRequest>) => {
        
        try {
            setErrorForm('')
            actions.setSubmitting(true)
            console.log('Отправка на регистрацию', values)
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
        onSubmit: hadleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='registration-form'>
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
                <InputText 
                    name='phone'
                    label='Phone'
                    value={values.phone}
                    onChange={formik.handleChange}
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
                {!errorForm ? null : <FormError content={errorForm}/>}
                <Button content='Registration' type='submit' disabled={formik.isSubmitting}/>
            </form>
        </div>
    );
};

export {RegistrationForm};