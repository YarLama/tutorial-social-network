import { AxiosError } from 'axios';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { authApi } from '../../../../app/api/authApi';
import { AuthLoginRequest } from '../../../../app/api/authApi/types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { authSlice } from '../../../../app/store/reducers/AuthSlice';
import { Button, FormError, InputText } from '../../../../UI';
import { prepareLoginData } from '../../helpers/prepareSubmit';
import { validateLoginValues } from '../../helpers/validateLoginValues';

const LoginForm: React.FC = () => {

    const [errorForm, setErrorForm] = useState<string>('');
    const dispatch = useAppDispatch();
    const [login] = authApi.useLoginMutation();

    const initialValues: AuthLoginRequest = {
        email: '',
        password: ''
    }

    const handleSubmit = async (values: AuthLoginRequest, actions: FormikHelpers<AuthLoginRequest>) => {
        try {
            setErrorForm('')
            actions.setSubmitting(true)
            const body = prepareLoginData(values.email, values.password);
            const responce = await login(body).unwrap();
            dispatch(authSlice.actions.login(responce.token));
            actions.resetForm();
        } catch (e) {
            setErrorForm((e as AxiosError).status === 401 ? 'Неправильный логин или пароль' : 'Что-то пошло не так')
        }
        actions.setSubmitting(false);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: validateLoginValues,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    const errors = formik.errors;
    const values = formik.values;

    return (
        <div className='login-form'>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <InputText 
                        name='email' 
                        label='E-mail'
                        value={values.email} 
                        contentError={errors.email}
                        readonly={formik.isSubmitting}
                    />
                    <InputText 
                        name='password' 
                        label='Password'
                        type='password'
                        value={values.password} 
                        contentError={errors.password}
                        readonly={formik.isSubmitting}
                    />
                    {!errorForm ? null : <FormError content={errorForm}/>}
                    <Button content='Login' type='submit' disabled={formik.isSubmitting}/>
                </form>
            </FormikProvider>
        </div>
    );
};

export {LoginForm};